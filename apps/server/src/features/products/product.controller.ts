import { Router } from "express";
import { listProducts } from "./product.service.js";

const router = Router();

router.get("/", (_request, response) => {
  const products = listProducts();
  response.status(200).json(products);
});

export default router;
