//Exercise 1: Hello, World!
console.log("=== Exercise 1 ===");
console.log("Hello, World!");


// Exercise 2: Type Annotations
console.log("=== Exercise 2 ===");

let age: number = 25;
let namePerson: string = "Alice";

console.log("Age:", age);
console.log("Name:", namePerson);


//Exercise 3: Union Types
console.log("=== Exercise 3 ===");

let id: string | number;

id = 123; // number
console.log("ID as number:", id);

id = "ABC-456"; // string
console.log("ID as string:", id);


//Exercise 4: Control Flow with if...else
console.log("=== Exercise 4 ===");

function describeNumber(n: number): string {
  if (n > 0) {
    return "The number is positive";
  } else if (n < 0) {
    return "The number is negative";
  } else {
    return "The number is zero";
  }
}

// Tests
console.log(describeNumber(10));  // positive
console.log(describeNumber(-3));  // negative
console.log(describeNumber(0));   // zero


//Exercise 5: Tuple Types
console.log("=== Exercise 5 ===");

function getDetails(name: string, age: number): [string, number, string] {
  const greeting = `Hello, ${name}! You are ${age} years old.`;
  return [name, age, greeting];
}

const details = getDetails("Alice", 25);
console.log(details);
// Expected: ['Alice', 25, 'Hello, Alice! You are 25 years old.']


//Exercise 6: Object Type Annotations
console.log("=== Exercise 6 ===");

// Structure de l'objet Person
type Person = {
  name: string;
  age: number;
};

// Fonction createPerson
function createPerson(name: string, age: number): Person {
  return { name, age };
}

// Test
const person1 = createPerson("Bob", 30);
console.log(person1);
// Output: { name: 'Bob', age: 30 }


//Exercise 7: Type Assertions (DOM)
console.log("=== Exercise 7 ===");

// On récupère l'élément depuis le DOM
const element = document.getElementById("user-input");

// On dit à TypeScript que c'est un HTMLInputElement (ou null)
const inputElement = element as HTMLInputElement | null;

if (inputElement) {
  inputElement.value = "Hello from TypeScript!";
  console.log("Input value set via TypeScript.");
} else {
  console.log("Element with id 'user-input' not found.");
}


//Exercise 8: switch Statement with Complex Conditions
console.log("=== Exercise 8 ===");

function getAction(role: string): string {
  switch (role) {
    case "admin":
    case "superadmin": 
      return "Manage users and settings";

    case "editor":
    case "author":
      return "Edit content";

    case "viewer":
      return "View content";

    case "guest":
      return "Limited access";

    default:
      return "Invalid role";
  }
}

// Tests
console.log(getAction("admin"));    // Manage users and settings
console.log(getAction("editor"));   // Edit content
console.log(getAction("viewer"));   // View content
console.log(getAction("guest"));    // Limited access
console.log(getAction("unknown"));  // Invalid role


//Exercise 9: Function Overloading with Default Parameters
console.log("=== Exercise 9 ===");

// Signatures (overloads)
function greet(): string;
function greet(name: string): string;

// Implémentation
function greet(name?: string): string {
  if (name) {
    return `Hello, ${name}!`;
  }
  return "Hello, there!";
}

// Tests
console.log(greet());        // "Hello, there!"
console.log(greet("Alice")); // "Hello, Alice!"
