export type Product = {
  id: string;
  name: string;
  type: string;
  note: string;
  priceCents: number;
};

export const products: Product[] = [
  {
    id: "amber-veil",
    name: "Amber Veil",
    type: "Eau de Parfum",
    note: "Saffron, amber resin, cedar",
    priceCents: 7800,
  },
  {
    id: "nila-drops",
    name: "Nila Drops",
    type: "Gold vermeil earrings",
    note: "Blue enamel with freshwater pearl",
    priceCents: 6400,
  },
  {
    id: "temple-smoke",
    name: "Temple Smoke",
    type: "Home fragrance",
    note: "Incense, sandalwood, black tea",
    priceCents: 4200,
  },
];

export const productMap = new Map(products.map((product) => [product.id, product]));

export function getAllProducts(): Product[] {
  return products;
}

export function getProductById(productId: string): Product | undefined {
  return productMap.get(productId);
}
