// Exercise 1: Class with Access Modifiers
console.log("=== Exercise 1: Employee with access modifiers ===");

class Employee {
  private name: string;        
  private salary: number;      
  public position: string;    
  protected department: string; 

  constructor(name: string, salary: number, position: string, department: string) {
    this.name = name;
    this.salary = salary;
    this.position = position;
    this.department = department;
  }

  // Méthode publique qui expose des infos sans révéler le salaire
  public getEmployeeInfo(): string {
    return `Employee: ${this.name}, Position: ${this.position}`;
  }
}

const emp = new Employee("Alice", 50000, "Developer", "IT");
console.log(emp.getEmployeeInfo());
// emp.name;   // ❌ Erreur: 'name' est private
// emp.salary; // ❌ Erreur: 'salary' est private



//Exercise 2: Readonly Properties in a Class
console.log("\n=== Exercise 2: Product with readonly id ===");

class Product {
  public readonly id: number; // ne peut plus changer après le constructeur
  public name: string;
  public price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public getProductInfo(): string {
    return `Product: ${this.name}, Price: $${this.price.toFixed(2)}`;
  }
}

const product = new Product(1, "Laptop", 999.99);
console.log(product.getProductInfo());

// product.id = 2; // ❌ Erreur TypeScript: Cannot assign to 'id' because it is a read-only property.



// Exercise 3: Class Inheritance
console.log("\n=== Exercise 3: Inheritance with Animal/Dog ===");

class Animal {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }

  public makeSound(): string {
    return "Some generic animal sound";
  }
}

class Dog extends Animal {
  constructor(name: string) {
    super(name); // appelle le constructeur de Animal
  }

  // Redéfinition (override) de la méthode
  public makeSound(): string {
    return "bark";
  }
}

const myDog = new Dog("Rex");
console.log(`Dog name: ${myDog.name}`);
console.log(`Dog sound: ${myDog.makeSound()}`); // "bark"



 // Exercise 4: Static Properties and Methods
console.log("\n=== Exercise 4: Static methods in Calculator ===");

class Calculator {
  // méthode statique: pas besoin d'instance pour l'utiliser
  static add(a: number, b: number): number {
    return a + b;
  }

  static subtract(a: number, b: number): number {
    return a - b;
  }
}

// Appel des méthodes sans créer d'instance
console.log("5 + 3 =", Calculator.add(5, 3));
console.log("10 - 4 =", Calculator.subtract(10, 4));



// Exercise 5: Extending Interfaces with Optional and Readonly Properties
console.log("\n=== Exercise 5: Interfaces with optional & readonly ===");

// Interface de base
interface User {
  readonly id: number;
  name: string;
  email: string;
}

// Interface étendue
interface PremiumUser extends User {
  // propriété optionnelle
  membershipLevel?: string;
}

function printUserDetails(user: PremiumUser): void {
  console.log(`ID: ${user.id}`);
  console.log(`Name: ${user.name}`);
  console.log(`Email: ${user.email}`);

  if (user.membershipLevel) {
    console.log(`Membership: ${user.membershipLevel}`);
  } else {
    console.log("Membership: standard (no premium)");
  }
}

// Tests
const basicUser: PremiumUser = {
  id: 1,
  name: "Alice",
  email: "alice@example.com",
};

const premiumUser: PremiumUser = {
  id: 2,
  name: "Bob",
  email: "bob@example.com",
  membershipLevel: "Gold",
};

console.log("\n--- Basic user ---");
printUserDetails(basicUser);

console.log("\n--- Premium user ---");
printUserDetails(premiumUser);

// basicUser.id = 10; // ❌ Erreur: 'id' est readonly
