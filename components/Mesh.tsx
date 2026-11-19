"use client";

import { motion, useScroll, useTransform } from "framer-motion";

const fill = (color: string) => ({ background: `radial-gradient(closest-side, ${color}, transparent)` });

/** Fixed atmospheric backdrop. Scrolling shifts its layers so the mood changes between sections. */
export default function Mesh() {
  const { scrollYProgress: p } = useScroll();
  const y1 = useTransform(p, [0, 1], ["0%", "-35%"]);
  const y2 = useTransform(p, [0, 1], ["0%", "30%"]);
  const o3 = useTransform(p, [0, 0.5, 1], [0.3, 1, 0.5]);
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-50 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute -left-[20vmax] -top-[25vmax] h-[85vmax] w-[85vmax]">
        <div className="drift-a h-full w-full" style={fill("rgb(var(--accent) / .30)")} />
      </motion.div>
      <motion.div style={{ y: y2 }} className="absolute -bottom-[30vmax] -right-[22vmax] h-[90vmax] w-[90vmax]">
        <div className="drift-b h-full w-full" style={fill("rgb(var(--accent2) / .24)")} />
      </motion.div>
      <motion.div style={{ opacity: o3 }} className="absolute left-[35%] top-[45%] h-[40vmax] w-[40vmax]">
        <div className="drift-a h-full w-full" style={fill("rgb(var(--accent-200) / .09)")} />
      </motion.div>
    </div>
  );
}
