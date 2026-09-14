"use client";

import { motion } from "framer-motion";
import {
  Box,
  Gem,
  Paintbrush2,
  Atom,
  Triangle,
  Shapes,
  Flag,
  Cone,
} from "lucide-react";
import { EASE_OUT, viewportOnce } from "@/lib/motion";

const LEFT_ICONS = [Box, Gem, Paintbrush2, Shapes, Triangle, Cone];
const RIGHT_ICONS = [Atom, Flag];

const MARQUEE_TEXT =
  "Inspired by people ✦ New Art Pride ✦ Inspired by people ✦ New Art Pride ✦ ";

export default function InspiredBanner() {
  return (
    <section className="px-6 py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={viewportOnce}
        transition={{ duration: 0.9, ease: EASE_OUT }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-lime-300 px-8 py-16 sm:py-20"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full border border-lime-400/40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -left-10 top-24 h-40 w-40 rounded-full border border-lime-400/40"
        />

        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
          className="relative z-10 block text-xs font-semibold text-zinc-800"
        >
          2025
          <br />
          POSTER
        </motion.span>

        <div className="relative z-10 mt-6 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            className="flex w-max whitespace-nowrap"
          >
            <span className="animate-marquee flex flex-shrink-0 text-5xl font-semibold tracking-tight text-zinc-900 sm:text-7xl">
              {MARQUEE_TEXT.repeat(2)}
            </span>
          </motion.div>
        </div>

        <div className="relative z-10 mt-12 flex items-end justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {LEFT_ICONS.map((Icon, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7, rotate: i % 2 === 0 ? -10 : 10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: EASE_OUT }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm sm:h-14 sm:w-14"
              >
                <Icon size={18} />
              </motion.span>
            ))}
          </div>
          <div className="flex items-center gap-3">
            {RIGHT_ICONS.map((Icon, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.7, rotate: i % 2 === 0 ? 10 : -10 }}
                whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: EASE_OUT }}
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-zinc-900 shadow-sm sm:h-14 sm:w-14"
              >
                <Icon size={18} />
              </motion.span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
