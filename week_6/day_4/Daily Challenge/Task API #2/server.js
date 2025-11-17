const express = require('express');
const path = require('path');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 3000;

// Middlewares to parse JSON and form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static HTML files (register/login)
app.use(express.static(path.join(__dirname, 'public')));

// Use router for API routes
app.use('/', usersRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Register page: http://localhost:${PORT}/register.html`);
  console.log(`Login page: http://localhost:${PORT}/login.html`);
});
