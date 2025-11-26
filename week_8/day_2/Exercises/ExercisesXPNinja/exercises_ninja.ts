//  Exercise 1: Conditional Types
console.log("=== Ninja Exercise 1: Conditional Types ===");

// MappedType :
// - si T est number -> number
// - si T est string -> number (longueur de la string)
// - sinon -> never (non utilisé ici, mais plus sûr)
type MappedType<T> = T extends number
  ? number
  : T extends string
  ? number
  : never;

// Fonction mapType :
// - si value est number -> renvoie son carré
// - si value est string -> renvoie sa longueur
function mapType<T extends number | string>(value: T): MappedType<T> {
  if (typeof value === "number") {
    // number -> carré
    return (value * value) as MappedType<T>;
  } else {
    // string -> longueur de la string
    return value.length as MappedType<T>;
  }
}

// Tests
const resultNumber = mapType(5);       // 25
const resultString = mapType("Hello"); // 5

console.log("mapType(5) =", resultNumber);
console.log('mapType("Hello") =', resultString);



// Exercise 2: Keyof and Lookup Types
console.log("=== Ninja Exercise 2: keyof & lookup ===");

// Fonction générique getProperty :
// - obj : un objet de type T
// - key : une clé K qui est forcément une clé de T (K extends keyof T)
// - retourne le type de la propriété correspondante -> T[K]
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

// Objet de test
const ninjaUser = {
  id: 1,
  username: "ninja",
  active: true,
};

// Tests
const userId = getProperty(ninjaUser, "id");         // type: number
const username = getProperty(ninjaUser, "username"); // type: string
const isActive = getProperty(ninjaUser, "active");   // type: boolean

console.log("userId:", userId);
console.log("username:", username);
console.log("isActive:", isActive);



//Exercise 3: Using Interfaces with Numeric Properties
console.log("=== Ninja Exercise 3: Interfaces & numeric properties ===");

// Interface décrivant un objet avec propriétés numériques
interface HasNumericProperty {
  [key: string]: number;
}

// multiplyProperty :
// - obj : respectant HasNumericProperty (toutes les propriétés sont number)
// - key : une clé de obj
// - factor : le facteur de multiplication
// => renvoie obj[key] * factor
function multiplyProperty<T extends HasNumericProperty, K extends keyof T>(
  obj: T,
  key: K,
  factor: number
): number {
  const value = obj[key]; // value est de type T[K] mais ici forcément number
  return value * factor;
}

// Objet de test
const stats = {
  strength: 10,
  agility: 8,
  intelligence: 12,
};

// Tests
const doubledStrength = multiplyProperty(stats, "strength", 2); // 20
const tripleAgility = multiplyProperty(stats, "agility", 3);    // 24

console.log("doubledStrength:", doubledStrength);
console.log("tripleAgility:", tripleAgility);
