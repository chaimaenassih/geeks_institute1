// Exercise 1: Class Inheritance with Protected Access Modifiers
console.log("=== Gold Exercise 1: Inheritance & protected ===");

class EmployeeGold {
  protected name: string;
  protected salary: number;

  constructor(name: string, salary: number) {
    this.name = name;
    this.salary = salary;
  }

  getDetails(): string {
    return `Name: ${this.name}, Salary: $${this.salary}`;
  }
}

class Manager extends EmployeeGold {
  public department: string;

  constructor(name: string, salary: number, department: string) {
    super(name, salary);
    this.department = department;
  }

  // Override
  getDetails(): string {
    return `Name: ${this.name}, Salary: $${this.salary}, Department: ${this.department}`;
  }
}

// Test
const manager = new Manager("Alice", 70000, "IT");
console.log(manager.getDetails());



// Exercise 2: Using Readonly with Access Modifiers
console.log("\n=== Gold Exercise 2: Readonly & access modifiers ===");

class Car {
  public readonly make: string;
  private readonly model: string;
  public year: number;

  constructor(make: string, model: string, year: number) {
    this.make = make;
    this.model = model;
    this.year = year;
  }

  getCarDetails(): string {
    return `${this.make} ${this.model} (${this.year})`;
  }
}

const car = new Car("Toyota", "Corolla", 2022);
console.log(car.getCarDetails());

// car.make = "Honda";   // ❌ Erreur TypeScript (readonly)
// car.model = "Civic";  // ❌ Erreur TypeScript (private + readonly)



// Exercise 3: Static Properties and Methods in Classes
console.log("\n=== Gold Exercise 3: Static properties & methods ===");

class MathUtils {
  static PI: number = 3.14159;

  static circumference(radius: number): number {
    return 2 * MathUtils.PI * radius;
  }
}

// Appel sans instance
console.log("Circumference (r=5):", MathUtils.circumference(5));



// 🌟 Exercise 4: Interface with Function Types
console.log("\n=== Gold Exercise 4: Interface with function types ===");

interface Operation {
  execute(a: number, b: number): number;
}

class Addition implements Operation {
  execute(a: number, b: number): number {
    return a + b;
  }
}

class Multiplication implements Operation {
  execute(a: number, b: number): number {
    return a * b;
  }
}

// Tests
const add = new Addition();
const multiply = new Multiplication();

console.log("Addition:", add.execute(5, 3));        // 8
console.log("Multiplication:", multiply.execute(5, 3)); // 15



//  Exercise 5: Extending Interfaces with Optional and Readonly Properties
console.log("\n=== Gold Exercise 5: Extending interfaces ===");

interface Shape {
  color: string;
  getArea(): number;
}

interface Rectangle extends Shape {
  readonly width: number;
  readonly height: number;
  getPerimeter(): number;
}

class RectangleShape implements Rectangle {
  color: string;
  readonly width: number;
  readonly height: number;

  constructor(color: string, width: number, height: number) {
    this.color = color;
    this.width = width;
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }

  getPerimeter(): number {
    return 2 * (this.width + this.height);
  }
}

// Tests
const rect = new RectangleShape("blue", 10, 5);
console.log("Color:", rect.color);
console.log("Area:", rect.getArea());
console.log("Perimeter:", rect.getPerimeter());

// rect.width = 20; // ❌ Erreur TypeScript (readonly)
