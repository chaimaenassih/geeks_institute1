// app.js
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// route simple pour vérifier que ça marche
app.get('/', (req, res) => {
  res.json({ ok: true, service: 'Books API', endpoints: ['/api/books'] });
});

let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008 },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', publishedYear: 1999 },
];

app.get('/api/books', (req, res) => res.json(books));
app.get('/api/books/:bookId', (req, res) => {
  const b = books.find(x => x.id === Number(req.params.bookId));
  if (!b) return res.status(404).json({ error: 'Book not found' });
  res.json(b);
});
app.post('/api/books', (req, res) => {
  const { title, author, publishedYear } = req.body || {};
  if (!title || !author || !publishedYear) return res.status(400).json({ error: 'title, author, publishedYear required' });
  const nb = { id: books.length ? Math.max(...books.map(x => x.id)) + 1 : 1, title, author, publishedYear };
  books.push(nb);
  res.status(201).json(nb);
});

// UPDATE un livre par ID
app.put('/api/books/:bookId', (req, res) => {
  const id = Number(req.params.bookId);
  const book = books.find(b => b.id === id);
  if (!book) return res.status(404).json({ error: 'Book not found' });

  const { title, author, publishedYear } = req.body || {};
  if (title !== undefined) book.title = title;
  if (author !== undefined) book.author = author;
  if (publishedYear !== undefined) book.publishedYear = publishedYear;

  res.json(book);
});

// DELETE un livre par ID
app.delete('/api/books/:bookId', (req, res) => {
  const id = Number(req.params.bookId);
  const index = books.findIndex(b => b.id === id);
  if (index === -1) return res.status(404).json({ error: 'Book not found' });

  const [deleted] = books.splice(index, 1);
  res.json(deleted);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Books API on http://localhost:${PORT}`));
