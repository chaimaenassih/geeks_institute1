// routes/todos.js
const express = require('express');
const router = express.Router();

// "Base de données" en mémoire
let todos = [];          // { id, text, done }
let nextId = 1;

// GET all
router.get('/', (req, res) => {
  res.json(todos);
});

// POST create
router.post('/', (req, res) => {
  const { text } = req.body || {};
  if (!text) return res.status(400).json({ error: 'text is required' });

  const todo = { id: nextId++, text, done: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT update by id
router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'To-do not found' });

  const { text, done } = req.body || {};
  if (typeof text !== 'undefined') todo.text = text;
  if (typeof done !== 'undefined') todo.done = !!done;

  res.json(todo);
});

// DELETE by id
router.delete('/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'To-do not found' });

  const deleted = todos.splice(idx, 1)[0];
  res.json(deleted);
});

module.exports = router;
