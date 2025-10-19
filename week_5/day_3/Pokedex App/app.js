// ====== Config ======
const MIN_ID = 1;
// La démo s'arrête en général aux 898 premiers. Si tu veux Gen9 : mets 1025
const MAX_ID = 898;

// ====== DOM ======
const $ = (s) => document.querySelector(s);
const sprite = $("#sprite");
const loadingEl = $("#loading");
const pname = $("#pname");
const pid = $("#pid");
const pheight = $("#height");
const pweight = $("#weight");
const ptype = $("#ptype");
const perror = $("#error");

const btnLeft = $("#btn-left");
const btnRight = $("#btn-right");
const btnRandom = $("#btn-random");

// garde l'id courant pour prev/next
let currentId = 25; // par ex. Pikachu au départ

// ====== Helpers UI ======
function setLoading(isLoading) {
  if (isLoading) {
    loadingEl.classList.remove("hidden");
    sprite.classList.add("hidden");
  } else {
    loadingEl.classList.add("hidden");
    sprite.classList.remove("hidden");
  }
  // disable buttons pendant le chargement
  btnLeft.disabled = btnRight.disabled = btnRandom.disabled = isLoading;
}

function showError(msg) {
  perror.textContent = msg || "Oh no! That Pokemon isn’t available…";
  perror.classList.remove("hidden");
}

function clearError() {
  perror.textContent = "";
  perror.classList.add("hidden");
}

// Construit un joli nom de type(s)
function formatTypes(types) {
  return types.map(t => t.type.name).join(", ");
}

// Choisit la meilleure image dispo
function chooseImage(sprites) {
  const art =
    sprites?.other?.["official-artwork"]?.front_default ||
    sprites?.other?.dream_world?.front_default ||
    sprites?.front_default;
  return art || sprites?.front_default || "";
}

// ====== Fetchers ======
async function fetchPokemon(idOrName) {
  const url = `https://pokeapi.co/api/v2/pokemon/${idOrName}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Oh no! That Pokemon isn’t available…");
  const data = await res.json();
  return data;
}

async function renderPokemon(idOrName) {
  try {
    clearError();
    setLoading(true);

    const data = await fetchPokemon(idOrName);
    currentId = data.id;

    const img = chooseImage(data.sprites);
    sprite.src = img || "";
    sprite.alt = data.name;

    // La démo affiche Height en cm = valeur brute (dm → cm sans conversion),
    // et Weight en gr = valeur brute (hectogrammes → gr sans conversion).
    // On reproduit ce rendu.
    pname.textContent = capitalize(data.name);
    pid.textContent = `Pokemon n° ${data.id}`;
    pheight.textContent = `${data.height}cm`;
    pweight.textContent = `${data.weight}gr`;
    ptype.textContent = formatTypes(data.types);

  } catch (e) {
    console.error(e);
    showError(e.message);
  } finally {
    setLoading(false);
  }
}

function randomId(min = MIN_ID, max = MAX_ID) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function clampId(id) {
  if (id < MIN_ID) return MIN_ID;
  if (id > MAX_ID) return MAX_ID;
  return id;
}

function capitalize(s){ return s ? s[0].toUpperCase() + s.slice(1) : s; }

// ====== Events ======
btnRandom.addEventListener("click", () => renderPokemon(randomId()));
btnLeft.addEventListener("click", () => renderPokemon(clampId(currentId - 1)));
btnRight.addEventListener("click", () => renderPokemon(clampId(currentId + 1)));

// ====== Initial load ======
renderPokemon(currentId);
