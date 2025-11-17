const bcrypt = require('bcrypt');
const {
  findUserByUsername,
  getAllUsers,
  getUserById,
  getPasswordHashByUsername,
  createUserWithPassword,
  updateUserById
} = require('../models/userModel');

// POST /register
async function registerUser(req, res) {
  try {
    const { email, username, first_name, last_name, password } = req.body;

    if (!email || !username || !first_name || !last_name || !password) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    const user = await createUserWithPassword({
      email,
      username,
      first_name,
      last_name,
      password
    });

    return res.status(201).json({
      message: 'User registered successfully.',
      user
    });
  } catch (err) {
    console.error('Error in registerUser:', err.message);
    if (err.message === 'Username or email already exists') {
      return res.status(400).json({ error: err.message });
    }
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

// POST /login
async function loginUser(req, res) {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await findUserByUsername(username);
    if (!user) {
      return res.status(400).json({ error: 'User not registered or incorrect credentials.' });
    }

    const hashRow = await getPasswordHashByUsername(username);
    if (!hashRow) {
      return res.status(400).json({ error: 'User not registered or incorrect credentials.' });
    }

    const isMatch = await bcrypt.compare(password, hashRow.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'User not registered or incorrect credentials.' });
    }

    return res.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name
      }
    });
  } catch (err) {
    console.error('Error in loginUser:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

// GET /users
async function getUsers(req, res) {
  try {
    const users = await getAllUsers();
    return res.json(users);
  } catch (err) {
    console.error('Error in getUsers:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

// GET /users/:id
async function getUser(req, res) {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID.' });
    }

    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json(user);
  } catch (err) {
    console.error('Error in getUser:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

// PUT /users/:id
async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const userId = Number(id);

    if (Number.isNaN(userId)) {
      return res.status(400).json({ error: 'Invalid user ID.' });
    }

    const { email, username, first_name, last_name } = req.body;

    const updated = await updateUserById(userId, {
      email,
      username,
      first_name,
      last_name
    });

    if (!updated) {
      return res.status(404).json({ error: 'User not found.' });
    }

    return res.json({
      message: 'User updated successfully.',
      user: updated
    });
  } catch (err) {
    console.error('Error in updateUser:', err.message);
    return res.status(500).json({ error: 'Internal server error.' });
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser
};
