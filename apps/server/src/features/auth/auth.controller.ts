import { Router } from "express";
import { signInWithGoogle } from "./auth.service.js";

const router = Router();

router.post("/google", async (request, response) => {
  const { idToken } = request.body as { idToken?: string };

  if (!idToken) {
    return response.status(400).json({ error: "Missing Google ID token." });
  }

  try {
    const user = await signInWithGoogle(idToken);
    return response.status(200).json({ user });
  } catch (error) {
    return response.status(401).json({ error: error instanceof Error ? error.message : "Authentication failed." });
  }
});

export default router;
