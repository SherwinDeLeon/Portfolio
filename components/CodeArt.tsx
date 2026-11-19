"use client";

import { motion, useTransform, type MotionValue } from "framer-motion";

type Kind = "k" | "s" | "f" | "c" | "";
type Tok = readonly [string, Kind];
const tone: Record<Kind, string> = { k: "text-accent-300", s: "text-accent2-300", f: "text-accent-200", c: "text-zinc-500", "": "text-zinc-200" };

// The classic first programs from CS50P (Python) and CS50x (C).
const python: Tok[][] = [
  [["# cs50p", "c"]],
  [["def ", "k"], ["main", "f"], ["():", ""]],
  [["    name = ", ""], ["input", "f"], ["(", ""], ["\"What's your name? \"", "s"], [")", ""]],
  [["    ", ""], ["print", "f"], ["(", ""], ["f\"hello, {name}\"", "s"], [")", ""]],
  [],
  [["main", "f"], ["()", ""]],
];
const c: Tok[][] = [
  [["#include ", "k"], ["<stdio.h>", "s"]],
  [],
  [["int ", "k"], ["main", "f"], ["(", ""], ["void", "k"], [")", ""]],
  [["{", ""]],
  [["    ", ""], ["printf", "f"], ["(", ""], ["\"hello, world\\n\"", "s"], [");", ""]],
  [["}", ""]],
];
const glyphs = [
  { t: "{ }", pos: "right-[46%] top-[14%]", d: 38, f: "float-b" },
  { t: "=>", pos: "right-[5%] top-[40%]", d: 58, f: "float-a" },
  { t: "( )", pos: "right-[42%] bottom-[12%]", d: 30, f: "float-b" },
];

function Layer({ px, py, depth, className, children }: { px: MotionValue<number>; py: MotionValue<number>; depth: number; className: string; children: React.ReactNode }) {
  const x = useTransform(px, [-0.5, 0.5], [-depth, depth]);
  const y = useTransform(py, [-0.5, 0.5], [-depth, depth]);
  return <motion.div style={{ x, y }} className={`absolute ${className}`}>{children}</motion.div>;
}

function Win({ file, lines, caret, rot, float }: { file: string; lines: Tok[][]; caret?: boolean; rot: string; float: string }) {
  return (
    <div className={float}>
      <div className={`glass overflow-hidden rounded-2xl ${rot}`}>
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-400/90" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-400/50" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-400/25" />
          <span className="ml-3 font-mono text-xs text-zinc-400">{file}</span>
        </div>
        <ol className="px-4 py-4 font-mono text-[13px] leading-6">
          {lines.map((line, i) => (
            <li key={i} className="flex gap-4">
              <span aria-hidden="true" className="w-4 select-none text-right text-zinc-600">{i + 1}</span>
              <code className="whitespace-pre">
                {line.length ? line.map(([t, k], j) => <span key={j} className={tone[k]}>{t}</span>) : " "}
                {caret && i === lines.length - 1 && <span className="caret" />}
              </code>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

/** Decorative coding scene: layered glass editor windows, a giant outlined </> and floating symbols. */
export default function CodeArt({ px, py }: { px: MotionValue<number>; py: MotionValue<number> }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <span aria-hidden="true" className="glyph absolute right-[-6%] top-1/2 -translate-y-1/2 select-none font-mono text-[clamp(11rem,30vw,28rem)] font-bold leading-none">
        {"</>"}
      </span>
      <div className="absolute inset-0 hidden xl:block">
        <Layer px={px} py={py} depth={18} className="right-[6%] top-[15%] w-[25rem]">
          <Win file="hello.py" lines={python} caret rot="-rotate-2" float="float-a" />
        </Layer>
        <Layer px={px} py={py} depth={34} className="right-[3%] top-[50%] w-[21rem]">
          <Win file="hello.c" lines={c} rot="rotate-2" float="float-b" />
        </Layer>
        {glyphs.map((g) => (
          <Layer key={g.t} px={px} py={py} depth={g.d} className={g.pos}>
            <span className={`${g.f} glass inline-block rounded-xl px-4 py-2 font-mono text-lg text-accent-300`}>{g.t}</span>
          </Layer>
        ))}
      </div>
    </div>
  );
}
