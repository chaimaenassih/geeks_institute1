
// Exercise 1: Advanced Access Modifiers and Inheritance
console.log("=== Ninja Exercise 1: Advanced Access Modifiers ===");

class EmployeeNinja {
  public name: string;
  private age: number;
  protected salary: number;

  constructor(name: string, age: number, salary: number) {
    this.name = name;
    this.age = age;
    this.salary = salary;
  }

  protected calculateBonus(): number {
    return this.salary * 0.1;
  }

  public getSalaryDetails(): string {
    return `Salary: $${this.salary}`;
  }
}

class ManagerNinja extends EmployeeNinja {
  public getSalaryDetails(): string {
    const bonus = this.calculateBonus();
    return `Salary: $${this.salary}, Bonus: $${bonus}`;
  }
}

class ExecutiveManager extends ManagerNinja {
  public approveBudget(amount: number): string {
    return `Budget of $${amount} approved by ${this.name}`;
  }
}

// Tests
const exec = new ExecutiveManager("Alice", 45, 100000);
console.log(exec.getSalaryDetails());
console.log(exec.approveBudget(50000));
// exec.salary ❌ protected
// exec.age ❌ private



//Exercise 2: Advanced Static Methods and Properties
console.log("\n=== Ninja Exercise 2: Static Methods & Properties ===");

abstract class ShapeNinja {
  static totalShapes: number = 0;

  constructor() {
    ShapeNinja.totalShapes++;
  }

  static getType(): string {
    return "Generic Shape";
  }

  abstract getArea(): number;
}

class CircleNinja extends ShapeNinja {
  constructor(private radius: number) {
    super();
  }

  getArea(): number {
    return Math.PI * this.radius * this.radius;
  }

  static getType(): string {
    return "Circle";
  }
}

class SquareNinja extends ShapeNinja {
  constructor(private side: number) {
    super();
  }

  getArea(): number {
    return this.side * this.side;
  }

  static getType(): string {
    return "Square";
  }
}

// Tests
const c1 = new CircleNinja(5);
const s1 = new SquareNinja(4);

console.log("Circle area:", c1.getArea());
console.log("Square area:", s1.getArea());
console.log("Total shapes:", ShapeNinja.totalShapes);
console.log(CircleNinja.getType());
console.log(SquareNinja.getType());



// 🌟 Exercise 3: Complex Interfaces with Function Types
console.log("\n=== Ninja Exercise 3: Interfaces with Function Types ===");

interface CalculatorNinja {
  a: number;
  b: number;
  operate(operation: (x: number, y: number) => number): number;
}

class AdvancedCalculator implements CalculatorNinja {
  constructor(public a: number, public b: number) {}

  operate(operation: (x: number, y: number) => number): number {
    return operation(this.a, this.b);
  }

  add(): number {
    return this.operate((x, y) => x + y);
  }

  subtract(): number {
    return this.operate((x, y) => x - y);
  }

  multiply(): number {
    return this.operate((x, y) => x * y);
  }
}

// Tests
const calc = new AdvancedCalculator(10, 5);
console.log("Add:", calc.add());
console.log("Subtract:", calc.subtract());
console.log("Multiply:", calc.multiply());



//Exercise 4: Readonly Properties in Complex Inheritance
console.log("\n=== Ninja Exercise 4: Readonly in Inheritance ===");

class Device {
  public readonly serialNumber: string;

  constructor(serialNumber: string) {
    this.serialNumber = serialNumber;
  }

  getDeviceInfo(): string {
    return `Serial Number: ${this.serialNumber}`;
  }
}

class Laptop extends Device {
  public model: string;
  public price: number;

  constructor(serialNumber: string, model: string, price: number) {
    super(serialNumber);
    this.model = model;
    this.price = price;
  }

  getDeviceInfo(): string {
    return `${super.getDeviceInfo()}, Model: ${this.model}, Price: $${this.price}`;
  }
}

// Tests
const laptop = new Laptop("SN12345", "MacBook Pro", 2500);
laptop.price = 2300;
console.log(laptop.getDeviceInfo());
// laptop.serialNumber ❌ readonly



// Exercise 5: Extending Multiple Interfaces with Optional and Readonly Properties
console.log("\n=== Ninja Exercise 5: Multiple Interface Inheritance ===");

interface ProductNinja {
  readonly name: string;
  price: number;
  discount?: number;
}

interface Electronics extends ProductNinja {
  warrantyPeriod: number;
}

class Smartphone implements Electronics {
  readonly name: string;
  price: number;
  warrantyPeriod: number;
  discount?: number;

  constructor(
    name: string,
    price: number,
    warrantyPeriod: number,
    discount?: number
  ) {
    this.name = name;
    this.price = price;
    this.warrantyPeriod = warrantyPeriod;
    this.discount = discount;
  }

  calculateFinalPrice(): number {
    if (this.discount) {
      return this.price * (1 - this.discount / 100);
    }
    return this.price;
  }
}

// Tests
const phone1 = new Smartphone("iPhone", 1200, 24);
const phone2 = new Smartphone("Samsung", 1000, 24, 10);

console.log("Phone 1 final price:", phone1.calculateFinalPrice());
console.log("Phone 2 final price:", phone2.calculateFinalPrice());
// phone1.name ❌ readonly
