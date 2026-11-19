"use client";

import type { ReactNode } from "react";
import { MotionConfig } from "framer-motion";

/** Makes every Framer Motion animation respect prefers-reduced-motion. */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
