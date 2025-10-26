// app.js
const express = require('express');
const booksRouter = require('./routes/books');

const app = express();
app.use(express.json());
app.use('/books', booksRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`Books API on http://localhost:${PORT}`));
