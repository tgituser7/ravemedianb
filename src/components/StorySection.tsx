"use client";

import { motion } from "framer-motion";
import { Play, Eye, Pin } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";
import { EASE_OUT, fadeUpInView, buttonMotion, viewportOnce } from "@/lib/motion";
import { imageAt } from "@/lib/images";

const IDENTITY_LINES = [
  { text: "Expression feels", active: false },
  { text: "Personal Identity", active: true },
  { text: "CreatiVortex Plots", active: false },
  { text: "BrushBazaar for Arts", active: false },
  { text: "Art Story", active: false },
];

const CARD_STAGGER = 0.1;

export default function StorySection() {
  return (
    <section className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <motion.span
          {...fadeUpInView(0, 16, 0.5)}
          className="text-xs font-semibold uppercase tracking-widest text-zinc-900"
        >
          Your story <span className="text-violet-600">telling</span>
        </motion.span>

        <div className="mt-4 overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.9, delay: 0.12, ease: EASE_OUT }}
            className="text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl"
          >
            Every piece of art tells a story
          </motion.h2>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: CARD_STAGGER * 1, ease: EASE_OUT }}
            className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm"
          >
            <div className="relative">
              <PlaceholderImage
                label="Prada"
                gradient="from-zinc-800 via-zinc-900 to-black"
                src={imageAt(2)}
                className="aspect-[4/3]"
              />
              <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
                <Play size={12} fill="white" /> Play Video
              </span>
              <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
                @robin
              </span>
            </div>
            <div className="p-6">
              <motion.h3
                {...fadeUpInView(CARD_STAGGER * 1 + 0.1, 14, 0.5)}
                className="text-lg font-semibold text-zinc-900"
              >
                Connect, Create, Commerce
              </motion.h3>
              <motion.p
                {...fadeUpInView(CARD_STAGGER * 1 + 0.17, 14, 0.5)}
                className="mt-2 text-sm leading-relaxed text-zinc-500"
              >
                Offering buyers a chance to own a piece of that narrative
                alongside a curated marketplace experience.
              </motion.p>
              <motion.button
                {...fadeUpInView(CARD_STAGGER * 1 + 0.25, 12, 0.5)}
                {...buttonMotion}
                className="mt-4 rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                How it works?
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: CARD_STAGGER * 3, ease: EASE_OUT }}
            className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm"
          >
            <PlaceholderImage
              label="Spin Your Art into Gold"
              gradient="from-fuchsia-300 via-pink-300 to-lime-300"
              src={imageAt(3)}
              className="aspect-[16/10]"
            />
            <div className="p-6">
              <motion.h3
                {...fadeUpInView(CARD_STAGGER * 3 + 0.1, 14, 0.5)}
                className="text-lg font-semibold text-zinc-900"
              >
                Spin Your Art into Gold
              </motion.h3>
              <motion.p
                {...fadeUpInView(CARD_STAGGER * 3 + 0.17, 14, 0.5)}
                className="mt-2 text-sm leading-relaxed text-zinc-500"
              >
                Unleash your artistic potential, where innovation and
                creativity converge into opportunity.
              </motion.p>
              <motion.button
                {...fadeUpInView(CARD_STAGGER * 3 + 0.25, 12, 0.5)}
                {...buttonMotion}
                className="mt-4 rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                Join us now
              </motion.button>
            </div>
          </motion.div>
        </div>

        <div className="flex flex-col gap-6 sm:mt-10">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: CARD_STAGGER * 2, ease: EASE_OUT }}
            className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm"
          >
            <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
              <Eye size={72} strokeWidth={1.2} className="text-white/90" />
            </div>
            <div className="p-6">
              <motion.h3
                {...fadeUpInView(CARD_STAGGER * 2 + 0.1, 14, 0.5)}
                className="text-lg font-semibold text-zinc-900"
              >
                Where Art Breathes Commerce
              </motion.h3>
              <motion.p
                {...fadeUpInView(CARD_STAGGER * 2 + 0.17, 14, 0.5)}
                className="mt-2 text-sm leading-relaxed text-zinc-500"
              >
                Artistic spirit with commercial viability, providing a
                platform where creativity and business coexist.
              </motion.p>
              <motion.button
                {...fadeUpInView(CARD_STAGGER * 2 + 0.25, 12, 0.5)}
                {...buttonMotion}
                className="mt-4 rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50"
              >
                Read more
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.96 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.8, delay: CARD_STAGGER * 4, ease: EASE_OUT }}
            className="relative overflow-hidden rounded-3xl bg-zinc-900 p-6 text-white"
          >
            <div className="flex items-start justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-zinc-400">
                Advantages
              </span>
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                <Pin size={14} />
              </span>
            </div>
            <div className="mt-8 flex flex-col gap-2">
              {IDENTITY_LINES.map((line, i) => (
                <motion.span
                  key={line.text}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{
                    duration: 0.5,
                    delay: CARD_STAGGER * 4 + 0.15 + i * 0.06,
                    ease: EASE_OUT,
                  }}
                  className={
                    line.active
                      ? "text-2xl font-semibold tracking-tight text-white"
                      : "text-sm text-zinc-500"
                  }
                >
                  {line.text}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
