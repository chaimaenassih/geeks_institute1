// server.js
const express = require('express');
const path = require('path');
const { randomUUID } = require('crypto');
const emojis = require('./data/emojis');
const { shuffle, pickN } = require('./lib/utils');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// "Base de données" en mémoire
const pendingQuestions = new Map(); // questionId -> { correctName, emoji }
const scores = new Map();           // playerName -> { score, lastAt }
const MAX_OPTIONS = 4;

// Génère une question (emoji + options)
function generateQuestion() {
  const correct = emojis[Math.floor(Math.random() * emojis.length)];
  const distractors = pickN(
    emojis.filter(e => e.name !== correct.name),
    MAX_OPTIONS - 1
  );
  const options = shuffle([correct.name, ...distractors.map(d => d.name)]);
  const questionId = randomUUID();

  pendingQuestions.set(questionId, { correctName: correct.name, emoji: correct.emoji, createdAt: Date.now() });

  return {
    questionId,
    emoji: correct.emoji,
    options
  };
}

// API: récupérer une question
app.get('/api/question', (req, res) => {
  const q = generateQuestion();
  res.json(q);
});

// API: soumettre une réponse
// body: { player, questionId, guess }
app.post('/api/guess', (req, res) => {
  const { player, questionId, guess } = req.body || {};
  if (!player || !questionId || !guess) {
    return res.status(400).json({ error: 'player, questionId and guess are required' });
  }

  const q = pendingQuestions.get(questionId);
  if (!q) {
    return res.status(400).json({ error: 'Invalid or expired question' });
  }

  // corriger & maj score
  const isCorrect = q.correctName === guess;
  pendingQuestions.delete(questionId);

  const current = scores.get(player) || { score: 0, lastAt: 0 };
  if (isCorrect) current.score += 1;
  current.lastAt = Date.now();
  scores.set(player, current);

  // prépare la prochaine question
  const next = generateQuestion();
  res.json({
    correct: isCorrect,
    feedback: isCorrect ? '✅ Correct!' : `❌ Incorrect. The answer was "${q.correctName}".`,
    currentScore: current.score,
    nextQuestion: next
  });
});

// API: leaderboard (top 10)
app.get('/api/leaderboard', (req, res) => {
  const data = Array.from(scores.entries())
    .map(([player, s]) => ({ player, score: s.score, lastAt: s.lastAt }))
    .sort((a, b) => b.score - a.score || b.lastAt - a.lastAt)
    .slice(0, 10);
  res.json(data);
});

// 404 API fallback
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found' });
});

// Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Emoji Guessing Game on http://localhost:${PORT}`);
});
