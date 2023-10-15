const mongoose = require('mongoose');
const InvoiceModel = require('../model/invoiceModel');

// Create an invoice
const createInvoice = async (req, res) => {
  try {
    const { notes, dueDate, issuedDate, phoneNumber, name, totalQuantity, email, totalAmount, items } = req.body;
    const invoiceNumber = `INV${generateRandomNumber()}`; // generate a random 6-digit invoice number with the prefix "INV"

    const newInvoice = await InvoiceModel.create({
      notes,
      dueDate,
      issuedDate,
      phoneNumber,
      name,
      totalQuantity,
      email,
      totalAmount,
      items,
      invoiceNumber,
    });

    res.status(201).json(newInvoice);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


// Edit invoice
const editInvoice = async (req, res) => {
  const { id: _id } = req.params;
  const invoice = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).send('No invoice with that id');
  }

  const updatedInvoice = await InvoiceModel.findByIdAndUpdate(_id, { ...invoice, _id }, { new: true });

  res.json(updatedInvoice);
};

// Generate a random 6-digit number
function generateRandomNumber() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { createInvoice, editInvoice };
