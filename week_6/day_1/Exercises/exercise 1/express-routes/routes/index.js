// routes/index.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the Homepage!');
});

router.get('/about', (req, res) => {
  res.send('About Us: this is a simple Express app with express.Router.');
});

module.exports = router;
