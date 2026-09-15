"use client";

import { useScroll, useVelocity, useSpring, useTransform } from "framer-motion";

const MAX_BLUR_PX = 6;

// Maps page scroll speed to a CSS blur() amount, smoothed with a spring
// so it ramps up while flicking through sections and settles back to a
// sharp 0px shortly after the user stops — the motion-blur-while-
// scrolling effect.
export function useScrollBlur() {
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { damping: 40, stiffness: 300 });
  const blurPx = useTransform(
    smoothVelocity,
    [-2500, 0, 2500],
    [MAX_BLUR_PX, 0, MAX_BLUR_PX]
  );
  return useTransform(blurPx, (v) => `blur(${Math.min(Math.abs(v), MAX_BLUR_PX)}px)`);
}
