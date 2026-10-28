// In-memory rate limiter for lead submissions
const rateLimitMap = new Map<string, { count: number; expiresAt: number }>();

const WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS = 5; // Max 5 submissions per 10 minutes

export function checkRateLimit(identifier: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const record = rateLimitMap.get(identifier);

  // Periodic cleanup of expired entries
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (value.expiresAt <= now) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || record.expiresAt <= now) {
    rateLimitMap.set(identifier, { count: 1, expiresAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (record.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  record.count += 1;
  return { allowed: true, remaining: MAX_REQUESTS - record.count };
}
