"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { EASE_OUT, fadeUp } from "@/lib/motion";

// A film reel standing in for the "0" of 404.
function Reel({ spin }: { spin: boolean }) {
  const holes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * 60 * Math.PI) / 180;
    return { x: (100 + 54 * Math.cos(a)).toFixed(2), y: (100 + 54 * Math.sin(a)).toFixed(2) };
  });
  return (
    <motion.svg
      viewBox="0 0 200 200"
      aria-hidden
      className="h-full w-full"
      animate={spin ? { rotate: 360 } : undefined}
      transition={{ duration: 22, ease: "linear", repeat: Infinity }}
    >
      <circle cx="100" cy="100" r="94" fill="#ff4b08" stroke="#0a0a0a" strokeWidth="7" />
      {holes.map((h, i) => (
        <circle key={i} cx={h.x} cy={h.y} r="18" fill="#eae8e2" stroke="#0a0a0a" strokeWidth="6" />
      ))}
      <circle cx="100" cy="100" r="17" fill="#0a0a0a" />
      <circle cx="100" cy="100" r="6" fill="#eae8e2" />
    </motion.svg>
  );
}

const digit =
  "block select-none text-[clamp(120px,24vw,300px)] font-black leading-[0.8] tracking-tighter text-zinc-900";

export default function NotFoundView() {
  const reduced = useReducedMotion();

  return (
    <section className="mx-auto w-full max-w-6xl px-[6%] pb-20 pt-24 text-center sm:pt-28">
      <motion.span
        {...fadeUp(0, 14, 0.5)}
        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-700"
      >
        <span className="h-2 w-2 rounded-full" style={{ background: "#ff4b08" }} />
        Error 404
      </motion.span>

      <div className="mt-8 flex items-center justify-center gap-[2vw]" role="img" aria-label="404">
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: EASE_OUT }}
          className={digit}
        >
          4
        </motion.span>
        <motion.div
          initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.25, ease: EASE_OUT }}
          className="aspect-square w-[clamp(105px,20vw,255px)]"
        >
          <Reel spin={!reduced} />
        </motion.div>
        <motion.span
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE_OUT }}
          className={digit}
        >
          4
        </motion.span>
      </div>

      <motion.h1
        {...fadeUp(0.55, 24, 0.8)}
        className="mx-auto mt-12 max-w-2xl text-[clamp(28px,4.4vw,52px)] font-bold leading-[1.02] tracking-tight text-zinc-900"
      >
        This scene didn&apos;t make
        <br />
        the <span style={{ color: "#ff4b08" }}>final cut.</span>
      </motion.h1>

      <motion.p
        {...fadeUp(0.68, 18, 0.7)}
        className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-zinc-600 sm:text-base"
      >
        The page you&apos;re looking for isn&apos;t on our call sheet. It may have moved, or the link
        may be wrong.
      </motion.p>

      <motion.div {...fadeUp(0.8, 16, 0.6)} className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          style={{ background: "#ff4b08" }}
        >
          <ArrowLeft size={16} />
          Back to home
        </Link>
        <Link
          href="/studio"
          className="inline-flex items-center gap-2 rounded-full border border-zinc-900/50 px-6 py-3 text-sm font-semibold text-zinc-900 transition-colors hover:bg-zinc-900 hover:text-white"
        >
          Visit the studio
          <ArrowUpRight size={16} />
        </Link>
      </motion.div>
    </section>
  );
}
