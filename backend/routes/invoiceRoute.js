const express = require('express');
const { createInvoice, editInvoice } = require('../controller/invoiceController');

const router = express.Router();

router.post('/', createInvoice);
router.patch('/:id', editInvoice);

module.exports = router;
