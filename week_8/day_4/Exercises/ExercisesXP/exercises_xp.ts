// Exercise 1: Intersection Types
console.log("=== Exercise 1: Intersection Types ===");

type PersonXP = {
  name: string;
  age: number;
};

type AddressXP = {
  street: string;
  city: string;
};

type PersonWithAddressXP = PersonXP & AddressXP;

const personWithAddressXP: PersonWithAddressXP = {
  name: "Alice",
  age: 25,
  street: "123 Main Street",
  city: "Paris",
};

console.log("PersonWithAddress:", personWithAddressXP);



//Exercise 2: Type Guards with Union Types
console.log("\n=== Exercise 2: Type Guards with Union ===");

function describeValueXP(value: number | string): string {
  if (typeof value === "number") {
    return "This is a number";
  } else {
   
    return "This is a string";
  }
}

console.log(describeValueXP(42));
console.log(describeValueXP("hello"));



// Exercise 3: Type Casting
console.log("\n=== Exercise 3: Type Casting ===");

let someValueXP: any = "I am a string now";

// "cast" vers string
let stringValueXP = someValueXP as string;

console.log("String length:", stringValueXP.length);
console.log("Uppercased:", stringValueXP.toUpperCase());



// Exercise 4: Type Assertions with Union Types
console.log("\n=== Exercise 4: Type Assertions with Union Types ===");

function getFirstElementXP(arr: (number | string)[]): string {
  // On récupère le premier élément (number | string)
  const first = arr[0] as number | string;
  // On utilise toString() pour obtenir une string
  return first.toString();
}

// Tests
console.log(getFirstElementXP([1, 2, 3]));            // "1"
console.log(getFirstElementXP(["a", "b", "c"]));      // "a"
console.log(getFirstElementXP(["x", 10, "y"]));       // "x"


// Exercise 5: Generic Constraints
console.log("\n=== Exercise 5: Generic Constraints (length) ===");

function logLengthXP<T extends { length: number }>(value: T): void {
  console.log("Length is:", value.length);
}

// Tests
logLengthXP("Hello");
logLengthXP([1, 2, 3, 4]);
logLengthXP({ length: 10 });



// Exercise 6: Intersection Types and Type Guards
console.log("\n=== Exercise 6: Employee (Intersection & Type Guards) ===");

type Person2XP = {
  name: string;
  age: number;
};

type JobXP = {
  position: "Manager" | "Developer";
  department: string;
};

type EmployeeXP = Person2XP & JobXP;

function describeEmployeeXP(employee: EmployeeXP): string {
  if (employee.position === "Manager") {
    return `${employee.name} is a Manager in the ${employee.department} department.`;
  } else {
    // position === "Developer"
    return `${employee.name} is a Developer in the ${employee.department} department.`;
  }
}

// Tests
const empManager: EmployeeXP = {
  name: "Alice",
  age: 30,
  position: "Manager",
  department: "HR",
};

const empDev: EmployeeXP = {
  name: "Bob",
  age: 28,
  position: "Developer",
  department: "IT",
};

console.log(describeEmployeeXP(empManager));
console.log(describeEmployeeXP(empDev));



// Exercise 7: Type Assertions and Generic Constraints
console.log("\n=== Exercise 7: formatInput (Generics + Constraints) ===");

function formatInputXP<T extends { toString(): string }>(value: T): string {
  const str = value.toString() as string; // assertion vers string
  return `Formatted: ${str}`;
}

// Tests
console.log(formatInputXP(123));          // number -> "123"
console.log(formatInputXP(true));         // boolean -> "true"
console.log(formatInputXP("hello"));      // string -> "hello"
console.log(formatInputXP([1, 2, 3]));    // array -> "1,2,3"
