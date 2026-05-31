import { Router } from "express";
import { createCheckoutOrder } from "./checkout.service.js";
import type { Address } from "./checkout.types.js";

const router = Router();

router.post("/", (request, response) => {
  const { items, address, userId } = request.body as {
    items?: Array<{ id: string; quantity: number }>;
    address?: Address;
    userId?: string;
  };

  if (!items || !Array.isArray(items) || !address) {
    return response.status(400).json({ error: "Invalid checkout payload." });
  }

  try {
    const order = createCheckoutOrder(items, address, userId);
    return response.status(200).json({ order });
  } catch (error) {
    return response.status(400).json({ error: error instanceof Error ? error.message : "Checkout failed." });
  }
});

export default router;
