// planets.js (version espacée + rayon de lunes adaptatif)

const planets = [
  { name: "Mercury", color: "#9e9e9e", moons: 0 },
  { name: "Venus",   color: "#cda77c", moons: 0 },
  { name: "Earth",   color: "#2e8b57", moons: 1 },
  { name: "Mars",    color: "#c1440e", moons: 2 },
  // Échantillons de lunes pour rester lisible
  { name: "Jupiter", color: "#d9b38c", moons: 4 },
  { name: "Saturn",  color: "#e3c98b", moons: 6 },
  { name: "Uranus",  color: "#6ec9d1", moons: 5 },
  { name: "Neptune", color: "#4361ee", moons: 2 },
];

const system = document.querySelector(".listPlanets");
if (!system) {
  console.error('Section .listPlanets introuvable');
}

planets.forEach(p => {
  // --- planète ---
  const planet = document.createElement("div");
  planet.className = "planet";
  planet.style.backgroundColor = p.color;
  planet.style.display = "inline-block";
  planet.style.margin = "20px 28px"; // plus d’espace entre planètes
  planet.style.position = "relative";
  planet.style.color = "white";
  planet.style.fontSize = "12px";
  planet.style.lineHeight = "100px";
  planet.style.textAlign = "center";
  planet.textContent = p.name;

  // --- lunes (bonus) ---
  const count = p.moons;
  const moonSize = 30;      // défini aussi dans le CSS
  const cx = 50, cy = 50;   // centre planète (100px / 2)
  const R = 65 + count * 2; // rayon d’orbite adaptatif selon nb de lunes

  for (let i = 0; i < count; i++) {
    const moon = document.createElement("div");
    moon.className = "moon";

    const angle = (2 * Math.PI * i) / count; // répartition uniforme
    moon.style.left = (cx + Math.cos(angle) * R - moonSize / 2) + "px";
    moon.style.top  = (cy + Math.sin(angle) * R - moonSize / 2) + "px";

    planet.appendChild(moon);
  }

  system.appendChild(planet);
});

console.log("planets.js loaded (spacing + adaptive moon radius)");
