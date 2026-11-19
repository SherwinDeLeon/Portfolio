// Best-effort, in-memory sliding window. On serverless hosts each instance keeps its own counts,
// so treat this as a speed bump; use a shared store (e.g. Upstash) or Vercel's firewall for hard limits.
const hits = new Map<string, number[]>();

export function rateLimit(key: string, limit: number, windowMs = 10 * 60_000): { ok: boolean; retryAfter: number } {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= limit) {
    hits.set(key, recent);
    return { ok: false, retryAfter: Math.ceil((windowMs - (now - recent[0])) / 1000) };
  }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= windowMs)) hits.delete(k);
  }
  return { ok: true, retryAfter: 0 };
}
