"use client";

import { motion } from "framer-motion";
import { EASE_OUT, fadeUpInView, viewportOnce } from "@/lib/motion";
import { PROCESS } from "@/data/careers";

export default function CareersProcess() {
  return (
    <section className="border-t border-zinc-200 bg-white px-[6%] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...fadeUpInView(0, 20, 0.7)}
          className="max-w-lg text-[clamp(28px,3.6vw,42px)] font-bold leading-tight tracking-tight text-zinc-900"
        >
          How you get hired
        </motion.h2>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-4">
          <motion.span
            aria-hidden
            className="absolute left-0 right-0 top-[15px] hidden h-px origin-left bg-zinc-200 sm:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={viewportOnce}
            transition={{ duration: 1, ease: EASE_OUT }}
          />
          {PROCESS.map((s, i) => (
            <motion.div key={s.step} {...fadeUpInView(0.1 * i, 18, 0.6)} className="relative">
              <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-orange-500 text-xs font-bold text-white">
                {s.step}
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-zinc-900">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
