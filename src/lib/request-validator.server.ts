// Basic request validation to block malicious payloads

const SUSPICIOUS_PATTERNS = [
  /(\b)(ALTER|CREATE|DROP|EXEC|UNION|SELECT|INSERT|DELETE|UPDATE)\b/i,
  /(\b)(javascript|onclick|onerror|onload|onmouseover)\b/i,
  /(\b)(<script|<iframe|<embed|<object)\b/i,
];

export function isSuspiciousPayload(payload: unknown): boolean {
  if (typeof payload === "string") {
    return SUSPICIOUS_PATTERNS.some((pattern) => pattern.test(payload));
  }
  if (payload && typeof payload === "object") {
    return Object.values(payload).some((val) => {
      if (typeof val === "string") return isSuspiciousPayload(val);
      if (val && typeof val === "object") return isSuspiciousPayload(val);
      return false;
    });
  }
  return false;
}

export function validateOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");
  const referer = request.headers.get("referer");
  const host = request.headers.get("host");

  // Allow if no origin header (same-origin request)
  if (!origin && !referer) return true;

  // Check origin against allowed domains
  const allowedDomains = [
    "taj-group.com",
    "www.taj-group.com",
    "localhost",
    "vercel.app",
  ];

  const checkUrl = origin || referer || "";
  try {
    const url = new URL(checkUrl);
    return allowedDomains.some(
      (domain) => url.hostname === domain || url.hostname.endsWith(`.${domain}`)
    );
  } catch {
    return false;
  }
}
