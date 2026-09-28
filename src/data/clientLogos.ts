export type ClientLogo = { src: string };

// Logos live in /public as c1..c27.
export const CLIENT_LOGOS: ClientLogo[] = Array.from({ length: 27 }, (_, i) => {
  const n = i + 1;
  const ext = n === 3 || n === 4 || n === 27 ? "jpg" : n === 21 || n === 22 ? "jpeg" : "png";
  return { src: `c${n}.${ext}` };
});
