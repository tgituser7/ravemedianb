"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import RevealText from "@/components/RevealText";
import { EASE_OUT, fadeUpInView, viewportOnce } from "@/lib/motion";
import { RESOURCES, type Resource } from "@/data/resources";

// One full-bleed photo panel per facility. The photo drifts slower than
// the page (parallax) and settles from a slight zoom as the panel enters;
// the title rises word by word, a rule draws in beside the counter, and the
// description fades up after it.
function Panel({ r, index }: { r: Resource; index: number }) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  return (
    <section ref={ref} className="relative flex min-h-[85vh] items-end overflow-hidden bg-black">
      <motion.div
        aria-hidden
        className="absolute -inset-y-[12%] inset-x-0"
        style={{ y: photoY }}
      >
        <motion.div
          className="h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url("${encodeURI(`/${r.bg}`)}")` }}
          initial={{ scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 1.6, ease: EASE_OUT }}
        />
      </motion.div>
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10"
      />

      <div className="relative mx-auto grid w-full max-w-[1400px] gap-8 px-[6%] pb-14 pt-32 md:grid-cols-2 md:items-end md:pb-20">
        <div>
          <div className="flex items-center gap-3">
            <motion.span
              className="h-px w-10 origin-left bg-orange-400"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewportOnce}
              transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT }}
            />
            <motion.span
              {...fadeUpInView(0.1, 10)}
              className="text-sm font-semibold tracking-wide text-orange-400"
            >
              {String(index + 1).padStart(2, "0")} / {String(RESOURCES.length).padStart(2, "0")}
            </motion.span>
          </div>
          <h2 className="mt-3 text-[clamp(40px,6vw,88px)] font-bold leading-[0.95] tracking-tight text-white">
            <RevealText text={r.title} delay={0.15} stagger={0.1} duration={0.9} />
          </h2>
        </div>
        <motion.p
          {...fadeUpInView(0.45, 20, 0.9)}
          className="max-w-md text-[15px] leading-relaxed text-white/85 md:justify-self-end"
        >
          {r.text}
        </motion.p>
      </div>
    </section>
  );
}

export default function ResourceSections() {
  return (
    <>
      {RESOURCES.map((r, i) => (
        <Panel key={r.title} r={r} index={i} />
      ))}
    </>
  );
}
