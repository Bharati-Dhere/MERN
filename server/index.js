// Load environment variables from .env file at the very top
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const databaseConnection = require('./database');
const bookRouter = require('./routes/book.routes');
const app = express();

databaseConnection();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
   res.send("hello from express");
});

app.use('/book', bookRouter);

app.listen(8000, () => {
    console.log("listening on port no 8000");
});
