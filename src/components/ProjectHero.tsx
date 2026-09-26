"use client";

import { motion } from "framer-motion";
import { EASE_OUT, fadeUpInView } from "@/lib/motion";

// Section 1 — the RED-09 product hero. A plain, always-visible layout (no
// scroll-jacking) with a one-time entrance animation per block, matching
// the reference's settled hero framing: title, price, color options,
// description and the product visual, angled and lightly rotated.

export default function ProjectHero() {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Faint grid lines, matching the reference's hairline columns */}
      <div className="pointer-events-none absolute inset-0 grid grid-cols-3 opacity-40">
        <div className="border-r border-zinc-100" />
        <div className="border-r border-zinc-100" />
        <div />
      </div>

      <div className="relative mx-auto flex min-h-[80vh] max-w-[1600px] flex-col justify-center px-[6%] pb-48 pt-40">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          {/* Text column */}
          <div>
            <motion.div {...fadeUpInView(0)} className="flex items-center gap-3 text-sm text-zinc-500">
              <span className="h-px w-8 bg-zinc-300" />
              The Ultimate Chord Machine
            </motion.div>

            <motion.h1
              {...fadeUpInView(0.05, 32)}
              className="mt-4 text-[clamp(56px,9vw,120px)] font-bold leading-[0.85] tracking-tight text-zinc-900"
            >
              RED-09
            </motion.h1>

            <motion.p
              {...fadeUpInView(0.15)}
              className="mt-8 max-w-sm text-sm leading-relaxed text-zinc-500"
            >
              a portable, expressive chord keyboard designed to unlock
              intuitive creativity and real-time chord progressions.
            </motion.p>

            <motion.div {...fadeUpInView(0.22)} className="mt-10 flex items-end gap-6">
              <div className="flex items-end gap-1">
                <span className="text-4xl font-bold tracking-tight text-zinc-900">$709</span>
                <span className="pb-1 text-sm text-zinc-400">.00</span>
              </div>
              <div className="flex items-center gap-2 pb-1.5 text-xs text-zinc-400">
                <span>TYPE:</span>
                <span className="h-4 w-4 rounded-full bg-orange-500" />
                <span className="h-4 w-4 rounded-full border border-zinc-300 bg-zinc-900" />
                <span className="h-4 w-4 rounded-full border border-zinc-300 bg-white" />
              </div>
            </motion.div>

            <motion.div {...fadeUpInView(0.3)} className="mt-10">
              <span className="text-xs text-zinc-400">$799.00 · Now Available</span>
            </motion.div>
          </div>

          {/* Product visual — a one-time "extreme close-up blur pulls back
              to normal framing" entrance, matching the reference's opening
              beat, but never scroll-linked so it can't glitch on scroll. */}
          <motion.div
            initial={{ opacity: 0, scale: 1.6, filter: "blur(24px)", rotate: -14 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", rotate: -8 }}
            transition={{ duration: 1.4, ease: EASE_OUT }}
            className="relative mx-auto h-[60vh] w-full max-w-md"
          >
            <div className="h-full w-full overflow-hidden rounded-[2.5rem] shadow-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/Frame-34.jpeg"
                alt="RED-09 chord machine"
                className="h-full w-full object-cover"
              />
              <span className="absolute right-4 top-4 rounded-full bg-black/40 px-3 py-1 text-[10px] font-semibold tracking-wide text-white backdrop-blur-sm">
                New version
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
