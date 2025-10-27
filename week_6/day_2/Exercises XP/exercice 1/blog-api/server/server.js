require('dotenv').config();
const express = require('express');
const posts = require('./routes/post.routes');

const app = express();
app.use(express.json());

// routes
app.use('/posts', posts);

// 404
app.use((req, res) => res.status(404).json({ error: 'Route not found' }));

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Server error' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Blog API on http://localhost:${PORT}`));
