"use client";

import { useEffect, useRef, useState, type ChangeEvent, type FormEvent, type ReactNode } from "react";
import { Check, Loader2, Send } from "lucide-react";
import { LIMITS, validateContact, type FieldErrors } from "@/lib/contact";

type Status = "idle" | "sending" | "success" | "error";
type Values = { name: string; email: string; subject: string; message: string };
const empty: Values = { name: "", email: "", subject: "", message: "" };
const input = "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-bone placeholder:text-zinc-500 transition-colors focus:border-accent-400/60";

function Field({ id, label, optional, error, children }: { id: string; label: string; optional?: boolean; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 flex justify-between font-mono text-xs text-zinc-500">
        <span>{label}</span>
        {optional && <span>optional</span>}
      </label>
      {children}
      {error && <p id={`${id}-error`} className="mt-2 text-sm text-accent-300">{error}</p>}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState<Values>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [notice, setNotice] = useState("");
  const startedAt = useRef(0);
  const submissionId = useRef("");
  const inFlight = useRef(false);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  const change = (k: keyof Values) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setValues((v) => ({ ...v, [k]: e.target.value }));
  const field = (k: keyof Values) => ({
    id: `contact-${k}`, name: k, value: values[k], onChange: change(k), className: input,
    "aria-invalid": errors[k] ? true : undefined, "aria-describedby": errors[k] ? `contact-${k}-error` : undefined,
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inFlight.current) return; // blocks double submits
    const check = validateContact(values);
    if (!check.ok) {
      setErrors(check.errors);
      return;
    }
    const website = String(new FormData(e.currentTarget).get("website") ?? "");
    inFlight.current = true;
    setErrors({});
    setNotice("");
    setStatus("sending");
    submissionId.current ||= crypto.randomUUID();
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, website, startedAt: startedAt.current, submissionId: submissionId.current }),
      });
      const data: { error?: string; errors?: FieldErrors } = await res.json().catch(() => ({}));
      if (res.ok) {
        setValues(empty); // cleared only on success
        submissionId.current = "";
        setStatus("success");
        return;
      }
      if (res.status === 422 && data.errors) setErrors(data.errors);
      setNotice(data.error ?? "Something went wrong. Please try again.");
      setStatus("error"); // values stay so the visitor can retry
    } catch {
      setNotice("Network error. Check your connection and try again.");
      setStatus("error");
    } finally {
      inFlight.current = false;
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="glass-soft rounded-2xl p-6 sm:p-8">
        <span className="grid h-10 w-10 place-items-center rounded-xl border border-accent-400/30 bg-accent-400/10 text-accent-300">
          <Check size={18} aria-hidden="true" />
        </span>
        <h3 className="mt-4 font-semibold text-bone">Message sent</h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-400">Thanks for reaching out. Your message is on its way to my inbox.</p>
        <button type="button" onClick={() => { startedAt.current = Date.now(); setStatus("idle"); }} className="mt-5 text-sm text-accent-300 transition-colors hover:text-accent-200">
          Send another message
        </button>
      </div>
    );
  }

  const sending = status === "sending";
  return (
    <form onSubmit={onSubmit} noValidate aria-busy={sending} className="glass-soft rounded-2xl p-6 sm:p-8">
      <h3 className="font-semibold text-bone">Send me a message</h3>
      <div className="mt-6 space-y-5">
        <Field id="contact-name" label="Name" optional error={errors.name}>
          <input type="text" autoComplete="name" maxLength={LIMITS.name} {...field("name")} />
        </Field>
        <Field id="contact-email" label="Email" error={errors.email}>
          <input type="email" autoComplete="email" required maxLength={LIMITS.email} {...field("email")} />
        </Field>
        <Field id="contact-subject" label="Subject" error={errors.subject}>
          <input type="text" required maxLength={LIMITS.subject} {...field("subject")} />
        </Field>
        <Field id="contact-message" label="Message" error={errors.message}>
          <textarea rows={5} required maxLength={LIMITS.message} {...field("message")} className={`${input} resize-y`} />
        </Field>
        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
          <label>Website<input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
        </div>
        {status === "error" && notice && (
          <p role="alert" className="rounded-xl border border-accent-400/30 bg-accent-400/10 px-4 py-3 text-sm text-accent-200">{notice}</p>
        )}
        <p role="status" className="sr-only">{sending ? "Sending your message" : ""}</p>
        <button type="submit" disabled={sending} className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-300 disabled:cursor-not-allowed disabled:opacity-60">
          {sending ? (<><Loader2 size={16} className="animate-spin" aria-hidden="true" /> Sending…</>) : (<><Send size={16} aria-hidden="true" /> {status === "error" ? "Try again" : "Send message"}</>)}
        </button>
      </div>
    </form>
  );
}
