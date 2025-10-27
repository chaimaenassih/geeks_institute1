
const Book = require("../models/book.model");

// GET /api/books
exports.getAll = async (req, res, next) => {
  try { res.json(await Book.findAll()); }
  catch (e) { next(e); }
};

// GET /api/books/:bookId
exports.getOne = async (req, res, next) => {
  try {
    const row = await Book.findById(Number(req.params.bookId));
    if (!row) return res.status(404).json({ error: "Book not found" });
    res.json(row);
  } catch (e) { next(e); }
};

// POST /api/books
exports.create = async (req, res, next) => {
  try {
    const { title, author, publishedYear } = req.body || {};
    if (!title || !author || !publishedYear)
      return res.status(400).json({ error: "title, author, publishedYear are required" });
    const row = await Book.create({ title, author, publishedYear });
    res.status(201).json(row);
  } catch (e) { next(e); }
};

// PUT /api/books/:bookId
exports.update = async (req, res, next) => {
  try {
    const row = await Book.update(Number(req.params.bookId), req.body || {});
    if (!row) return res.status(404).json({ error: "Book not found" });
    res.json(row);
  } catch (e) { next(e); }
};

// DELETE /api/books/:bookId
exports.remove = async (req, res, next) => {
  try {
    const row = await Book.remove(Number(req.params.bookId));
    if (!row) return res.status(404).json({ error: "Book not found" });
    res.json(row);
  } catch (e) { next(e); }
};
