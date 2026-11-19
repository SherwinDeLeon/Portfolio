"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { contacts } from "@/data/site";

const links = [
  { label: "About", id: "about" },
  { label: "Projects", id: "projects" },
  { label: "Foundation", id: "foundation" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
].filter((l) => l.id !== "contact" || contacts.length > 0);

/** Floating glass pill: bottom of the screen on phones, top on larger screens. */
export default function Nav() {
  const [active, setActive] = useState("");
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id === "top" ? "" : e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ["top", ...links.map((l) => l.id)].forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  return (
    <header className="fixed inset-x-0 bottom-[max(1rem,env(safe-area-inset-bottom))] z-50 flex justify-center px-3 sm:bottom-auto sm:top-4">
      <nav aria-label="Primary" className="glass flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full p-1.5">
        <a href="#top" aria-label="Rohn Sherwin De Leon, back to top" className="grid h-9 w-9 shrink-0 place-items-center rounded-full font-mono text-sm font-bold text-accent-300">
          SD
        </a>
        {links.map((l) => (
          <a key={l.id} href={`#${l.id}`} aria-current={active === l.id ? "true" : undefined} className={`relative whitespace-nowrap rounded-full px-2.5 py-2 text-[11px] transition-colors sm:px-4 sm:text-sm ${active === l.id ? "text-white" : "text-zinc-400 hover:text-white"}`}>
            {active === l.id && (
              <motion.span layoutId="navlens" className="absolute inset-0 -z-10 rounded-full bg-white/10 ring-1 ring-inset ring-white/15" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
            )}
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
