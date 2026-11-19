"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { Step } from "@/data/journey";

const marker: Record<Step["status"], string> = {
  done: "border-accent-400 bg-accent-400",
  current: "border-accent-300 bg-ink shadow-[0_0_14px_rgb(var(--accent)/0.6)]",
};

export default function Timeline({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute bottom-2 left-[9px] top-2 w-px bg-white/10" />
      <motion.span aria-hidden="true" style={{ scaleY, transformOrigin: "top" }} className="absolute bottom-2 left-[9px] top-2 w-px bg-accent-400" />
      <ol ref={ref} className="space-y-12">
        {steps.map((s) => (
          <li key={s.title} className="relative pl-12">
            <span aria-hidden="true" className={`absolute left-0 top-1.5 h-5 w-5 rounded-full border-2 ${marker[s.status]}`} />
            <p className="font-mono text-xs text-zinc-500">{s.when}</p>
            <h3 className={`mt-1 text-xl font-semibold text-white`}>{s.title}</h3>
            <p className="mt-2 max-w-lg leading-relaxed text-zinc-400">{s.detail}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
