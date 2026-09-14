"use client";

import { motion } from "framer-motion";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, buttonMotion } from "@/lib/motion";
import { imageAt } from "@/lib/images";

const CARDS: {
  label: string;
  rotate: number;
  y: number;
  gradient: string;
}[] = [
  { label: "Card 01", rotate: -20, y: 30, gradient: "from-red-900 via-zinc-900 to-black" },
  { label: "Card 02", rotate: -12, y: 12, gradient: "from-blue-600 via-indigo-700 to-blue-900" },
  { label: "Card 03", rotate: -4, y: 0, gradient: "from-amber-300 via-amber-400 to-orange-500" },
  { label: "Card 04", rotate: 4, y: 0, gradient: "from-orange-300 via-rose-300 to-sky-400" },
  { label: "Card 05", rotate: 12, y: 12, gradient: "from-red-600 via-red-700 to-rose-900" },
  { label: "Card 06", rotate: 20, y: 30, gradient: "from-emerald-500 via-emerald-600 to-teal-800" },
];

const CENTER_INDEX = 2.5;
const CARDS_BASE_DELAY = 0.5;

// Cards converge from the center card's spot (small + upright) and "multiply"
// outward into their fanned positions, staggered by distance from center so
// the middle settles first and the fan builds outward from it.
function cardInitial(card: (typeof CARDS)[number], i: number) {
  const pull = (CENTER_INDEX - i) * 60;
  return { opacity: 0, scale: 0.6, x: pull, y: card.y, rotate: 0 };
}

function cardDelay(i: number) {
  return Math.abs(i - CENTER_INDEX) * 0.13;
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center"
      >
        <div className="h-[420px] w-[900px] rounded-full bg-gradient-to-b from-zinc-200/70 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-[64px]"
        >
          A place to display your masterpiece.
        </motion.h1>
      </div>

      <div className="relative mx-auto mt-14 flex h-56 max-w-5xl items-start justify-center sm:h-72 lg:h-80">
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
          className="absolute left-[24%] top-6 z-30 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:top-10"
        >
          @coplin
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.65, ease: EASE_OUT }}
          className="absolute right-[12%] top-0 z-30 flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:top-4"
        >
          @andrea
        </motion.div>

        <div className="flex items-start justify-center">
          {CARDS.map((card, i) => (
            <PlaceholderImage
              key={card.label}
              label={card.label}
              gradient={card.gradient}
              src={imageAt(i)}
              initial={cardInitial(card, i)}
              animate={{ opacity: 1, scale: 1, x: 0, y: card.y, rotate: card.rotate }}
              transition={{
                duration: 0.8,
                delay: CARDS_BASE_DELAY + cardDelay(i),
                ease: EASE_OUT,
              }}
              className={`h-40 w-28 flex-shrink-0 rounded-2xl border-[3px] border-white shadow-2xl sm:h-56 sm:w-40 lg:h-64 lg:w-44 ${
                i === 0 ? "" : "-ml-8 sm:-ml-14 lg:-ml-16"
              }`}
              style={{ zIndex: i <= 2 ? i + 1 : 6 - i }}
            />
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.3, ease: EASE_OUT }}
        className="mx-auto mt-10 max-w-lg text-center sm:mt-6"
      >
        <p className="text-sm leading-relaxed text-zinc-500 sm:text-base">
          Artists can display their masterpieces, and buyers can discover and
          collect one-of-a-kind pieces with ease.
        </p>
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.45, ease: EASE_OUT }}
          {...buttonMotion}
          className="rounded-full bg-zinc-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
        >
          Join for $9.99/m
        </motion.button>
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 1.55, ease: EASE_OUT }}
          {...buttonMotion}
          className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900"
        >
          Read more
        </motion.button>
      </div>
    </section>
  );
}
