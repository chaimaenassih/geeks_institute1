// CommonJS
const products = require("./products");

function findProductByName(name) {
  return products.find(p => p.name.toLowerCase() === name.toLowerCase());
}

["Laptop", "Coffee", "Backpack", "Unknown"].forEach(n => {
  const p = findProductByName(n);
  if (p) {
    console.log(`✔ ${p.name} — ${p.category} — $${p.price}`);
  } else {
    console.log(`✖ Produit introuvable: ${n}`);
  }
});
