const express = require('express');
const app = express();
app.use(express.json());

let books = [
  { id: 1, title: 'Clean Code', author: 'Robert C. Martin', publishedYear: 2008 },
  { id: 2, title: 'The Pragmatic Programmer', author: 'Andrew Hunt', publishedYear: 1999 },
];

// Lire tous les livres
app.get('/api/books', (req, res) => {
  res.json(books);
});

// Lire un livre par ID
app.get('/api/books/:bookId', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).send('Book not found');
  res.json(book);
});

// Créer un nouveau livre
app.post('/api/books', (req, res) => {
  const newBook = {
    id: books.length + 1,
    title: req.body.title,
    author: req.body.author,
    publishedYear: req.body.publishedYear
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

// Mettre à jour un livre
app.put('/api/books/:bookId', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.status(404).send('Book not found');
  book.title = req.body.title;
  book.author = req.body.author;
  book.publishedYear = req.body.publishedYear;
  res.json(book);
});

// Supprimer un livre
app.delete('/api/books/:bookId', (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.bookId));
  if (index === -1) return res.status(404).send('Book not found');
  const deleted = books.splice(index, 1);
  res.json(deleted[0]);
});

// Démarrer le serveur
const PORT = 5000;
app.listen(PORT, () => console.log(`Book API running on http://localhost:${PORT}`));
