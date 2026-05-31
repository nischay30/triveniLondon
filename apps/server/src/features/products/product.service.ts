import { getAllProducts, getProductById, Product } from "./product.repository.js";

export function listProducts(): Product[] {
  return getAllProducts();
}

export function findProduct(productId: string): Product | undefined {
  return getProductById(productId);
}
