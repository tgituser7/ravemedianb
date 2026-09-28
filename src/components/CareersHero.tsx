"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import { EASE_OUT, fadeUp } from "@/lib/motion";

const PHOTOS = [
  { src: "/Film Workshop.jpeg", rotate: -6, cls: "left-0 top-6 h-40 w-32 sm:h-52 sm:w-40" },
  { src: "/pstudio.jpeg", rotate: 4, cls: "left-28 top-0 h-48 w-36 sm:left-36 sm:h-64 sm:w-48" },
  { src: "/Recording Studio.jpeg", rotate: -3, cls: "left-[13.5rem] top-16 h-36 w-28 sm:left-[19rem] sm:h-48 sm:w-36" },
];

export default function CareersHero() {
  return (
    <section className="relative overflow-hidden px-[6%] pb-20 pt-16 sm:pt-20">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            {...fadeUp(0, 12, 0.5)}
            className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500"
          >
            Careers at Rave
          </motion.p>
          <h1 className="mt-4 text-[clamp(38px,5.6vw,68px)] font-bold leading-[1.02] tracking-tight text-zinc-900">
            <RevealText text="Build what you love" delay={0.15} stagger={0.06} />
            <br />
            <RevealText text="to watch." delay={0.4} stagger={0.06} />
          </h1>
          <motion.p {...fadeUp(0.55, 16, 0.6)} className="mt-6 max-w-md text-[17px] leading-relaxed text-zinc-600">
            We&apos;re a working studio, not a corporate floor — sets to light, edits to cut, and clients who need
            it done right. If that sounds like your kind of work, we&apos;d like to meet you.
          </motion.p>
          <motion.div {...fadeUp(0.68, 14, 0.5)} className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#roles"
              className="rounded-full bg-orange-500 px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
            >
              View open roles
            </a>
            <a href="#life" className="text-sm font-semibold text-zinc-700 underline underline-offset-4 hover:text-zinc-900">
              See life at Rave
            </a>
          </motion.div>
        </div>

        {/* Tilted photo collage */}
        <div className="relative mx-auto h-64 w-full max-w-sm sm:h-80">
          {PHOTOS.map((p, i) => (
            <motion.div
              key={p.src}
              initial={{ opacity: 0, y: 30, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: p.rotate }}
              transition={{ duration: 0.8, delay: 0.2 + i * 0.12, ease: EASE_OUT }}
              whileHover={{ rotate: 0, scale: 1.04, zIndex: 10 }}
              className={`absolute overflow-hidden rounded-2xl shadow-[0_20px_40px_-15px_rgba(0,0,0,0.35)] ring-4 ring-white ${p.cls}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt="" className="h-full w-full object-cover" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
