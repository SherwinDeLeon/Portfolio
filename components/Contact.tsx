import { ArrowUpRight } from "lucide-react";
import ContactForm from "./ContactForm";
import { contactIcons } from "./icons";
import { contacts } from "@/data/site";

export default function Contact() {
  if (contacts.length === 0) return null; // Nothing to show until real links are added to data/site.ts.
  return (
    <section id="contact" aria-labelledby="contact-title" className="glass relative isolate mx-3 my-6 overflow-hidden rounded-[2rem] sm:mx-6 lg:my-10">
      <div className="mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-40">
        <h2 id="contact-title" className="max-w-3xl text-[clamp(2.25rem,6vw,4.75rem)] font-medium leading-[1] tracking-[-0.04em] text-bone">
          Let’s talk software and finance.
        </h2>
        <ul className="mt-14 max-w-xl divide-y divide-white/10 border-y border-white/10">
          {contacts.map(({ label, value, href }) => {
            const Icon = contactIcons[label];
            const external = label !== "Email";
            return (
              <li key={label}>
                <a href={href} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})} className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-accent-300">
                  <span className="flex items-center gap-4">
                    <Icon size={20} aria-hidden="true" />
                    <span>
                      <span className="block font-mono text-xs text-zinc-500">{label}</span>
                      <span className="text-lg text-bone">{value}</span>
                    </span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-14 max-w-xl">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
