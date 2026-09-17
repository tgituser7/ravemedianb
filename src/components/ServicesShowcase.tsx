"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./StorySection.module.css";
import { EASE_OUT } from "@/lib/motion";

const HEADING_LINES = [
  "Forme Create for Brands that Value —",
  "Clarity Over Noise, Believing that Meaningful",
  "Design Begins with Intention and Grows.",
];

const LINE_STAGGER = 0.13;
const HEADING_START = 0.05;
const BODY_START = 0.55;

// The shared `viewportOnce` pre-triggers 200px before an element reaches
// the viewport, which for elements sitting near the very top of this
// section (the eyebrow label, the first heading line) meant the rise
// animation had already finished before they scrolled into view — no
// visible motion. This section needs the opposite: trigger only once an
// element is already substantially on-screen, so the rise is actually seen.
const revealViewport = { once: true, margin: "0px 0px -100px 0px" } as const;

// Rises up from below with a blur-to-sharp resolve as it enters — used
// for every element in this section (label, image, barcode, body copy).
const riseBlur = (delay: number, distance = 50, duration = 0.85) => ({
  initial: { opacity: 0, y: distance, filter: "blur(14px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: revealViewport,
  transition: { duration, delay, ease: EASE_OUT },
});

export default function StorySection() {
  return (
    <section className={styles.storySection}>
      {/* Small section label — fades in first, fastest */}
      <motion.div {...riseBlur(0)} className={styles.sectionLabel}>
        <span>[01]</span>
        <span> A STORY WORTH TELLING</span>
      </motion.div>

      {/* Main headline — each line resolves independently from a blur,
          staggered ~130ms apart. */}
      <h1 className={styles.heading}>
        {HEADING_LINES.map((line, i) => (
          <motion.span
            key={line}
            initial={{ opacity: 0, y: 50, filter: "blur(14px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={revealViewport}
            transition={{
              duration: 0.85,
              delay: HEADING_START + i * LINE_STAGGER,
              ease: EASE_OUT,
            }}
            className={styles.headingLine}
          >
            {line}
          </motion.span>
        ))}
      </h1>

      {/* Main image — rises and resolves from blur with the rest (any
          motion blur visible in the photo itself is baked into the
          source image, independent of this entrance animation). */}
      <motion.div {...riseBlur(BODY_START)} className={styles.imageWrapper}>
        <Image
          src="/Film Workshop.jpeg"
          alt="Creative studio"
          fill
          priority
          sizes="(max-width: 768px) 100vw, 66vw"
          className={styles.mainImage}
        />
      </motion.div>

      {/* Barcode / vertical detail */}
      <motion.div {...riseBlur(BODY_START, 10)} className={styles.barcodeWrapper}>
        <div className={styles.barcode}>
          {Array.from({ length: 32 }).map((_, index) => (
            <span
              key={index}
              style={{
                width: `${index % 3 === 0 ? 14 : index % 2 === 0 ? 8 : 11}px`,
              }}
            />
          ))}
        </div>

        <div className={styles.copyright}>©</div>
        <div className={styles.year}>2025–26</div>
      </motion.div>

      {/* Bottom left content: asterisks, body copy, "SEE MORE" */}
      <motion.div {...riseBlur(BODY_START)} className={styles.bottomContent}>
        <p>
          We are a creative agency obsessed with clarity,
          <br />
          modern expression, clean aesthetics. Our
          <br />
          philosophy is design should feel effortless.
        </p>

        <a href="#more" className={styles.seeMore}>
          <span className={styles.arrow}>→</span>
          <span>SEE MORE</span>
        </a>
      </motion.div>
    </section>
  );
}
