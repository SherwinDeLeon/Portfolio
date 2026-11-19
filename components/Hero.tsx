"use client";

import type { PointerEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform, type Variants } from "framer-motion";
import CodeArt from "./CodeArt";
import { contactIcons } from "./icons";
import { contacts, site } from "@/data/site";

const list: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } } };
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const ghost = "glass inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm text-zinc-100 transition-colors hover:text-accent-300";

export default function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const artY = useTransform(scrollY, [0, 900], [0, 100]);
  const fade = useTransform(scrollY, [0, 520], [1, 0]);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 50, damping: 20 });
  const py = useSpring(my, { stiffness: 50, damping: 20 });
  const social = contacts.filter((c) => c.label !== "Email");

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="top" aria-labelledby="hero-title" onPointerMove={onMove} className="relative isolate min-h-[100svh] overflow-hidden">
      <div aria-hidden="true" className="dots-bg absolute inset-0 -z-30" />
      <motion.div aria-hidden="true" style={{ y: artY }} className="pointer-events-none absolute inset-0 -z-20">
        <CodeArt px={px} py={py} />
      </motion.div>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 via-ink/25 to-transparent xl:via-transparent" />

      <motion.div variants={list} initial="hidden" animate="show" style={{ opacity: fade }} className="mx-auto flex min-h-[100svh] w-full max-w-6xl flex-col justify-between px-5 pb-28 pt-28 sm:px-8 sm:pb-14">
        <motion.div variants={item}>
          <p className="text-3xl font-medium tracking-[-0.03em] text-bone sm:text-4xl">{site.name}</p>
          <p className="mt-2 font-mono text-xs text-zinc-400">{site.meta}</p>
        </motion.div>
        <div>
          <motion.h1 id="hero-title" variants={item} className="max-w-4xl text-[clamp(2.4rem,6.2vw,5.25rem)] font-medium leading-[1.02] tracking-[-0.04em] text-bone">
            {site.headline}
          </motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-300">{site.tagline}</motion.p>
          <div className="mt-9 flex flex-wrap items-end justify-between gap-6">
            <motion.div variants={item} className="flex flex-wrap gap-3">
              <a href="#projects" className="inline-flex items-center rounded-full bg-accent-400 px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-300">View projects</a>
              {contacts.length > 0 && <a href="#contact" className={ghost}>Contact</a>}
              {social.map(({ label, href }) => {
                const Icon = contactIcons[label];
                return (
                  <a key={label} href={href} target="_blank" rel="noreferrer noopener" aria-label={label} className={ghost}>
                    <Icon size={16} aria-hidden="true" /> {label}
                  </a>
                );
              })}
            </motion.div>
            <motion.p variants={item} className="hidden font-mono text-[11px] text-zinc-500 xl:block">
              fig. 1 · first programs, in Python and C
            </motion.p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
