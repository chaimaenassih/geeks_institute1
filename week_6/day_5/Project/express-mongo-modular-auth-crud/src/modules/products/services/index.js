import { Product } from '#@/modules/products/model/index.js';

export async function createProduct({ name, description, price, ownerId }) {
  return Product.create({ name, description, price, ownerId });
}

export async function listProductsFor(reqUser) {
  // Admin voit tout, sinon seulement ses éléments
  const filter = reqUser.role === 'admin' ? {} : { ownerId: reqUser.id };
  return Product.find(filter).lean();
}

export async function getProductById(id, reqUser) {
  const doc = await Product.findById(id).lean();
  if (!doc) return null;
  if (reqUser.role !== 'admin' && String(doc.ownerId) !== String(reqUser.id)) return 'forbidden';
  return doc;
}

export async function updateProduct(id, payload, reqUser) {
  const current = await Product.findById(id);
  if (!current) return null;
  if (reqUser.role !== 'admin' && String(current.ownerId) !== String(reqUser.id)) return 'forbidden';
  if (payload.name !== undefined) current.name = payload.name;
  if (payload.description !== undefined) current.description = payload.description;
  if (payload.price !== undefined) current.price = payload.price;
  await current.save();
  return current.toObject();
}

export async function deleteProduct(id, reqUser) {
  const current = await Product.findById(id);
  if (!current) return null;
  if (reqUser.role !== 'admin' && String(current.ownerId) !== String(reqUser.id)) return 'forbidden';
  await current.deleteOne();
  return current.toObject();
}
