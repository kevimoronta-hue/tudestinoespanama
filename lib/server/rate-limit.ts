import "server-only";

/**
 * Minimal fixed-window rate limiter (in-memory, per server instance).
 * Good enough for local/preview use. In production on serverless/multi-instance
 * hosting, replace with a shared store (e.g. Redis/Upstash) — see README.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; reset: number }>();

export function rateLimit(
  key: string,
  now = Date.now(),
  { max = MAX_REQUESTS, windowMs = WINDOW_MS }: { max?: number; windowMs?: number } = {},
): { allowed: boolean; retryAfter: number } {
  const entry = hits.get(key);
  if (!entry || entry.reset <= now) {
    hits.set(key, { count: 1, reset: now + windowMs });
    if (hits.size > 5000) {
      for (const [k, v] of hits) if (v.reset <= now) hits.delete(k);
    }
    return { allowed: true, retryAfter: 0 };
  }
  entry.count += 1;
  return entry.count > max
    ? { allowed: false, retryAfter: Math.ceil((entry.reset - now) / 1000) }
    : { allowed: true, retryAfter: 0 };
}
