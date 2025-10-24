// server.js
const express = require('express');
const app = express();
app.use(express.json());

// "Base de données" en mémoire
let posts = [
  { id: 1, title: 'Hello', content: 'First post' },
  { id: 2, title: 'Second', content: 'Another post' },
];
let nextId = 3;

// GET /posts : liste
app.get('/posts', (req, res) => {
  res.json(posts);
});

// GET /posts/:id : un post
app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post not found' });
  res.json(post);
});

// POST /posts : créer
app.post('/posts', (req, res) => {
  const { title, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content are required' });
  }
  const newPost = { id: nextId++, title, content };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// PUT /posts/:id : mettre à jour
app.put('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const post = posts.find(p => p.id === id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const { title, content } = req.body || {};
  if (!title || !content) {
    return res.status(400).json({ error: 'title and content are required' });
  }
  post.title = title;
  post.content = content;
  res.json(post);
});

// DELETE /posts/:id : supprimer
app.delete('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const exists = posts.some(p => p.id === id);
  if (!exists) return res.status(404).json({ error: 'Post not found' });
  posts = posts.filter(p => p.id !== id);
  res.status(204).send();
});

// 404 pour routes invalides
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Gestion erreurs serveur
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Blog API listening on http://localhost:${PORT}`));
