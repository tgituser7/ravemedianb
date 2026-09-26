"use client";

import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import { EASE_OUT, fadeUp } from "@/lib/motion";


// Intro of /resources, styled after the original site: three bold white
// lines set in a staggered layout (left / centre / right) with a soft dark
// glow, over a black-and-white photo. Each line rises in from a mask, and a
// small scroll cue bobs at the bottom.
const LINE = `font-[family-name:var(--font-roboto)] text-[clamp(30px,4.2vw,80px)] font-bold leading-[1.25] tracking-tight text-white`;

export default function ResourcesHero() {
  return (
    <section className="relative flex min-h-[calc(100svh-76px)] items-center overflow-hidden bg-neutral-300 md:min-h-[calc(100svh-81px)]">
      {/* Black-and-white architectural photo, slowly settling in */}
      <motion.div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center grayscale"
        style={{ backgroundImage: "url(/Frame-34.jpeg)" }}
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2.2, ease: EASE_OUT }}
      />
      <div aria-hidden className="absolute inset-0 bg-black/20" />

      <div className="relative w-full px-[6%] py-24 [text-shadow:0_4px_22px_rgba(0,0,0,0.65),0_1px_4px_rgba(0,0,0,0.5)]">
        <h1 className="flex flex-col">
          <RevealText text="We provide" className={`${LINE} self-start md:ml-[2%]`} delay={0.15} />
          <RevealText
            text="facilities that bring your concepts"
            className={`${LINE} self-start md:ml-[18%]`}
            delay={0.4}
            stagger={0.06}
          />
          <RevealText text="to life" className={`${LINE} self-end md:mr-[12%]`} delay={0.9} />
        </h1>

        <motion.div
          {...fadeUp(1.3, 10)}
          className="mt-14 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/85"
        >
          <motion.span
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/60"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14m0 0-6-6m6 6 6-6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.span>
          Scroll to explore
        </motion.div>
      </div>
    </section>
  );
}
