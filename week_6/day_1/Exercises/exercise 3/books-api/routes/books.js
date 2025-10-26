// routes/books.js
const express = require('express');
const router = express.Router();

// Base de données temporaire (en mémoire)
let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', year: 2008 },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', year: 1999 },
];

// GET all books
router.get('/', (req, res) => {
  res.json(books);
});

// POST create a new book
router.post('/', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    year: req.body.year
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// PUT update by ID
router.put('/:id', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: 'Book not found' });

  book.title = req.body.title || book.title;
  book.author = req.body.author || book.author;
  book.year = req.body.year || book.year;

  res.json(book);
});

// DELETE by ID
router.delete('/:id', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: 'Book not found' });

  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

module.exports = router;
