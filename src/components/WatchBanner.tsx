"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play } from "lucide-react";
import { EASE_OUT, fadeUpInView, buttonMotion, viewportOnce } from "@/lib/motion";

const SLIDES = [
  "from-orange-400 via-orange-500 to-rose-500",
  "from-indigo-500 via-violet-600 to-fuchsia-600",
  "from-teal-500 via-emerald-600 to-lime-500",
];

const SLIDE_INTERVAL = 4000;

export default function WatchBanner() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const goTo = (i: number) => {
    setActive(i);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive((a) => (a + 1) % SLIDES.length);
    }, SLIDE_INTERVAL);
  };

  return (
    <section className="px-6 py-16 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-start justify-between gap-6">
          <div>
            <motion.span
              {...fadeUpInView(0, 16, 0.5)}
              className="block text-xs font-semibold uppercase tracking-widest text-zinc-500"
            >
              Class by Reatha C. Phelan
            </motion.span>
            <motion.h2
              {...fadeUpInView(0.1, 26, 0.7)}
              className="mt-3 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl"
            >
              Gateway to
              <br />
              artist people.
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
            className="hidden flex-shrink-0 items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:flex"
          >
            @reatha
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.9, delay: 0.2, ease: EASE_OUT }}
          className="relative mt-10 h-[380px] overflow-hidden rounded-3xl sm:h-[460px]"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className={`absolute inset-0 bg-gradient-to-br ${SLIDES[active]}`}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.25),transparent_55%)]" />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.4, ease: EASE_OUT }}
            className="absolute left-6 top-6 z-10 flex flex-col gap-1.5 sm:left-8 sm:top-8"
          >
            <span className="h-6 w-6 rounded-lg bg-white/90" />
            <span className="h-6 w-6 rounded-lg bg-zinc-900" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
            className="absolute right-6 top-6 z-10 flex items-center gap-1.5 sm:right-8 sm:top-8"
          >
            {SLIDES.map((_, i) => (
              <button
                key={i}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-5 bg-white" : "w-1.5 bg-white/50"
                }`}
              />
            ))}
          </motion.div>

          <div className="relative z-10 flex h-full w-full items-end justify-between p-6 sm:p-8">
            <motion.button
              {...fadeUpInView(0.55, 16, 0.5)}
              {...buttonMotion}
              className="flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-900 shadow-lg"
            >
              <Play size={12} fill="currentColor" strokeWidth={0} />
              Watch
            </motion.button>

            <motion.div
              {...fadeUpInView(0.65, 16, 0.5)}
              className="flex items-center gap-2"
            >
              <motion.button
                aria-label="Previous"
                onClick={() => goTo((active - 1 + SLIDES.length) % SLIDES.length)}
                {...buttonMotion}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg"
              >
                <ChevronLeft size={18} />
              </motion.button>
              <motion.button
                aria-label="Next"
                onClick={() => goTo((active + 1) % SLIDES.length)}
                {...buttonMotion}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-zinc-700 shadow-lg"
              >
                <ChevronRight size={18} />
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
