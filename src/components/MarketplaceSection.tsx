"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, fadeUpInView, buttonMotion, viewportOnce } from "@/lib/motion";
import { imageAt } from "@/lib/images";

const ITEMS = [
  { label: "Artnesia Gap", gradient: "from-zinc-900 via-zinc-800 to-black" },
  { label: "Immortalise Works", gradient: "from-violet-500 via-purple-600 to-indigo-700" },
  { label: "Creativity Class", gradient: "from-rose-500 via-orange-400 to-yellow-300" },
  { label: "Celebrates Party", gradient: "from-emerald-500 via-teal-500 to-blue-600" },
];

const CARD_STAGGER = 0.1;
const SLIDE_SECONDS = 3.5;

export default function MarketplaceSection() {
  const [active, setActive] = useState(0);
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const rowX = useTransform(scrollYProgress, [0, 1], [16, -16]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setActive((a) => (a + 1) % ITEMS.length);
    }, SLIDE_SECONDS * 1000);
    return () => clearTimeout(timer);
  }, [active]);

  const goTo = (i: number) => setActive(i);

  return (
    <section ref={sectionRef} className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <motion.span
              {...fadeUpInView(0, 16, 0.5)}
              className="text-xs font-semibold uppercase tracking-widest text-zinc-900"
            >
              Get more <span className="text-fuchsia-600">closer</span>
            </motion.span>
            <motion.h2
              {...fadeUpInView(0.08, 30, 0.7)}
              className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl"
            >
              Marketplace for Creativity
            </motion.h2>
            <motion.p
              {...fadeUpInView(0.18, 20, 0.6)}
              className="mt-4 text-sm leading-relaxed text-zinc-500 sm:text-base"
            >
              In the realm of Artnesia, creativity knows no bounds, an
              eternal marketplace that celebrates the timeless nature of
              art.
            </motion.p>
          </div>
          <motion.button
            {...fadeUpInView(0.28, 16, 0.5)}
            {...buttonMotion}
            className="flex-shrink-0 rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-fuchsia-700"
          >
            View All
          </motion.button>
        </div>

        <motion.div style={{ x: rowX }} className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.35 + i * CARD_STAGGER, ease: EASE_OUT }}
            >
              <PlaceholderImage
                label={item.label}
                gradient={item.gradient}
                src={imageAt(i + 11)}
                className="aspect-[3/4] rounded-2xl"
              />
              <p className="mt-3 text-sm font-medium text-zinc-900">
                {item.label}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          {...fadeUpInView(0.35 + ITEMS.length * CARD_STAGGER + 0.1, 12, 0.5)}
          className="mt-8 flex items-center gap-2"
        >
          <button
            aria-label="Previous"
            onClick={() => goTo((active - 1 + ITEMS.length) % ITEMS.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            aria-label="Next"
            onClick={() => goTo((active + 1) % ITEMS.length)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50"
          >
            <ChevronRight size={16} />
          </button>
        </motion.div>

        <motion.div
          {...fadeUpInView(0.35 + ITEMS.length * CARD_STAGGER + 0.15, 10, 0.5)}
          className="mt-4 flex items-center gap-2"
        >
          {ITEMS.map((item, i) => (
            <button
              key={item.label}
              aria-label={`Go to ${item.label}`}
              onClick={() => goTo(i)}
              className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-100"
            >
              {i < active ? (
                <div className="h-full w-full rounded-full bg-zinc-900" />
              ) : i === active ? (
                <motion.div
                  key={active}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: SLIDE_SECONDS, ease: "linear" }}
                  style={{ transformOrigin: "left" }}
                  className="h-full w-full rounded-full bg-zinc-900"
                />
              ) : null}
            </button>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
