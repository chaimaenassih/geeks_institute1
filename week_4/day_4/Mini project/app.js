
const quotes = [
  { id: 0, author: "Charles Lindbergh", quote: "Life is like a landscape. You live in the midst of it but can describe it only from the vantage point of distance.", likes: 0 },
  { id: 1, author: "Maya Angelou", quote: "You will face many defeats in life, but never let yourself be defeated.", likes: 0 },
  { id: 2, author: "Albert Einstein", quote: "Life is like riding a bicycle. To keep your balance, you must keep moving.", likes: 0 },
  { id: 3, author: "Oscar Wilde", quote: "Be yourself; everyone else is already taken.", likes: 0 },
  { id: 4, author: "Yoda", quote: "Do. Or do not. There is no try.", likes: 0 },
];

// Keep track of last shown index to avoid repetition
let lastIndex = -1;

// Filter state
let filtered = [];
let filteredIndex = 0;

const $ = (sel) => document.querySelector(sel);
const setText = (sel, text) => ($(sel).textContent = text);

// Render quote in DOM
const renderQuote = (q) => {
  setText("#quote-text", q.quote);
  setText("#quote-author", q.author ? q.author : "Unknown");
  setText("#quote-id", `#${q.id}`);
  setText("#quote-likes", `❤ ${q.likes}`);
};

// Random index different from lastIndex
const randomIndexNoRepeat = () => {
  if (quotes.length === 1) return 0;
  let idx;
  do {
    idx = Math.floor(Math.random() * quotes.length);
  } while (idx === lastIndex);
  return idx;
};

// Counts for the CURRENT displayed quote
const countsFor = (text) => {
  const charsAll = text.length;
  // Remove spaces using regex and count
  const noSpaces = text.replace(/\s/g, "").length;
  // Split on 1+ whitespace, trim for safety
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  return { charsAll, noSpaces, words };
};

// Find displayed quote by #quote-id pill
const currentQuote = () => {
  const idText = $("#quote-id").textContent.replace("#", "");
  const id = Number(idText);
  return quotes.find((q) => q.id === id);
};

$("#btn-generate").addEventListener("click", () => {
  // If we are navigating a filtered set, pressing Generate exits filter mode
  filtered = [];
  $("#nav").classList.add("hidden");
  $("#filter-info").textContent = "";

  const idx = randomIndexNoRepeat();
  lastIndex = idx;
  renderQuote(quotes[idx]);
});

$("#btn-like").addEventListener("click", () => {
  const q = currentQuote();
  if (!q) return;
  q.likes += 1;
  renderQuote(q);
});

$("#btn-chars-all").addEventListener("click", () => {
  const q = currentQuote();
  if (!q) return;
  const c = countsFor(q.quote);
  $("#counts").textContent = `Characters (including spaces): ${c.charsAll}`;
});

$("#btn-chars-nospace").addEventListener("click", () => {
  const q = currentQuote();
  if (!q) return;
  const c = countsFor(q.quote);
  $("#counts").textContent = `Characters (no spaces): ${c.noSpaces}`;
});

$("#btn-words").addEventListener("click", () => {
  const q = currentQuote();
  if (!q) return;
  const c = countsFor(q.quote);
  $("#counts").textContent = `Words: ${c.words}`;
});

// Add new quote (id increments correctly)
$("#form-add").addEventListener("submit", (e) => {
  e.preventDefault();
  const quote = $("#new-quote").value.trim();
  const author = $("#new-author").value.trim();

  if (!quote || !author) {
    alert("Please fill both Quote and Author.");
    return;
  }

  // id = max(existing ids) + 1 (safer if some were removed)
  const nextId = quotes.length ? Math.max(...quotes.map((q) => q.id)) + 1 : 0;

  const newObj = { id: nextId, author, quote, likes: 0 };
  quotes.push(newObj);

  // Show the newly added quote
  lastIndex = newObj.id; // avoid repeating after a fresh generate
  renderQuote(newObj);

  e.target.reset();
});

// Filter by author (show ONE quote at a time with Prev/Next)
$("#form-filter").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = $("#filter-author").value.trim().toLowerCase();
  if (!name) {
    $("#filter-info").textContent = "Please type an author name.";
    return;
  }

  filtered = quotes.filter((q) =>
    q.author.toLowerCase().includes(name)
  );

  $("#filter-info").textContent = filtered.length
    ? `Found ${filtered.length} quote(s) by "${name}".`
    : `No quotes found for "${name}".`;

  filteredIndex = 0;
  if (filtered.length) {
    renderQuote(filtered[0]);
    $("#nav").classList.remove("hidden");
  } else {
    $("#nav").classList.add("hidden");
  }
});

// Clear filter
$("#btn-clear").addEventListener("click", () => {
  filtered = [];
  $("#nav").classList.add("hidden");
  $("#filter-info").textContent = "";
  $("#filter-author").value = "";
});

// Previous / Next navigation over filtered results
$("#btn-prev").addEventListener("click", () => {
  if (!filtered.length) return;
  filteredIndex = (filteredIndex - 1 + filtered.length) % filtered.length; 
  renderQuote(filtered[filteredIndex]);
});

$("#btn-next").addEventListener("click", () => {
  if (!filtered.length) return;
  filteredIndex = (filteredIndex + 1) % filtered.length; 
  renderQuote(filtered[filteredIndex]);
});

(() => {
  const idx = randomIndexNoRepeat();
  lastIndex = idx;
  renderQuote(quotes[idx]);
})();
