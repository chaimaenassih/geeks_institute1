const scoreEl = document.getElementById('score');
const emojiEl = document.getElementById('emoji');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const formEl = document.getElementById('guessForm');
const gameEl = document.getElementById('game');
const playerInput = document.getElementById('player');
const savePlayerBtn = document.getElementById('savePlayer');
const leaderboardBody = document.getElementById('leaderboardBody');

let player = localStorage.getItem('player') || '';
let currentQuestion = null;
let score = 0;

function setPlayer(name) {
  player = (name || '').trim();
  localStorage.setItem('player', player);
  gameEl.hidden = !player;
}

savePlayerBtn.addEventListener('click', () => {
  setPlayer(playerInput.value);
  if (player) {
    loadQuestion();
    refreshLeaderboard();
  } else {
    alert('Please enter a player name');
  }
});

window.addEventListener('load', () => {
  if (player) {
    playerInput.value = player;
    gameEl.hidden = false;
    loadQuestion();
    refreshLeaderboard();
  }
});

async function loadQuestion() {
  feedbackEl.textContent = '';
  const res = await fetch('/api/question');
  const q = await res.json();
  currentQuestion = q;

  // Render
  emojiEl.textContent = q.emoji;
  optionsEl.innerHTML = '';
  q.options.forEach((opt, idx) => {
    const id = `opt-${idx}`;
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="option" value="${opt}" id="${id}">
      ${opt}
    `;
    optionsEl.appendChild(label);
  });
}

formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!player) {
    alert('Please set a player name first.');
    return;
  }
  const input = optionsEl.querySelector('input[name="option"]:checked');
  if (!input) {
    alert('Please choose an option');
    return;
  }
  const guess = input.value;
  const res = await fetch('/api/guess', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      player,
      questionId: currentQuestion.questionId,
      guess
    })
  });

  const data = await res.json();
  if (data.error) {
    feedbackEl.textContent = data.error;
    return;
  }

  feedbackEl.textContent = data.feedback;
  score = data.currentScore;
  scoreEl.textContent = score;

  // Load next question
  currentQuestion = data.nextQuestion;
  emojiEl.textContent = currentQuestion.emoji;
  optionsEl.innerHTML = '';
  currentQuestion.options.forEach((opt, idx) => {
    const id = `opt-next-${idx}`;
    const label = document.createElement('label');
    label.innerHTML = `
      <input type="radio" name="option" value="${opt}" id="${id}">
      ${opt}
    `;
    optionsEl.appendChild(label);
  });

  // Update leaderboard
  refreshLeaderboard();
});

async function refreshLeaderboard() {
  const res = await fetch('/api/leaderboard');
  const rows = await res.json();
  leaderboardBody.innerHTML = rows
    .map(r => `<tr><td>${escapeHtml(r.player)}</td><td>${r.score}</td></tr>`)
    .join('');
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}
