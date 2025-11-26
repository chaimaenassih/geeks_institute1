//  Définition des types

type User = {
  type: "user";
  name: string;
  age: number;
};

type Product = {
  type: "product";
  id: number;
  price: number;
};

type Order = {
  type: "order";
  orderId: string;
  amount: number;
};

// Union de tous les types possibles
type DataItem = User | Product | Order;


// Fonction handleData avec type guards

function handleData(items: DataItem[]): string[] {
  const results: string[] = [];

  for (const item of items) {
    // Type guard basé sur la propriété discriminante "type"
    switch (item.type) {
      case "user":
        results.push(
          `Hello ${item.name}, you are ${item.age} years old.`
        );
        break;

      case "product":
        results.push(
          `Product ID: ${item.id}, Price: $${item.price}`
        );
        break;

      case "order":
        results.push(
          `Order ${item.orderId} has an amount of $${item.amount}`
        );
        break;

      default:
        // Cas inattendu (sécurité future)
        const _exhaustiveCheck: never = item;
        results.push("Unknown data type received");
    }
  }

  return results;
}


// Tests / Démonstration

console.log("=== Daily Challenge: Type Guard with Union Types ===");

const mixedData: DataItem[] = [
  {
    type: "user",
    name: "Alice",
    age: 30,
  },
  {
    type: "product",
    id: 101,
    price: 49.99,
  },
  {
    type: "order",
    orderId: "ORD-9001",
    amount: 199.99,
  },
];

const output = handleData(mixedData);

// Affichage des résultats
for (const message of output) {
  console.log(message);
}
