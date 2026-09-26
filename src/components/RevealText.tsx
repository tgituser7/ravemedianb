"use client";

import { motion } from "framer-motion";
import { EASE_OUT, viewportOnce } from "@/lib/motion";

// Word-by-word "rise from a mask" reveal. Each word sits in its own
// overflow-hidden slot and slides up into view when the block scrolls in.
// The slot has a little bottom padding (pulled back with a negative margin)
// so descenders like "g" and "y" are not clipped.
export default function RevealText({
  text,
  className,
  delay = 0,
  stagger = 0.07,
  duration = 0.8,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((word, i) => (
        // The in-view trigger lives on the (visible) mask, not on the word:
        // a word translated fully out of its overflow-hidden mask counts as
        // off-screen and would never fire.
        <motion.span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-top"
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%" },
              show: { y: "0%", transition: { duration, delay: delay + i * stagger, ease: EASE_OUT } },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </motion.span>
      ))}
    </span>
  );
}
