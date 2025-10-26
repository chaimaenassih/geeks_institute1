// routes/quiz.js
const express = require('express');
const router = express.Router();

// Modèle: questions en dur
const triviaQuestions = [
  { question: 'What is the capital of France?', answer: 'Paris' },
  { question: 'Which planet is known as the Red Planet?', answer: 'Mars' },
  { question: 'What is the largest mammal in the world?', answer: 'Blue whale' },
];

// Petite fonction utilitaire pour rendre une page HTML
function page({ title, body }) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${title}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: system-ui, Arial, sans-serif; max-width: 680px; margin: 2rem auto; padding: 0 1rem; }
    .card { border: 1px solid #ddd; border-radius: 12px; padding: 1rem 1.25rem; margin: 1rem 0; }
    input[type=text]{ padding:.5rem .6rem; border:1px solid #ccc; border-radius:8px; width: 100%; }
    button{ padding:.6rem 1rem; border-radius:10px; border:1px solid #333; background:#111; color:#fff; cursor:pointer; }
    .muted{ color:#666; }
    .feedback{ font-weight:600; margin:.75rem 0; }
    .ok{ color: #167e36; }
    .ko{ color: #b10000; }
  </style>
</head>
<body>
  <h1>Trivia Quiz</h1>
  ${body}
</body>
</html>`;
}

// GET /quiz — première question
router.get('/', (req, res) => {
  const idx = 0;
  const score = 0;
  const q = triviaQuestions[idx];

  res.send(page({
    title: 'Trivia Quiz',
    body: `
      <div class="card">
        <div class="muted">Question ${idx + 1} / ${triviaQuestions.length}</div>
        <h2>${q.question}</h2>
        <form method="POST" action="/quiz">
          <input type="hidden" name="index" value="${idx}">
          <input type="hidden" name="score" value="${score}">
          <label for="answer">Your answer:</label>
          <input id="answer" name="answer" type="text" autocomplete="off" required>
          <div style="margin-top:.75rem"><button type="submit">Submit</button></div>
        </form>
      </div>
    `
  }));
});

// POST /quiz — corrige et passe à la suivante
router.post('/', (req, res) => {
  const total = triviaQuestions.length;

  const index = Number(req.body.index ?? 0);
  const prevScore = Number(req.body.score ?? 0);
  const userAnswer = String(req.body.answer ?? '').trim();

  const current = triviaQuestions[index];
  if (!current) {
    // index invalide → rediriger vers score
    return res.redirect(`/quiz/score?score=${prevScore}&total=${total}`);
  }

  const isCorrect = userAnswer.toLowerCase() === current.answer.toLowerCase();
  const newScore = isCorrect ? prevScore + 1 : prevScore;
  const nextIndex = index + 1;

  // Dernière question → page score finale
  if (nextIndex >= total) {
    const fb = isCorrect
      ? `✅ Correct! The answer was "${current.answer}".`
      : `❌ Incorrect. The answer was "${current.answer}".`;
    return res.send(page({
      title: 'Quiz finished',
      body: `
        <div class="card">
          <div class="feedback ${isCorrect ? 'ok' : 'ko'}">${fb}</div>
          <h2>Final score: ${newScore} / ${total}</h2>
          <a href="/quiz"><button>Play again</button></a>
        </div>
      `
    }));
  }

  // Sinon, afficher la prochaine question + feedback
  const nextQ = triviaQuestions[nextIndex];
  const fb = isCorrect
    ? `✅ Correct! The answer was "${current.answer}".`
    : `❌ Incorrect. The answer was "${current.answer}".`;

  res.send(page({
    title: `Question ${nextIndex + 1}`,
    body: `
      <div class="card">
        <div class="feedback ${isCorrect ? 'ok' : 'ko'}">${fb}</div>
        <div class="muted">Question ${nextIndex + 1} / ${total}</div>
        <h2>${nextQ.question}</h2>
        <form method="POST" action="/quiz">
          <input type="hidden" name="index" value="${nextIndex}">
          <input type="hidden" name="score" value="${newScore}">
          <label for="answer">Your answer:</label>
          <input id="answer" name="answer" type="text" autocomplete="off" required>
          <div style="margin-top:.75rem"><button type="submit">Submit</button></div>
        </form>
      </div>
    `
  }));
});

// GET /quiz/score — (route accessible si besoin avec query)
router.get('/score', (req, res) => {
  const score = Number(req.query.score ?? 0);
  const total = Number(req.query.total ?? triviaQuestions.length);

  res.send(page({
    title: 'Final score',
    body: `
      <div class="card">
        <h2>Final score: ${score} / ${total}</h2>
        <a href="/quiz"><button>Play again</button></a>
      </div>
    `
  }));
});

module.exports = router;
