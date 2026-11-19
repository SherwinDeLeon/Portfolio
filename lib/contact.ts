// Shared by the form (instant feedback) and the API route (the real check). No Node-only imports here.
export const LIMITS = { name: 100, email: 254, subject: 150, message: 5000 } as const;

export type ContactInput = { name: string; email: string; subject: string; message: string };
export type FieldErrors = Partial<Record<keyof ContactInput, string>>;
export type ValidationResult = { ok: true; data: ContactInput } | { ok: false; errors: FieldErrors };

// HTML5 email pattern: excludes quotes, angle brackets and whitespace.
const EMAIL_RE = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

const line = (v: unknown) => (typeof v === "string" ? v.replace(CONTROL, "").replace(/\s+/g, " ").trim() : "");
const block = (v: unknown) => (typeof v === "string" ? v.replace(CONTROL, "").replace(/\r\n?/g, "\n").trim() : "");

export function validateContact(raw: unknown): ValidationResult {
  const r = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;
  const data: ContactInput = { name: line(r.name), email: line(r.email).toLowerCase(), subject: line(r.subject), message: block(r.message) };
  const errors: FieldErrors = {};

  if (data.name.length > LIMITS.name) errors.name = `Name must be ${LIMITS.name} characters or fewer.`;
  if (!data.email) errors.email = "Enter your email address.";
  else if (data.email.length > LIMITS.email || !EMAIL_RE.test(data.email)) errors.email = "Enter a valid email address.";
  if (!data.subject) errors.subject = "Enter a subject.";
  else if (data.subject.length > LIMITS.subject) errors.subject = `Subject must be ${LIMITS.subject} characters or fewer.`;
  if (!data.message) errors.message = "Write a message.";
  else if (data.message.length > LIMITS.message) errors.message = `Message must be ${LIMITS.message} characters or fewer.`;

  return Object.keys(errors).length ? { ok: false, errors } : { ok: true, data };
}
