"use client";

import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { useScrambleText } from "@/lib/useScrambleText";
import { SPLASH_DURATION_MS } from "@/components/SplashScreen";
import { imageAt } from "@/lib/images";

// Starts once the splash screen unmounts, so the hero eases in right as
// it's gone rather than fighting it for the same screen space.
const BASE_DELAY = SPLASH_DURATION_MS / 1000;
const SCRAMBLE_SPEED = 55;

const fadeUp = (delay: number, distance = 16, duration = 1.1) => ({
  initial: { opacity: 0, y: distance },
  animate: { opacity: 1, y: 0 },
  transition: { duration, delay, ease: EASE_OUT },
});

function ScrambleLine({
  text,
  startDelay,
  className,
}: {
  text: string;
  startDelay: number;
  className?: string;
}) {
  const { ref } = useScrambleText(text, SCRAMBLE_SPEED, startDelay * 1000);
  return <span ref={ref} className={className} />;
}

const BRANDS = [
  { name: "CloudWatch", icon: "●", cls: "cloud" },
  { name: "Boltshift", icon: "ϟ", cls: "bolt" },
  { name: "Epicurious", icon: "≡", cls: "epic" },
  { name: "Nietzsche", icon: "W", cls: "niet" },
  { name: "Quotient", icon: "Q", cls: "quot" },
];

const PLUS_MARKS = ["p1", "p2", "p3", "p4", "p5"];

const HEADLINE_LINE_1 = "Simple Lines, Bold Ideas,";
const HEADLINE_LINE_2 = "Timeless Brands.";

export default function HomeTop() {
  return (
    <div className="forme-page">
      {/* HEADER: the global Navbar, rendered in page.tsx, timed to fade
          in via its own entranceDelay prop. */}

      {/* HERO */}
      <section className="hero">
        {/* small studio image */}
        <motion.div {...fadeUp(BASE_DELAY + 0.1, 20)} className="studio-card">
          <div className="studio-image">
            <img src={imageAt(2)} alt="" />
          </div>

          <div className="studio-meta">
            <span>FORME STUDIO</span>
            <span>20-25©</span>
          </div>
        </motion.div>

        {/* tiny label */}
        <motion.div {...fadeUp(BASE_DELAY + 0.18, 14)} className="agency-label">
          <span className="orange-dot">◉</span>
          <span>[ INCREDIBLE AGENCY ]</span>
        </motion.div>

        {/* trust */}
        <motion.div {...fadeUp(BASE_DELAY + 0.24, 14)} className="trust">
          <div className="avatars">
            <span>●</span>
            <span>●</span>
            <span>●</span>
          </div>

          <span>[1K+ PEOPLE TRUST US]</span>
        </motion.div>

        {/* MAIN TITLE */}
        <motion.h1
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.3, delay: BASE_DELAY + 0.05, ease: EASE_OUT }}
        >
          <ScrambleLine text={HEADLINE_LINE_1} startDelay={BASE_DELAY + 0.05} />
          <br />
          <ScrambleLine
            text={HEADLINE_LINE_2}
            startDelay={BASE_DELAY + 0.05 + HEADLINE_LINE_1.length * (SCRAMBLE_SPEED / 1000)}
          />
        </motion.h1>

        {/* YEAR */}
        <motion.div {...fadeUp(BASE_DELAY + 1.3, 10)} className="year">
          ©2025
        </motion.div>

        {/* DESCRIPTION */}
        <motion.div {...fadeUp(BASE_DELAY + 1.4, 16)} className="description">
          <div className="globe">◎</div>

          <p>
            We don&apos;t just design. We strip away the noise,
            <br />
            leaving only what matters: timeless visuals, and
            <br />
            brands that breathe.
          </p>
        </motion.div>

        {/* FEATURE CARDS */}
        <div className="cards">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: BASE_DELAY + 1.5, ease: EASE_OUT }}
            className="image-card"
          >
            <img src={imageAt(0)} alt="" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: BASE_DELAY + 1.7, ease: EASE_OUT }}
            className="image-card"
          >
            <img src={imageAt(6)} alt="" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: BASE_DELAY + 1.9, ease: EASE_OUT }}
            className="collab-card"
          >
            <div className="arrow">↗</div>

            <span>
              <ScrambleLine text="LET'S" startDelay={BASE_DELAY + 2.05} />
              <br />
              <ScrambleLine text="COLLABORATE" startDelay={BASE_DELAY + 2.15} />
            </span>
          </motion.div>
        </div>

        {/* DECORATIVE PLUS */}
        {PLUS_MARKS.map((cls, i) => (
          <motion.span
            key={cls}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: BASE_DELAY + 1.5 + i * 0.15, ease: EASE_OUT }}
            className={`plus ${cls}`}
          >
            +
          </motion.span>
        ))}
      </section>

      {/* BOTTOM TRUST BAR */}
      <section className="trust-bar">
        <motion.div {...fadeUp(BASE_DELAY + 2.3, 10)} className="trust-caption">
          450+ COMPANY TRUST US
        </motion.div>

        <div className="brands">
          {BRANDS.map(({ name, icon, cls }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: BASE_DELAY + 2.4 + i * 0.16, ease: EASE_OUT }}
              className="brand"
            >
              <span className={`brand-icon ${cls}`}>{icon}</span>
              {name}
            </motion.div>
          ))}
        </div>

        <motion.div {...fadeUp(BASE_DELAY + 3.3, 10)} className="scroll">
          ◉ SCROLL DOWN
        </motion.div>
      </section>

      {/* Blends this section's black into the white section below it —
          see .section1Fade in globals.css. */}
      <div aria-hidden className="section1Fade" />
    </div>
  );
}
