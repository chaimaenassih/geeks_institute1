// app.js
const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();
app.use(express.json());
app.use('/todos', todosRouter);

const PORT = 3000;
app.listen(PORT, () => console.log(`To-Do API on http://localhost:${PORT}`));
