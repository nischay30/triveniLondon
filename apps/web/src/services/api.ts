import type { Address, CartItem, OrderResponse, Product, SessionUser } from "../types";

export async function fetchCatalog(): Promise<Product[]> {
  const response = await fetch("/api/products");

  if (!response.ok) {
    throw new Error("Unable to load product catalog.");
  }

  return response.json();
}

export async function signInWithGoogle(idToken: string): Promise<SessionUser> {
  const response = await fetch("/api/auth/google", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ idToken }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error ?? "Google login failed.");
  }

  const payload = (await response.json()) as { user: SessionUser };
  return payload.user;
}

export async function submitCheckout(
  items: CartItem[],
  address: Address,
  userId?: string,
): Promise<OrderResponse> {
  const response = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ items, address, userId }),
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new Error(payload?.error ?? "Checkout failed.");
  }

  const payload = (await response.json()) as { order: OrderResponse };
  return payload.order;
}
