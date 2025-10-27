// route.js
const express = require('express');
const router = express.Router();
const userController = require('./controllers/userController');

router.get('/users', userController.getUsers);
module.exports = router;

// controllers/userController.js
exports.getUsers = (req, res) => {
  res.send('Liste des utilisateurs depuis le contrôleur');
};
