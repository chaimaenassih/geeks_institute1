// Exercise 1: TypeScript Generics and Intersection Types
console.log("=== Ninja Exercise 1: Container with intersection types ===");

// On veut un container qui stocke des objets de type T & U
// Exemple : T = { id: number }, U = { name: string }
// => T & U = { id: number; name: string }

class ContainerNinja<T, U> {
  private items: (T & U)[] = [];

  add(item: T & U): void {
    this.items.push(item);
  }

  // on enlève par prédicat (fonction qui retourne true pour l'élément à enlever)
  remove(predicate: (item: T & U) => boolean): void {
    this.items = this.items.filter((item) => !predicate(item));
  }

  list(): (T & U)[] {
    return this.items;
  }
}

// Test : on combine un type "HasId" et un type "HasName"
type HasId = { id: number };
type HasName = { name: string };

const container = new ContainerNinja<HasId, HasName>();

container.add({ id: 1, name: "Alice" });
container.add({ id: 2, name: "Bob" });
container.add({ id: 3, name: "Charlie" });

console.log("All items:", container.list());

container.remove((item) => item.id === 2);
console.log("After removing id === 2:", container.list());



// Exercise 2: Generic Interfaces and Type Casting
console.log("\n=== Ninja Exercise 2: Response<T> & parseResponse ===");

// Interface générique pour une réponse d'API
interface ResponseNinja<T> {
  success: boolean;
  data: T | null;
  error?: string;
}

// Fonction qui "parse" une réponse brute
function parseResponseNinja<T>(raw: any): ResponseNinja<T> {
  // On suppose que raw.data contient ce qu'on veut caster en T
  const data = (raw.data as T) ?? null;

  return {
    success: Boolean(raw.success),
    data,
    error: raw.error,
  };
}

// Tests
type UserData = { id: number; name: string };

const rawApiResponse = {
  success: true,
  data: { id: 1, name: "Alice" },
};

const parsedUserResponse = parseResponseNinja<UserData>(rawApiResponse);
console.log("Parsed user response:", parsedUserResponse);

const rawErrorResponse = {
  success: false,
  data: null,
  error: "Something went wrong",
};

const parsedErrorResponse = parseResponseNinja<UserData>(rawErrorResponse);
console.log("Parsed error response:", parsedErrorResponse);



// Exercise 3: Generic Classes and Type Assertions
console.log("\n=== Ninja Exercise 3: Repository<T> ===");

class RepositoryNinja<T> {
  private items: T[] = [];

  add(item: T): void {
    this.items.push(item);
  }

  // Récupérer un élément par index
  get(index: number): T | undefined {
    // On utilise une assertion de type pour être explicite
    const item = this.items[index] as T | undefined;
    return item;
  }

  list(): T[] {
    return this.items;
  }
}

// Tests
type ProductRepoItem = { id: number; name: string };

const productRepo = new RepositoryNinja<ProductRepoItem>();
productRepo.add({ id: 1, name: "Laptop" });
productRepo.add({ id: 2, name: "Phone" });

console.log("All products:", productRepo.list());
console.log("First product:", productRepo.get(0));
console.log("Second product:", productRepo.get(1));
console.log("Non-existing product:", productRepo.get(10)); // undefined
