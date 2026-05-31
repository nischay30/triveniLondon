import { findProduct } from "../products/product.service.js";
import type { Address, CheckoutItem, Order } from "./checkout.types.js";

const SHIPPING_FLAT_CENTS = 500;

export function createCheckoutOrder(items: CheckoutItem[], address: Address, userId?: string): Order {
  if (items.length === 0) {
    throw new Error("Cart must contain at least one item.");
  }

  const orderItems = items.map((item) => {
    const product = findProduct(item.id);
    if (!product) {
      throw new Error(`Product ${item.id} does not exist.`);
    }

    if (item.quantity <= 0) {
      throw new Error("Item quantity must be greater than zero.");
    }

    return {
      id: product.id,
      name: product.name,
      quantity: item.quantity,
      unitPriceCents: product.priceCents,
    };
  });

  const subtotalCents = orderItems.reduce((total, item) => total + item.unitPriceCents * item.quantity, 0);
  const totalCents = subtotalCents + SHIPPING_FLAT_CENTS;

  return {
    orderId: `order_${Date.now()}`,
    items: orderItems,
    subtotalCents,
    shippingCents: SHIPPING_FLAT_CENTS,
    totalCents,
    address,
    userId,
  };
}
