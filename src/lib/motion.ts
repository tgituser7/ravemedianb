export const EASE_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

// Positive bottom margin pre-triggers the reveal before the element is
// actually visible, so fast/flick/instant scrolling can't skip past the
// intersection check and leave content permanently stuck at opacity: 0.
export const viewportOnce = { once: true, margin: "0px 0px 200px 0px" } as const;

export function fadeUp(delay = 0, distance = 24, duration = 0.7) {
  return {
    initial: { opacity: 0, y: distance },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: EASE_OUT },
  };
}

export function fadeUpInView(delay = 0, distance = 24, duration = 0.7) {
  return {
    initial: { opacity: 0, y: distance },
    whileInView: { opacity: 1, y: 0 },
    viewport: viewportOnce,
    transition: { duration, delay, ease: EASE_OUT },
  };
}

export function scaleIn(delay = 0, fromScale = 0.9, duration = 0.7) {
  return {
    initial: { opacity: 0, scale: fromScale },
    whileInView: { opacity: 1, scale: 1 },
    viewport: viewportOnce,
    transition: { duration, delay, ease: EASE_OUT },
  };
}

export const buttonMotion = {
  whileHover: { scale: 1.03, transition: { duration: 0.25, ease: EASE_OUT } },
  whileTap: { scale: 0.98, transition: { duration: 0.15, ease: EASE_OUT } },
};
