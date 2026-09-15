"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";
import { useScrambleText } from "@/lib/useScrambleText";

const TARGET = "RAVE";
const SCRAMBLE_SPEED = 55;
const HOLD_AFTER_REVEAL = 650;
const MELT_DURATION = 4200;

// The loader rests on this mid-gray and washes to the hero's own
// near-black as it melts, so the handoff to the page underneath is
// seamless rather than a hard cut from black to black.
const REST_BG = "#707070";
const MELTED_BG = "#050505";

// Cubic ease-in-out: slow to build, smooth through the middle, slow to
// settle — used for the turbulence ramp so the melt doesn't feel linear.
function easeInOutCubic(t: number) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export const INTRO_LOADER_DURATION_MS =
  TARGET.length * SCRAMBLE_SPEED + HOLD_AFTER_REVEAL + MELT_DURATION;

// The opacity keyframes below hold the wordmark visible until this fraction
// of the melt, then fade it out over what remains — i.e. this is when the
// splash's "last fade" actually begins. The page underneath starts its own
// entrance at this same moment (not after INTRO_LOADER_DURATION_MS), so the
// two crossfade instead of handing off with a hard cut.
const FADE_START_FRACTION = 0.78;
export const SPLASH_FADE_START_MS =
  TARGET.length * SCRAMBLE_SPEED + HOLD_AFTER_REVEAL + MELT_DURATION * FADE_START_FRACTION;

const PLUS_MARKS = [
  { top: "18%", left: "22%" },
  { top: "28%", left: "78%" },
  { top: "68%", left: "16%" },
  { top: "76%", left: "82%" },
  { top: "12%", left: "58%" },
  { top: "84%", left: "52%" },
];

// Ramps an SVG turbulence/displacement filter over time so the whole
// loader appears to liquefy and wash toward gray, rather than simply
// fading, as it exits — the turbulence's own noise bleeding through
// (left in linearRGB, uncorrected) is what produces that gray wash.
function useLiquidMelt(active: boolean, duration: number) {
  const turbulenceRef = useRef<SVGFETurbulenceElement | null>(null);
  const displaceRef = useRef<SVGFEDisplacementMapElement | null>(null);

  useEffect(() => {
    if (!active) return;
    let raf: number;
    let start: number | null = null;

    function tick(t: number) {
      if (start === null) start = t;
      const linear = Math.min((t - start) / duration, 1);
      const progress = easeInOutCubic(linear);
      const freq = 0.005 + progress * 0.065;
      const scale = progress * 260;
      turbulenceRef.current?.setAttribute("baseFrequency", freq.toString());
      displaceRef.current?.setAttribute("scale", scale.toString());
      if (linear < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, duration]);

  return { turbulenceRef, displaceRef };
}

export default function IntroLoader() {
  const { ref: textRef, done } = useScrambleText(TARGET, SCRAMBLE_SPEED);
  const [melting, setMelting] = useState(false);
  const [visible, setVisible] = useState(true);
  const { turbulenceRef, displaceRef } = useLiquidMelt(melting, MELT_DURATION);

  useEffect(() => {
    if (!done) return;
    const holdTimer = setTimeout(() => setMelting(true), HOLD_AFTER_REVEAL);
    return () => clearTimeout(holdTimer);
  }, [done]);

  useEffect(() => {
    if (!melting) return;
    const meltTimer = setTimeout(() => setVisible(false), MELT_DURATION);
    return () => clearTimeout(meltTimer);
  }, [melting]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <svg width="0" height="0" className="absolute">
        <filter id="liquid-melt">
          <feTurbulence
            ref={turbulenceRef}
            type="fractalNoise"
            baseFrequency="0.006"
            numOctaves={2}
            seed={7}
            result="noise"
          />
          <feDisplacementMap
            ref={displaceRef}
            in="SourceGraphic"
            in2="noise"
            scale={0}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      {/* This single layer carries the bg, the wordmark and the plus
          marks together, so the filter (applied only to this element)
          warps and grays the whole scene as one, not just the text. */}
      <motion.div
        initial={{ opacity: 1, scale: 1, backgroundColor: REST_BG }}
        animate={{
          opacity: melting ? [1, 1, 0] : 1,
          scale: melting ? 0.96 : 1,
          backgroundColor: melting ? MELTED_BG : REST_BG,
        }}
        transition={
          melting
            ? {
                opacity: {
                duration: MELT_DURATION / 1000,
                times: [0, FADE_START_FRACTION, 1],
                ease: EASE_OUT,
              },
                scale: { duration: MELT_DURATION / 1000, ease: EASE_OUT },
                backgroundColor: { duration: MELT_DURATION / 1000, ease: EASE_OUT },
              }
            : { duration: 0 }
        }
        style={melting ? { filter: "url(#liquid-melt)" } : undefined}
        className="flex h-full w-full items-center justify-center"
      >
        {PLUS_MARKS.map((mark, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: melting ? 0.4 : 1 }}
            transition={
              melting
                ? { duration: MELT_DURATION / 1000, ease: EASE_OUT }
                : { duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE_OUT }
            }
            style={{ top: mark.top, left: mark.left }}
            className="absolute select-none text-lg text-white/40"
          >
            +
          </motion.span>
        ))}

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
          className="flex items-start px-6 text-center text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          <span ref={textRef} />
          <span className="ml-1 flex h-5 w-4 items-center justify-center rounded-full border border-white/70 text-[10px] font-semibold leading-none">
            R
          </span>
        </motion.div>
      </motion.div>
    </div>
  );
}
