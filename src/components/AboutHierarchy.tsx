"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { EASE_OUT, fadeUpInView } from "@/lib/motion";

const SLIDES = [
  {
    letter: "R",
    title: "Mesmerizing Experiences",
    text: "To anticipate, understand and meet needs of internal/external customers, ensuring high level of service delivery keeping in mind the service first principle.",
  },
  {
    letter: "A",
    title: "Evolving Ideas",
    text: "To continue to deliver on responsibilities while anticipating and responding to the evolving environment.",
  },
  {
    letter: "V",
    title: "Delivering a Message",
    text: "To set for ourselves clear, compelling and audacious goals. Transcending the fear of failure, criticism and ambiguity in an effort to set and achieve bigger targets.",
  },
  {
    letter: "E",
    title: "Instigating Thoughts",
    text: "Identify and resolve problems which have a high impact on business by providing innovative solutions and ensuring implementation with excellent execution.",
  },
];

const AUTOPLAY_MS = 5000;
const MARKER_PAD = 10; // px the marker extends past each side of its letter
const TEAL = "#2f5250";
const HEAD = "font-[family-name:var(--font-roboto)]";

export default function AboutHierarchy() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const inView = useInView(sectionRef, { amount: 0.3 });
  const [active, setActive] = useState(0);

  // The thick marker sits exactly under the active letter (it never leaves
  // the R A V E row), so measure the active tab and follow it.
  const tabsRef = useRef<HTMLDivElement | null>(null);
  const [marker, setMarker] = useState({ left: 0, width: 0 });
  useLayoutEffect(() => {
    const measure = () => {
      const tab = tabsRef.current?.children[active] as HTMLElement | undefined;
      if (tab) setMarker({ left: tab.offsetLeft - MARKER_PAD, width: tab.offsetWidth + MARKER_PAD * 2 });
    };
    measure();
    window.addEventListener("resize", measure);
    void document.fonts?.ready.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Auto-advance while on screen; any manual pick restarts the countdown.
  useEffect(() => {
    if (!inView) return;
    const id = window.setTimeout(() => setActive((i) => (i + 1) % SLIDES.length), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [active, inView]);

  return (
    <section ref={sectionRef} aria-label="Rave's hierarchy" className="px-[6%] pb-16 pt-16">
      <div className="mx-auto max-w-6xl">
        {/* Hierarchy: copy left, logo right */}
        <div className="grid items-center gap-12 md:grid-cols-[1.5fr_1fr]">
          <div>
            <motion.h2
              {...fadeUpInView(0, 24, 0.7)}
              className={`${HEAD} text-[clamp(38px,5.2vw,72px)] font-bold leading-[1.02] tracking-tight text-zinc-900`}
            >
              Rave&apos;s Hierarchy
            </motion.h2>
            <motion.p
              {...fadeUpInView(0.1, 20, 0.7)}
              className="mt-8 max-w-2xl text-[17px] leading-relaxed text-zinc-800"
            >
              Rave Media is a leading well recognized firm that has been serving the industry, by marking its
              existence for past 20 years whilst being and involved in enormous fields and activities. We aim to
              expand with the latest supplies that any media company could have, besides being the most company
              that has a superior influence on customers. Our goal is to make RAVE become one of the most
              significant remarkable company globally.
            </motion.p>
          </div>
          <motion.div {...fadeUpInView(0.15, 24, 0.8)} className="flex justify-center md:justify-end">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Rave" className="h-auto w-[min(320px,70%)]" />
          </motion.div>
        </div>

        {/* R A V E: the letters double as the slider's tabs */}
        <motion.div {...fadeUpInView(0.1, 20, 0.7)} className="mt-14">
          <div ref={tabsRef} role="tablist" aria-label="Rave values" className="relative flex w-max gap-6 sm:gap-10">
            {SLIDES.map((s, i) => (
              <button
                key={s.letter}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={s.title}
                onClick={() => setActive(i)}
                className={`${HEAD} text-[clamp(30px,3.4vw,46px)] font-bold leading-none tracking-wide transition-colors duration-500 ${
                  i === active ? "" : "text-zinc-800/85 hover:text-zinc-900"
                }`}
                style={i === active ? { color: TEAL } : undefined}
              >
                {s.letter}
              </button>
            ))}
          </div>

          {/* rule; the thick marker glides between the letters */}
          <div className="relative mt-8 h-[6px]">
            <span className="absolute inset-x-0 top-[5px] h-px bg-zinc-400/70" />
            <motion.span
              className="absolute top-0 h-[6px] rounded-sm"
              style={{ background: TEAL }}
              initial={false}
              animate={{ left: marker.left, width: marker.width }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            />
          </div>

          {/* slides stacked in one grid cell so the height never jumps */}
          <div className="mt-12 grid">
            {SLIDES.map((s, i) => (
              <motion.div
                key={s.letter}
                aria-hidden={i !== active}
                className="col-start-1 row-start-1"
                style={{ pointerEvents: i === active ? "auto" : "none" }}
                initial={false}
                animate={{ opacity: i === active ? 1 : 0, y: i === active ? 0 : 24 }}
                transition={{ duration: 0.6, ease: EASE_OUT, delay: i === active ? 0.15 : 0 }}
              >
                <h3
                  className={`${HEAD} text-[clamp(34px,5.2vw,72px)] font-bold leading-[1.05] tracking-tight text-zinc-900`}
                >
                  {s.title}
                </h3>
                <p className="mt-8 max-w-xl text-[clamp(18px,1.7vw,24px)] leading-[1.6] text-zinc-800">{s.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
