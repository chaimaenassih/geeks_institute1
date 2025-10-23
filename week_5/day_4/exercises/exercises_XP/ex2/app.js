// ES module
import { people } from "./data.js";

function averageAge(items) {
  const sum = items.reduce((acc, p) => acc + p.age, 0);
  return (sum / items.length) || 0;
}

console.log('Personnes:', people);
console.log('Âge moyen:', averageAge(people).toFixed(2));
