"use client";

import { motion } from "framer-motion";
import { PenLine, Coffee } from "lucide-react";
import { EASE_OUT, buttonMotion, viewportOnce } from "@/lib/motion";

export default function ClosingCTA() {
  return (
    <section className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl bg-gradient-to-br from-rose-600 via-pink-600 to-fuchsia-700 p-8 text-white"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.2, ease: EASE_OUT }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/15"
          >
            <PenLine size={16} />
          </motion.span>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT }}
              className="text-3xl font-semibold leading-tight tracking-tight sm:text-4xl"
            >
              Meets
              <br />
              new people
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.4, ease: EASE_OUT }}
              className="mt-3 max-w-xs text-sm leading-relaxed text-white/80"
            >
              Creators and enthusiasts to share, discover, and purchase
              unique artworks.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.5, ease: EASE_OUT }}
              {...buttonMotion}
              className="mt-6 rounded-full bg-white px-5 py-3 text-sm font-semibold text-zinc-900"
            >
              Let&apos;s Meet
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
          className="relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-3xl border border-zinc-100 bg-gradient-to-br from-orange-100 via-rose-100 to-purple-200 p-8"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE_OUT }}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-700 shadow-sm"
          >
            <Coffee size={16} />
          </motion.span>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT }}
              className="text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl"
            >
              Archive
              <br />
              of new arts
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: 0.5, ease: EASE_OUT }}
              className="mt-3 max-w-xs text-sm leading-relaxed text-zinc-600"
            >
              Canvas Carousel is the platform where artists can ride the
              wave of creativity, showcasing their work to a broad
              audience.
            </motion.p>
            <motion.button
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.5, delay: 0.6, ease: EASE_OUT }}
              {...buttonMotion}
              className="mt-6 rounded-full bg-zinc-900 px-5 py-3 text-sm font-semibold text-white"
            >
              Archives
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
