import type { ContactInput } from "./contact";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

/** Builds the notification email. Every visitor-supplied value is HTML-escaped. */
export function buildEmail(d: ContactInput, now: Date = new Date()) {
  const when = new Intl.DateTimeFormat("en-PH", { dateStyle: "full", timeStyle: "long", timeZone: "Asia/Manila" }).format(now);
  const submitted = `${when} (${now.toISOString()})`;
  const name = d.name || "Not provided";
  const rows: [string, string][] = [["Name", name], ["Email", d.email], ["Subject", d.subject], ["Submitted", submitted]];

  const text = [...rows.map(([k, v]) => `${k}: ${v}`), "", d.message].join("\n");
  const html =
    `<div style="font-family:system-ui,-apple-system,Segoe UI,sans-serif;font-size:15px;line-height:1.6;color:#111">` +
    `<table style="border-collapse:collapse">${rows.map(([k, v]) => `<tr><td style="padding:3px 16px 3px 0;color:#6b7280;vertical-align:top">${k}</td><td style="padding:3px 0">${esc(v)}</td></tr>`).join("")}</table>` +
    `<hr style="border:none;border-top:1px solid #e5e7eb;margin:16px 0"><p style="white-space:pre-wrap;margin:0">${esc(d.message)}</p></div>`;

  return { subject: `Portfolio Contact — ${d.subject}`, text, html };
}
