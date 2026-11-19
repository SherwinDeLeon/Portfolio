"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const start = (i / n) * 0.85;
  const opacity = useTransform(p, [start, start + 0.12], [0.4, 1]);
  return <motion.span style={{ opacity }}>{w} </motion.span>;
}

/**
 * Text that brightens word by word as it scrolls into view.
 * The wrapper (and its ref) always renders, and the server and first client render are
 * identical plain text; the word-by-word effect only switches on after mount.
 */
export default function SweptText({ paragraphs, className }: { paragraphs: string[]; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 50%"] });
  const animate = mounted && !reduce;
  const total = paragraphs.reduce((sum, t) => sum + t.split(" ").length, 0);
  let k = 0;

  return (
    <div ref={ref} className={className}>
      {paragraphs.map((t) => (
        <p key={t}>
          {animate
            ? t.split(" ").map((w) => {
                const i = k++;
                return <Word key={i} w={w} i={i} n={total} p={scrollYProgress} />;
              })
            : t}
        </p>
      ))}
    </div>
  );
}
