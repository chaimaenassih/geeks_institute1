// Exercise 1: Combining Intersection Types with Type Guards

console.log("=== Gold Exercise 1: AdminUser & type guards ===");

interface UserGold {
  name: string;
  email: string;
}

interface AdminGold {
  adminLevel: number;
}

type AdminUserGold = UserGold & AdminGold;

function getPropertyGold(obj: AdminUserGold, propName: string): unknown {
  if (propName in obj) {
    // type guard : on sait que la clé existe dans l'objet
    return (obj as any)[propName];
  }
  return undefined;
}

// Test
const adminUser: AdminUserGold = {
  name: "Alice",
  email: "alice@example.com",
  adminLevel: 2,
};

console.log("name:", getPropertyGold(adminUser, "name"));
console.log("email:", getPropertyGold(adminUser, "email"));
console.log("adminLevel:", getPropertyGold(adminUser, "adminLevel"));
console.log("unknown:", getPropertyGold(adminUser, "unknownProperty"));



// Exercise 2: Type Casting with Generics
console.log("\n=== Gold Exercise 2: castToType with generics ===");

function castToTypeGold<T>(
  value: any,
  ctor: { new (...args: any[]): T } | ((arg: any) => T)
): T {
  return (ctor as any)(value);
}

// Tests
const numFromString = castToTypeGold<number>("123.45", Number);
const boolFromString = castToTypeGold<boolean>("true", (v) => v === "true");

console.log("numFromString:", numFromString);
console.log("boolFromString:", boolFromString);



// Exercise 3: Type Assertions with Generic Constraints
console.log("\n=== Gold Exercise 3: getArrayLength with constraints ===");

// On veut seulement des tableaux de number ou string
function getArrayLengthGold<T extends number | string>(items: T[]): number {
  // Assertion pas vraiment nécessaire, mais on montre le principe
  const arr = items as Array<T>;
  return arr.length;
}

// Tests
console.log("length [1,2,3]:", getArrayLengthGold([1, 2, 3]));
console.log(
  "length ['a','b','c']:",
  getArrayLengthGold(["a", "b", "c"])
);
// getArrayLengthGold([true, false]); // ❌ ne compile pas : bool interdit



// Exercise 4: Generic Interfaces with Class Implementation
console.log("\n=== Gold Exercise 4: Storage<T> & Box<T> ===");

interface StorageGold<T> {
  add(item: T): void;
  get(index: number): T | undefined;
}

class BoxGold<T> implements StorageGold<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  get(index: number): T | undefined {
    return this.items[index];
  }
}

// Tests
const stringBox = new BoxGold<string>();
stringBox.add("Hello");
stringBox.add("World");
console.log("stringBox[0]:", stringBox.get(0));
console.log("stringBox[1]:", stringBox.get(1));

const numberBox = new BoxGold<number>();
numberBox.add(10);
numberBox.add(20);
console.log("numberBox[0]:", numberBox.get(0));
console.log("numberBox[1]:", numberBox.get(1));



// Exercise 5: Combining Generic Classes with Constraints
console.log("\n=== Gold Exercise 5: Queue<Item<T>> ===");

interface ItemGold<T> {
  value: T;
}

class QueueGold<T> {
  private items: ItemGold<T>[] = [];

  add(item: ItemGold<T>): void {
    this.items.push(item);
  }

  remove(): ItemGold<T> | undefined {
    return this.items.shift();
  }
}

// Tests
const numberQueue = new QueueGold<number>();
numberQueue.add({ value: 1 });
numberQueue.add({ value: 2 });
numberQueue.add({ value: 3 });

console.log("numberQueue remove:", numberQueue.remove());
console.log("numberQueue remove:", numberQueue.remove());
console.log("numberQueue remove:", numberQueue.remove());

const stringQueue = new QueueGold<string>();
stringQueue.add({ value: "a" });
stringQueue.add({ value: "b" });

console.log("stringQueue remove:", stringQueue.remove());
console.log("stringQueue remove:", stringQueue.remove());
