// Curated subset of /public assets that are safe to use — generic
// illustrations, faceless/silhouette studio shots, and abstract or
// architectural photography. Everything else in /public (real company
// logos, identifiable people) is intentionally excluded.
export const SITE_IMAGES = [
  "/Frame-34.jpeg",
  "/art_4.jpg",
  "/animation studio_1.jpeg",
  "/Shooting Floor.jpeg",
  "/Dac9edIX4AEJ9LA.jpeg",
  "/1_1Ttcbj2rqQhJS33MeRraBg.gif",
  "/1_FpkWaPDZPTKW5n-yJMpuaA.jpeg",
  "/360_F_186678317_SEAi5FTcjMpmroDpQ6SU6R4H3mNyFkzY.jpeg",
  "/7TIt0OZ7hNUP1TNJrHHQOCriP9rSR4d9toQR7EB2gU8.jpeg",
  "/960x0.jpeg",
  "/Citizen-hotelier-Companies-embrace-social-responsi.jpeg",
  "/corporate_hierarchy_more_likeable.jpeg",
  "/cstudio.jpeg",
  "/design-teamwork.jpeg",
  "/div_imag.jpg",
  "/ey-man-working-on-digital-platform.jpg.rendition.450.300.jpg",
  "/Facebook-Awards-Charity-Illustration-Owen-Davey-People-Characters-World-Social-Media-Skeleton-Basketball-Ice-Bucket-Challenge_1000.jpeg",
  "/Facebook-Fundraisers-Illustration-Owen-Davey-Globe-Global-Change-Environment-World-Puzzle_1000.jpeg",
  "/Kings-College-Women-Leadership-Woman-Power-Climbing-Illustration-Owen-Davey_1000.jpeg",
  "/objectivesoverview_364479.jpeg",
] as const;

export function imageAt(index: number): string {
  return SITE_IMAGES[index % SITE_IMAGES.length];
}
