import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import {
  validateCredentials,
  createSession,
  verifySession,
} from "../admin-auth.server";

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      username: z.string().min(1).max(100),
      password: z.string().min(1).max(200),
    })
  )
  .handler(async ({ data }) => {
    const valid = validateCredentials(data.username, data.password);
    if (!valid) {
      return { success: false as const };
    }
    const sessionToken = createSession(data.username);
    return { success: true as const, token: sessionToken };
  });

export const adminLogout = createServerFn({ method: "POST" })
  .handler(async () => {
    return { success: true as const };
  });

export const adminVerify = createServerFn({ method: "GET" })
  .handler(async () => {
    // Note: In production, read session from HttpOnly cookie.
    // For now, token is passed via Authorization header.
    return { authenticated: false as const };
  });

export const adminCheckToken = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: z.string().min(1),
    })
  )
  .handler(async ({ data }) => {
    const session = verifySession(data.token);
    if (!session) {
      return { valid: false as const };
    }
    return { valid: true as const, username: session.username };
  });
