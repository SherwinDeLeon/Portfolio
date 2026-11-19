import { createHash } from "node:crypto";
import { createTransport } from "nodemailer";
import { validateContact } from "@/lib/contact";
import { buildEmail } from "@/lib/contactEmail";
import { claim, release } from "@/lib/dedupe";
import { rateLimit } from "@/lib/rateLimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const json = (body: Record<string, unknown>, status = 200, headers?: Record<string, string>) => Response.json(body, { status, headers });
const tooMany = (retryAfter: number) =>
  json({ error: `Too many messages. Please try again in ${Math.max(1, Math.ceil(retryAfter / 60))} minute(s).` }, 429, { "Retry-After": String(retryAfter) });

export async function POST(req: Request) {
  // Same-origin requests only.
  const origin = req.headers.get("origin");
  if (origin) {
    const host = req.headers.get("x-forwarded-host") ?? req.headers.get("host");
    let originHost = "";
    try { originHost = new URL(origin).host; } catch { /* handled below */ }
    if (!host || originHost !== host) return json({ error: "Forbidden." }, 403);
  }

  const ip = (req.headers.get("x-forwarded-for")?.split(",")[0] ?? req.headers.get("x-real-ip") ?? "unknown").trim();
  const flood = rateLimit(`all:${ip}`, 30);
  if (!flood.ok) return tooMany(flood.retryAfter);

  const raw = await req.text();
  if (raw.length > 20_000) return json({ error: "Your message is too large." }, 413);
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") throw new Error("bad body");
    body = parsed as Record<string, unknown>;
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  // Spam traps answer with a fake success so bots learn nothing: hidden honeypot field and a too-fast submit.
  const startedAt = Number(body.startedAt);
  if (!Number.isFinite(startedAt)) return json({ error: "Invalid request." }, 400);
  if (typeof body.website === "string" && body.website !== "") return json({ ok: true });
  if (Date.now() - startedAt < 1500) return json({ ok: true });

  const result = validateContact(body);
  if (!result.ok) return json({ error: "Please check the highlighted fields.", errors: result.errors }, 422);
  const { data } = result;

  const { GMAIL_USER, GMAIL_APP_PASSWORD, CONTACT_EMAIL } = process.env;
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    console.error("Contact form: GMAIL_USER or GMAIL_APP_PASSWORD is not set.");
    return json({ error: "The contact form isn't set up yet. Please use one of the links above instead." }, 500);
  }

  // The same submission twice (double click, retry) sends only one email.
  const dedupeKey = createHash("sha256").update(`${String(body.submissionId ?? "").slice(0, 64)}|${JSON.stringify(data)}`).digest("hex");
  if (!claim(dedupeKey)) return json({ ok: true });
  const send = rateLimit(`send:${ip}`, 3);
  if (!send.ok) {
    release(dedupeKey);
    return tooMany(send.retryAfter);
  }

  const email = buildEmail(data);
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD.replace(/\s+/g, "") }, // Google shows app passwords in groups of 4
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
    await transporter.sendMail({
      from: `"Portfolio Contact" <${GMAIL_USER}>`, // Gmail always sends as the authenticated account
      to: CONTACT_EMAIL || GMAIL_USER,
      replyTo: data.email,
      subject: email.subject,
      text: email.text,
      html: email.html,
    });
  } catch (err) {
    release(dedupeKey);
    console.error("Contact form: sending through Gmail failed.", err);
    return json({ error: "Your message couldn't be sent. Please try again in a moment." }, 502);
  }
  return json({ ok: true });
}
