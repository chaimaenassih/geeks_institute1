// ===== DOM =====
const $ = (s) => document.querySelector(s);
const btn = $('#fetchBtn');
const statusEl = $('#status');
const nameEl = $('#name');
const heightEl = $('#height');
const genderEl = $('#gender');
const birthEl = $('#birth');
const homeworldEl = $('#homeworld');
const errorEl = $('#error');
const card = $('#card');

// entier aléatoire inclusif
const randomId = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// ===== API (async/await + Fetch) =====
async function fetchCharacter(id){
  const res = await fetch(`https://www.swapi.tech/api/people/${id}`);
  if (!res.ok) throw new Error("Oh No! That person isnt available.");
  const json = await res.json();
  const props = json?.result?.properties;
  if (!props) throw new Error("Oh No! That person isnt available.");
  return props; // { name, height, gender, birth_year, homeworld }
}

async function fetchHomeworld(url){
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to retrieve homeworld.");
  const json = await res.json();
  return json?.result?.properties?.name ?? "Unknown";
}

// ===== UI helpers =====
function setLoading(isLoading){
  card.setAttribute('aria-busy', String(isLoading));
  btn.disabled = isLoading;
  if (isLoading){
    statusEl.innerHTML =
      '<div class="loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading...</div>';
  } else {
    statusEl.innerHTML = '';
  }
}
function showError(msg){
  errorEl.textContent = msg;
  errorEl.classList.remove('hidden');
}
function clearError(){
  errorEl.textContent = '';
  errorEl.classList.add('hidden');
}
function render({name, height, gender, birth_year, homeworldName}){
  nameEl.textContent = name || 'Unknown';
  heightEl.textContent = height && height !== 'unknown' ? height : 'Unknown';
  genderEl.textContent = gender && gender !== 'n/a' ? gender : 'Unknown';
  birthEl.textContent = birth_year || 'Unknown';
  homeworldEl.textContent = homeworldName || 'Unknown';
}

// ===== Contrôleur =====
btn.addEventListener('click', async () => {
  clearError();
  setLoading(true);
  try{
    const id = randomId(1, 83);                 // la démo indique 83 persos
    const c = await fetchCharacter(id);
    const hw = c.homeworld ? await fetchHomeworld(c.homeworld) : 'Unknown';
    render({...c, homeworldName: hw});
  }catch(e){
    console.error(e);
    showError(e.message || "Oh No! That person isnt available.");
  }finally{
    setLoading(false);
  }
});


