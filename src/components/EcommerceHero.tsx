"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, fadeUpInView, buttonMotion, viewportOnce } from "@/lib/motion";
import { imageAt } from "@/lib/images";

const STACK = [
  {
    label: "Bosch / Bruegel",
    gradient: "from-neutral-900 via-red-900 to-red-700",
    posClass: "left-0 top-0 h-64 w-44 sm:h-72 sm:w-52",
    rotate: 180,
    z: 10,
    initial: { opacity: 0, scale: 0.9, y: 50, rotate: 180 },
  },
  {
    label: "New Now",
    gradient: "from-orange-50 via-rose-50 to-amber-100",
    posClass: "left-28 top-10 h-60 w-40 sm:left-40 sm:top-14 sm:h-64 sm:w-48",
    rotate: -3,
    z: 20,
    initial: { opacity: 0, scale: 0.9, x: 90, y: 0, rotate: 7 },
  },
  {
    label: "Tesla",
    gradient: "from-zinc-900 via-red-950 to-zinc-800",
    posClass: "left-[13rem] top-20 h-60 w-40 sm:left-[19rem] sm:top-24 sm:h-64 sm:w-48",
    rotate: 2,
    z: 30,
    initial: { opacity: 0, scale: 0.9, y: -45, rotate: 10 },
  },
  {
    label: "Self Portrait",
    gradient: "from-sky-800 via-blue-900 to-teal-800",
    posClass: "left-[18.5rem] top-16 h-60 w-40 sm:left-[26rem] sm:top-20 sm:h-64 sm:w-48",
    rotate: -1,
    z: 40,
    initial: { opacity: 0, scale: 0.9, x: 110, rotate: -9 },
  },
  {
    label: "Comic Box",
    gradient: "from-yellow-300 via-amber-400 to-red-500",
    posClass: "left-[24rem] top-20 h-60 w-40 sm:left-[33rem] sm:top-24 sm:h-64 sm:w-48",
    rotate: 2,
    z: 50,
    initial: { opacity: 0, scale: 0.9, x: 130, rotate: 12 },
  },
];

const STACK_BASE_DELAY = 0.35;
const STACK_STAGGER = 0.1;

export default function EcommerceHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const stackX = useTransform(scrollYProgress, [0, 1], [24, -24]);

  return (
    <section ref={sectionRef} className="overflow-hidden px-6 py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <motion.span
            {...fadeUpInView(0, 16, 0.5)}
            className="block text-xs font-semibold uppercase tracking-widest text-zinc-900"
          >
            E-Commerce
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl"
          >
            Showcase, Sell,
            <br />
            <motion.span
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.28, ease: EASE_OUT }}
              className="inline-block text-red-800"
            >
              &amp; acquire arts to
            </motion.span>
            <br />
            our marketplace.
          </motion.h2>

          <motion.p
            {...fadeUpInView(0.2, 20, 0.6)}
            className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-500 sm:text-base"
          >
            Dynamic community where artists and buyers seamlessly merge.
            ArtFusion brings together creators and enthusiasts to share
            creativity.
          </motion.p>

          <motion.div
            {...fadeUpInView(0.32, 16, 0.5)}
            className="mt-8 flex items-center gap-3"
          >
            <motion.button
              {...buttonMotion}
              className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800"
            >
              Join for $9.99/m
            </motion.button>
            <motion.button
              {...buttonMotion}
              className="rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
            >
              Read more
            </motion.button>
          </motion.div>
        </div>

        <div className="relative">
          <motion.div
            {...fadeUpInView(STACK_BASE_DELAY + 0.4, 10, 0.5)}
            className="absolute right-0 top-0 z-50 hidden flex-col gap-2 sm:flex"
          >
            <button
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 shadow-md transition-colors hover:bg-zinc-50"
            >
              <ChevronUp size={16} />
            </button>
            <button
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 shadow-md transition-colors hover:bg-zinc-50"
            >
              <ChevronDown size={16} />
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: STACK_BASE_DELAY + 0.1, ease: EASE_OUT }}
            className="absolute -left-2 -top-6 z-40 flex items-center gap-1.5 rounded-full bg-red-800 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:left-32 sm:-top-4"
          >
            @howard
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: STACK_BASE_DELAY + 0.25, ease: EASE_OUT }}
            className="absolute left-[15rem] top-24 z-40 flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:left-[21rem] sm:top-16"
          >
            @robin
          </motion.div>

          <motion.div style={{ x: stackX }} className="relative h-72 w-full sm:h-80">
            {STACK.map((card, i) => (
              <PlaceholderImage
                key={card.label}
                label={card.label}
                gradient={card.gradient}
                src={imageAt(i + 6)}
                initial={card.initial}
                whileInView={{ opacity: 1, scale: 1, x: 0, y: 0, rotate: card.rotate }}
                viewport={viewportOnce}
                transition={{
                  duration: 0.9,
                  delay: STACK_BASE_DELAY + i * STACK_STAGGER,
                  ease: EASE_OUT,
                }}
                className={`absolute rounded-2xl border-4 border-white shadow-xl ${card.posClass}`}
                style={{ zIndex: card.z }}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
