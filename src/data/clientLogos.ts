export type ClientLogo = { src: string; scale: number };

// Logos live in /public/client-logos as c1..c27 — pre-trimmed (whitespace
// margins cropped to the artwork's actual bounds). Matching every logo's
// height gets most of the way to "same size", but a few are still bolder
// or more solid-filled than the rest and read as bigger even at an equal
// height, so `scale` nudges those individually — 1 is the base height,
// below 1 shrinks a heavy/blocky mark, above 1 grows a thin/detailed one.
const SCALES: Record<number, number> = {
  2: 0.62, // Milton (solid block)
  4: 1.1, // swirl mark, thin
  5: 1.05, // DOMS, thin script
  6: 1.05, // Ajay, thin brush script
  7: 0.62, // Woodland (solid block)
  10: 0.68, // Amson, very bold
  11: 0.68, // Kawachi, very bold
  12: 0.65, // Divoya (solid block)
  14: 0.62, // Milton again (solid block)
  15: 0.8, // Trinity Greens, bold caps
  16: 1.1, // TSM shield, detailed
  19: 0.8, // BASF + tagline, bold
  21: 0.7, // Nerolac (solid banner)
  22: 0.68, // Philips, very bold + wide
  23: 0.62, // Sony, very bold + wide
  24: 0.75, // Navneet (solid oval)
  25: 0.9, // Parag
  26: 1.1, // crest, detailed
};

export const CLIENT_LOGOS: ClientLogo[] = Array.from({ length: 27 }, (_, i) => ({
  src: `client-logos/c${i + 1}.png`,
  scale: SCALES[i + 1] ?? 1,
}));
