const { Schema, model } = require('mongoose');

const invoiceSchema = new Schema({
  dueDate: Date,
  issuedDate: Date,
  items: [
    {
      itemName: String,
      unitPrice: String,
      quantity: String
    }
  ],
  notes: String,
  invoiceNumber: String,
  type: String,
  creator: [String],
  name: String,
  phoneNumber: String,
  email: String,
  totalQuantity: Number,
  totalAmount: Number,

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = model('Invoice', invoiceSchema);