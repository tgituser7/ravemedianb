"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";
import { EASE_OUT, fadeUpInView } from "@/lib/motion";

const STATS = [
  "400+ Ad Films",
  "2M+ Daily Audience",
  "20+ Channels",
  "7+ Languages",
  "100+ Titles Registered",
];

const AUTOPLAY_MS = 3200;

// A dark, full-width stats banner between the white home sections: one big
// number at a time, auto-rotating, with dots and arrows for manual control.
export default function StatsCarousel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.4 });
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (i: number) => {
    const next = (i + STATS.length) % STATS.length;
    setDir(next >= active ? 1 : -1);
    setActive(next);
  };

  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => go(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, inView]);

  return (
    <section ref={sectionRef} className="border-t border-zinc-100 bg-white px-6 py-14 lg:py-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
        <motion.span
          {...fadeUpInView(0, 16, 0.5)}
          className="text-xs font-semibold uppercase tracking-widest text-zinc-400"
        >
          By The Numbers
        </motion.span>

        {/* Not `absolute`: with mode="wait" only one stat is ever mounted
            at a time, so normal flow is enough — and it's what lets a long
            stat that wraps to two lines lay out and center correctly,
            instead of overflowing a fixed-height clipped box. */}
        <div className="mt-8 flex min-h-[6.5rem] w-full max-w-3xl items-center justify-center px-4 sm:min-h-[8.5rem]">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.p
              key={active}
              custom={dir}
              initial={{ opacity: 0, x: dir > 0 ? 40 : -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir > 0 ? -40 : 40 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="text-[clamp(36px,7vw,68px)] font-bold leading-tight tracking-tight text-zinc-900"
            >
              {STATS[active]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-6">
          <button
            type="button"
            aria-label="Previous stat"
            onClick={() => go(active - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900/30 bg-white text-zinc-900 transition-all hover:scale-105 hover:bg-zinc-900 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <div className="flex items-center gap-2.5">
            {STATS.map((s, i) => (
              <button
                key={s}
                type="button"
                aria-label={`Go to stat ${i + 1}`}
                aria-current={i === active}
                onClick={() => go(i)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  i === active ? "w-6 bg-orange-500" : "w-2 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          <button
            type="button"
            aria-label="Next stat"
            onClick={() => go(active + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-900/30 bg-white text-zinc-900 transition-all hover:scale-105 hover:bg-zinc-900 hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
