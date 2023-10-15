const express = require('express');
const app = express();
const connectToDatabase = require("./db");
const { Novu } = require('@novu/node');
const pdf = require('html-pdf');
const cors = require('cors');
const fs = require('fs');
const pdfTemplate = require('./document/index');

require("dotenv").config()
const PORT = 8000;

app.use(express.json());
// Enable CORS middleware
app.use(cors());

// connect to database
connectToDatabase();

// Routes
const invoiceRoutes = require('./routes/invoiceRoute')
app.use('/api/invoices', invoiceRoutes);

// the logic for sending the invoice as PDF
let options = { format: 'A4' };

app.post('/send-pdf', (req, res) => {
  const { email } = req.body;
  pdf.create(pdfTemplate(req.body), options).toFile('invoice.pdf', (err) => {
    if (err) {
      // Handle any error that occurred during PDF generation
      console.error(err);
      return res.status(500).json({ error: 'An error occurred while generating the PDF.' });
    }
    const novu = new Novu(process.env.NOVU_API_KEY);

    novu.trigger('invoice-notification', {
      to: {
        subscriberId: '652b6203e8515541493c4f17',
        email: `${email}`
      },
      payload: {
        attachments: [
          {
            file: fs.readFileSync(__dirname + '/invoice.pdf').toString('base64'),
            name: 'invoice.pdf',
            mime: 'application/octet-stream',
          },
        ],
      },
    });

    // Send the success response
    res.json({ message: 'Invoice sent successfully.' });
  });
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
