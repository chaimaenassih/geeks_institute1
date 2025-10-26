// app.js
const express = require('express');
const quizRouter = require('./routes/quiz');

const app = express();
app.use(express.urlencoded({ extended: true })); // pour parser <form> POST
app.use('/quiz', quizRouter);

// route d’accueil
app.get('/', (req, res) => {
  res.redirect('/quiz');
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Trivia Quiz running on http://localhost:${PORT}`));
