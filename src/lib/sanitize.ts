const ENTITY_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "/": "&#x2F;",
};

export function escapeHtml(str: string): string {
  return str.replace(/[&<>"'/]/g, (ch) => ENTITY_MAP[ch] || ch);
}

export function sanitizeInput(value: string): string {
  return value
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
    .trim();
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d]/g, "").slice(0, 15);
}

export function sanitizeUrl(url: string): string {
  const allowedProtocols = ["https:", "http:", "data:"];
  try {
    const parsed = new URL(url);
    if (!allowedProtocols.includes(parsed.protocol)) return "";
    return url;
  } catch {
    return "";
  }
}
