import process from "node:process";
import crypto from "node:crypto";

const SESSION_COOKIE = "taj_admin_session";
const SESSION_TTL_MS = 8 * 60 * 60 * 1000;

interface Session {
  username: string;
  expiresAt: number;
}

function getServerCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "",
    passwordHash: process.env.ADMIN_PASSWORD_HASH || "",
    sessionSecret: process.env.SESSION_SECRET || "fallback-change-me-in-production",
  };
}

function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}

function signSession(payload: string): string {
  const { sessionSecret } = getServerCredentials();
  return crypto.createHmac("sha256", sessionSecret).update(payload).digest("hex");
}

function encodeSession(session: Session): string {
  const payload = JSON.stringify({ u: session.username, e: session.expiresAt });
  const encoded = Buffer.from(payload).toString("base64");
  const sig = signSession(encoded);
  return `${encoded}.${sig}`;
}

function decodeSession(token: string): Session | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return null;
    const [encoded, sig] = parts;
    const expectedSig = signSession(encoded);
    if (!crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expectedSig))) return null;
    const payload = JSON.parse(Buffer.from(encoded, "base64").toString("utf-8"));
    const session: Session = { username: payload.u, expiresAt: payload.e };
    if (Date.now() > session.expiresAt) return null;
    return session;
  } catch {
    return null;
  }
}

export function validateCredentials(username: string, password: string): boolean {
  const { username: storedUser, passwordHash: storedHash } = getServerCredentials();
  if (!storedUser || !storedHash) return false;
  if (username !== storedUser) return false;
  const inputHash = hashPassword(password);
  return crypto.timingSafeEqual(Buffer.from(inputHash), Buffer.from(storedHash));
}

export function createSession(username: string): string {
  const session: Session = {
    username,
    expiresAt: Date.now() + SESSION_TTL_MS,
  };
  return encodeSession(session);
}

export function verifySession(token: string | undefined): Session | null {
  if (!token) return null;
  return decodeSession(token);
}

export function getSessionCookieHeader(token: string): string {
  return `${SESSION_COOKIE}=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${Math.floor(SESSION_TTL_MS / 1000)}`;
}

export function getLogoutCookieHeader(): string {
  return `${SESSION_COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`;
}

export function extractSessionCookie(request: Request): string | undefined {
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return undefined;
  for (const cookie of cookieHeader.split(";")) {
    const [name, ...rest] = cookie.trim().split("=");
    if (name === SESSION_COOKIE) return rest.join("=");
  }
  return undefined;
}
