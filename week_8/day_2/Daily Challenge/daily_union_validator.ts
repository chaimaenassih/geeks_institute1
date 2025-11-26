console.log("=== Daily Challenge: Union Type Validator ===");

// Fonction validateUnionType
function validateUnionType(value: any, allowedTypes: string[]): boolean {
  const valueType = typeof value;

  // On parcourt les types autorisés
  for (const type of allowedTypes) {
    if (valueType === type) {
      return true;
    }
  }

  return false;
}

// --------------------
// Tests / Démonstration
// --------------------

const value1 = 42;
const value2 = "Hello";
const value3 = true;
const value4 = { name: "Alice" };

console.log(validateUnionType(value1, ["number", "string"])); // true
console.log(validateUnionType(value2, ["number"]));           // false
console.log(validateUnionType(value3, ["boolean"]));          // true
console.log(validateUnionType(value4, ["object"]));           // true
console.log(validateUnionType(value4, ["string", "number"])); // false
