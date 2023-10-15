const express = require('express');
const app = express();
const connectToDatabase = require("./db");

require("dotenv").config()
const PORT = 8000;

app.use(express.json());

// connect to database
connectToDatabase();

// Routes
const invoiceRoutes = require('./routes/invoiceRoute')
app.use('/api/invoices', invoiceRoutes);

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
