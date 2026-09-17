"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT } from "@/lib/motion";

// enter (settle on the front face) -> a handful of book-page flips,
// each one swapping to the opposite-colour face -> exit (one last
// flip, fading out mid-turn). Exported so Navbar/TopSection can time
// their own entrance to land exactly when this finishes.
const ENTER_MS = 800;
const FLIP_MS = 700; // duration of a single 180° turn
const FLIP_COUNT = 4; // number of page-turns during the hold
const EXIT_MS = 800;

const FLIPS_START_MS = ENTER_MS;
const FLIPS_END_MS = ENTER_MS + FLIP_COUNT * FLIP_MS;
export const SPLASH_DURATION_MS = FLIPS_END_MS + EXIT_MS;

type Variant = "dark" | "light" | "blue";

const FACE_BG: Record<Variant, string> = {
  dark: "bg-black",
  light: "bg-white",
  blue: "bg-sky-400",
};

// "light" gets an ink-dark glow; "dark" and "blue" both read best with a
// white glow on top of them.
const GLOW_WHITE: Record<Variant, boolean> = {
  dark: true,
  light: false,
  blue: true,
};

function CardFace({
  variant,
  rotated,
}: {
  variant: Variant;
  rotated?: boolean;
}) {
  const glowWhite = GLOW_WHITE[variant];
  const filterFor = (blurPx: number) =>
    `brightness(0)${glowWhite ? " invert(1)" : ""}${blurPx ? ` blur(${blurPx}px)` : ""}`;

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center overflow-hidden rounded-[54px] ${FACE_BG[variant]}`}
      style={{
        backfaceVisibility: "hidden",
        transform: rotated ? "rotateY(180deg)" : undefined,
      }}
    >
      {/* Brand mark as a glowing silhouette: a wide blurred halo behind
          a crisp, fully readable copy on top — the classic "neon text"
          layering. Without that top crisp layer the word "Rave" isn't
          actually legible, just a soft blob. */}
      <img
        src="/logo.png"
        alt=""
        aria-hidden
        className="h-[78%] w-[78%] object-contain opacity-70"
        style={{ filter: filterFor(20) }}
      />
      <img
        src="/logo.png"
        alt=""
        aria-hidden
        className="absolute h-[78%] w-[78%] object-contain"
        style={{ filter: filterFor(5) }}
      />
      <img
        src="/logo.png"
        alt={variant === "dark" ? "Rave" : ""}
        aria-hidden={variant !== "dark"}
        className="absolute h-[78%] w-[78%] object-contain"
        style={{ filter: filterFor(0) }}
      />
    </div>
  );
}

export default function SplashScreen() {
  const [step, setStep] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= FLIP_COUNT; i++) {
      timers.push(
        setTimeout(() => setStep(i), FLIPS_START_MS + (i - 1) * FLIP_MS)
      );
    }
    timers.push(setTimeout(() => setStep(FLIP_COUNT + 1), FLIPS_END_MS));
    timers.push(setTimeout(() => setVisible(false), SPLASH_DURATION_MS));
    return () => timers.forEach(clearTimeout);
  }, []);

  if (!visible) return null;

  const exiting = step > FLIP_COUNT;
  // The back face is what the final flip turns to reveal — swap it to
  // the third colour only for that last turn, keep the earlier ones white.
  const backVariant: Variant = exiting ? "blue" : "light";

  return (
    <motion.div
      className="fixed inset-0 z-[100] flex h-screen w-screen items-center justify-center bg-[#ececec]"
      style={{ perspective: 1200 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: EXIT_MS / 1000, ease: EASE_OUT }}
    >
      <motion.div
        className="relative h-[220px] w-[220px] sm:h-[260px] sm:w-[260px]"
        style={{ transformStyle: "preserve-3d" }}
        initial={{ opacity: 0, scale: 0.82, rotateY: 0 }}
        animate={{ opacity: 1, scale: 1, rotateY: step * 180 }}
        transition={{
          opacity: { duration: ENTER_MS / 1000, ease: EASE_OUT },
          scale: { duration: ENTER_MS / 1000, ease: EASE_OUT },
          rotateY: { duration: FLIP_MS / 1000, ease: EASE_OUT },
        }}
      >
        <CardFace variant="dark" />
        <CardFace variant={backVariant} rotated />
      </motion.div>
    </motion.div>
  );
}
