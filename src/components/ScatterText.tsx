"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

const SCATTER_OFFSETS = [
  { x: -60, y: -40, rotate: -18 },
  { x: 70, y: 30, rotate: 14 },
  { x: -40, y: 50, rotate: 10 },
  { x: 55, y: -55, rotate: -12 },
  { x: -80, y: 10, rotate: 20 },
  { x: 30, y: 60, rotate: -16 },
];

export default function ScatterText({
  text,
  delayMs = 0,
  staggerMs = 60,
  className = "",
}: {
  text: string;
  delayMs?: number;
  staggerMs?: number;
  className?: string;
}) {
  const baseDelay = delayMs / 1000;
  const stagger = staggerMs / 1000;

  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => {
        const offset = SCATTER_OFFSETS[i % SCATTER_OFFSETS.length];
        return (
          <motion.span
            key={i}
            aria-hidden
            initial={{
              opacity: 0,
              x: offset.x,
              y: offset.y,
              rotate: offset.rotate,
            }}
            animate={{ opacity: 1, x: 0, y: 0, rotate: 0 }}
            transition={{
              duration: 0.6,
              delay: baseDelay + i * stagger,
              ease: EASE_OUT,
            }}
            className="inline-block"
          >
            {char}
          </motion.span>
        );
      })}
    </span>
  );
}
