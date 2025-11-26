
// Exercise 1: Union Types
// processValue : number -> format monnaie, string -> inverser

console.log("=== Gold Exercise 1 ===");

function processValue(value: string | number): string {
  if (typeof value === "number") {
    // Format simple en monnaie : 2 décimales avec un $
    return `$${value.toFixed(2)}`;
  } else {
    // value est une string : on la renverse
    return value.split("").reverse().join("");
  }
}

// Tests
console.log(processValue(100));      // $100.00
console.log(processValue(12.5));     // $12.50
console.log(processValue("Hello"));  // "olleH"



// Exercise 2: Array Type Annotations
// sumNumbersInArray : somme uniquement les nombres du tableau

console.log("=== Gold Exercise 2 ===");

function sumNumbersInArray(values: (number | string)[]): number {
  let sum = 0;

  for (const value of values) {
    if (typeof value === "number") {
      sum += value;
    }
    // si c'est une string, on l'ignore
  }

  return sum;
}

// Tests
console.log(sumNumbersInArray([1, 2, 3]));                 // 6
console.log(sumNumbersInArray([1, "2", 3, "abc"]));        // 4
console.log(sumNumbersInArray(["a", "b", "c", 10]));       // 10



// Exercise 3: Type Aliases
// AdvancedUser + fonction introduceAdvancedUser

console.log("=== Gold Exercise 3 ===");

type AdvancedUser = {
  name: string;
  age: number;
  address?: string; // optionnel
};

function introduceAdvancedUser(user: AdvancedUser): string {
  let message = `Hello, ${user.name}! You are ${user.age} years old.`;

  if (user.address) {
    message += ` You live at ${user.address}.`;
  }

  return message;
}

// Tests
const userWithAddress: AdvancedUser = {
  name: "Alice",
  age: 25,
  address: "123 Main Street",
};

const userWithoutAddress: AdvancedUser = {
  name: "Bob",
  age: 30,
};

console.log(introduceAdvancedUser(userWithAddress));
// "Hello, Alice! You are 25 years old. You live at 123 Main Street."

console.log(introduceAdvancedUser(userWithoutAddress));
// "Hello, Bob! You are 30 years old."



//Exercise 4: Optional Parameters

console.log("=== Gold Exercise 4 ===");

function welcomeUser(name: string, greeting?: string): string {
  const finalGreeting = greeting ?? "Hello";
  return `${finalGreeting}, ${name}!`;
}

// Tests
console.log(welcomeUser("Alice"));            // "Hello, Alice!"
console.log(welcomeUser("Bob", "Welcome"));   // "Welcome, Bob!"
