import { Router } from "express";
import authRouter from "../features/auth/auth.controller.js";
import checkoutRouter from "../features/checkout/checkout.controller.js";
import productRouter from "../features/products/product.controller.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);
router.use("/checkout", checkoutRouter);

export default router;
