"use client";

import { motion } from "framer-motion";
import { fadeUpInView } from "@/lib/motion";
import { VALUES } from "@/data/careers";

export default function CareersValues() {
  return (
    <section className="border-t border-zinc-200 bg-white px-[6%] py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          {...fadeUpInView(0, 20, 0.7)}
          className="max-w-lg text-[clamp(28px,3.6vw,42px)] font-bold leading-tight tracking-tight text-zinc-900"
        >
          How we work
        </motion.h2>

        <div className="mt-14 grid gap-x-10 gap-y-14 sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <motion.div key={v.title} {...fadeUpInView(0.08 * i, 20, 0.7)} className="border-t border-zinc-200 pt-6">
              <span className="text-sm font-semibold text-orange-500">0{i + 1}</span>
              <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900">{v.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-zinc-600">{v.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
