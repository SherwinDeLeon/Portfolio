// Remembers recently handled submissions so a double click or a retry sends only one email.
// In-memory and per server instance, like the rate limiter.
const claimed = new Map<string, number>();

/** Returns false if this key was already claimed within the window. */
export function claim(key: string, ttlMs = 10 * 60_000): boolean {
  const now = Date.now();
  for (const [k, t] of claimed) if (now - t > ttlMs) claimed.delete(k);
  if (claimed.has(key)) return false;
  claimed.set(key, now);
  return true;
}

/** Frees a key after a failed send so the visitor can retry. */
export function release(key: string): void {
  claimed.delete(key);
}
