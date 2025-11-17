const express = require('express');
const bcrypt = require('bcrypt');
const fs = require('fs').promises;
const path = require('path');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '..', 'users.json');
const SALT_ROUNDS = 10;

// Helper: read users from JSON file
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading users file:', err);
    // If file missing or invalid, treat as empty list
    return [];
  }
}

// Helper: write users to JSON file
async function writeUsers(users) {
  try {
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
  } catch (err) {
    console.error('Error writing users file:', err);
    throw err;
  }
}

// Helper: build "safe" user object without password hash
function sanitizeUser(user) {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}

/**
 * POST /register
 * Body (form or JSON):
 *  - name
 *  - lastName
 *  - email
 *  - username
 *  - password
 */
router.post('/register', async (req, res) => {
  try {
    const { name, lastName, email, username, password } = req.body;

    if (!name || !lastName || !email || !username || !password) {
      return res.status(400).send('All fields are required.');
    }

    const users = await readUsers();

    // Check if username already exists
    const usernameExists = users.some(u => u.username === username);

    // Check if password already used by existing user (as the task says)
    let passwordExists = false;
    for (const user of users) {
      if (await bcrypt.compare(password, user.passwordHash)) {
        passwordExists = true;
        break;
      }
    }

    if (usernameExists || passwordExists) {
      return res
        .status(400)
        .send('Username or password already exists. User not registered.');
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

    // Generate simple numeric ID
    const newId =
      users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
      id: newId,
      name,
      lastName,
      email,
      username,
      passwordHash
    };

    users.push(newUser);
    await writeUsers(users);

    return res.status(201).send('User registered successfully.');
  } catch (err) {
    console.error('Error in /register:', err);
    return res.status(500).send('Internal server error.');
  }
});

/**
 * POST /login
 * Body:
 *  - username
 *  - password
 */
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).send('Username and password are required.');
    }

    const users = await readUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      // Not registered
      return res
        .status(400)
        .send('User not registered or incorrect credentials.');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      return res
        .status(400)
        .send('User not registered or incorrect credentials.');
    }

    return res.send('Login successful. Welcome!');
  } catch (err) {
    console.error('Error in /login:', err);
    return res.status(500).send('Internal server error.');
  }
});

/**
 * GET /users
 * For demo only: list all users (without password hashes)
 */
router.get('/users', async (req, res) => {
  try {
    const users = await readUsers();
    const safeUsers = users.map(sanitizeUser);
    return res.json(safeUsers);
  } catch (err) {
    console.error('Error in GET /users:', err);
    return res.status(500).send('Internal server error.');
  }
});

/**
 * GET /users/:id
 * For demo only: get one user by ID (without password hash)
 */
router.get('/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid ID.');
    }

    const users = await readUsers();
    const user = users.find(u => u.id === id);

    if (!user) {
      return res.status(404).send('User not found.');
    }

    return res.json(sanitizeUser(user));
  } catch (err) {
    console.error('Error in GET /users/:id:', err);
    return res.status(500).send('Internal server error.');
  }
});

/**
 * PUT /users/:id
 * For demo only: update user (no auth)
 * You can send any subset of:
 *  - name
 *  - lastName
 *  - email
 *  - username
 *  - password
 */
router.put('/users/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);
    if (Number.isNaN(id)) {
      return res.status(400).send('Invalid ID.');
    }

    const { name, lastName, email, username, password } = req.body;

    const users = await readUsers();
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
      return res.status(404).send('User not found.');
    }

    const user = users[index];

    // If username is updated, check uniqueness
    if (username && username !== user.username) {
      const usernameExists = users.some(
        u => u.username === username && u.id !== id
      );
      if (usernameExists) {
        return res.status(400).send('Username already in use.');
      }
      user.username = username;
    }

    if (name) user.name = name;
    if (lastName) user.lastName = lastName;
    if (email) user.email = email;

    // If password updated, hash it and optionally check "already used"
    if (password) {
      // Check if another user already uses this password
      for (const other of users) {
        if (other.id === id) continue;
        if (await bcrypt.compare(password, other.passwordHash)) {
          return res
            .status(400)
            .send('This password is already used by another user.');
        }
      }
      user.passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    }

    users[index] = user;
    await writeUsers(users);

    return res.json(sanitizeUser(user));
  } catch (err) {
    console.error('Error in PUT /users/:id:', err);
    return res.status(500).send('Internal server error.');
  }
});

module.exports = router;
