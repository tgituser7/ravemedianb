"use client";

import { useEffect, useRef, useState } from "react";

const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Mutates textContent directly via a ref on every tick instead of React
// state, so the scramble cadence never triggers a re-render of the text
// (which would otherwise fight with any entrance animation on it).
// `startDelay` lets the scramble begin after some other event (e.g. the
// intro loader finishing) instead of immediately on mount.
export function useScrambleText(target: string, speed: number, startDelay = 0) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (ref.current) ref.current.textContent = target.replace(/[^ ]/g, " ");

    let interval: ReturnType<typeof setInterval>;
    const startTimer = setTimeout(() => {
      let revealed = 0;
      interval = setInterval(() => {
        revealed += 1;
        const next = target
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < revealed) return char;
            return SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
          })
          .join("");
        if (ref.current) ref.current.textContent = next;
        if (revealed >= target.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [target, speed, startDelay]);

  return { ref, done };
}
