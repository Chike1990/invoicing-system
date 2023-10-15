const express = require('express');
const app = express();
const connectToDatabase = require("./db");

require("dotenv").config()
const PORT = 8000;

app.use(express.json());

// connect to database
connectToDatabase();

app.get('/', (req, res) => {
    res.send('Hello invoice did you work?');
});

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});
