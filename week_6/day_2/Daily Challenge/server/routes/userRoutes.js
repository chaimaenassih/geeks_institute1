// server/routes/userRoutes.js
const express = require('express');
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser
} = require('../controllers/userController');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/users', getUsers);
router.get('/users/:id', getUser);
router.put('/users/:id', updateUser);

module.exports = router;
