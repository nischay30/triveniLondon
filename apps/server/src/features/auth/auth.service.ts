import { OAuth2Client } from "google-auth-library";
import { createOrUpdateUser, User } from "./auth.repository.js";

const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID ?? "";
const client = new OAuth2Client(clientId);

export async function signInWithGoogle(idToken: string): Promise<User> {
  if (!clientId) {
    throw new Error("Google OAuth client ID is not configured.");
  }

  const ticket = await client.verifyIdToken({ idToken, audience: clientId });
  const payload = ticket.getPayload();

  if (!payload?.sub || !payload?.email || !payload?.name) {
    throw new Error("Unable to verify Google credentials.");
  }

  const user: User = {
    id: payload.sub,
    name: payload.name,
    email: payload.email,
    picture: payload.picture,
  };

  return createOrUpdateUser(user);
}
