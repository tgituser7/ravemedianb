export type NewsCategory = "Announcement" | "Studio" | "Milestone" | "Awards" | "Culture";

export type NewsItem = {
  slug: string;
  category: NewsCategory;
  date: string; // display string, newest first
  title: string;
  excerpt: string;
  image: string;
};

// PLACEHOLDER CONTENT: every story below is fictional, written to show the
// Newsroom layout with realistic copy. Swap in real announcements, dates
// and photos before this goes live.
export const NEWS: NewsItem[] = [
  {
    slug: "second-shooting-floor",
    category: "Announcement",
    date: "Sep 22, 2026",
    title: "Rave opens a second shooting floor to keep up with demand",
    excerpt:
      "A fully rigged second floor is now live, built for brands who need two sets running in parallel without compromising on lighting or crew.",
    image: "/Shooting Floor.jpeg",
  },
  {
    slug: "animation-post-unit",
    category: "Studio",
    date: "Sep 10, 2026",
    title: "An in-house animation and post-production unit goes live",
    excerpt:
      "From raw footage to finished cut without leaving the building: Rave's new animation and post team is now taking on projects end to end.",
    image: "/animation studio_1.jpeg",
  },
  {
    slug: "campaign-two-million-views",
    category: "Milestone",
    date: "Aug 28, 2026",
    title: "A client campaign film crosses 2 million views in its first week",
    excerpt:
      "The ad film, shot entirely on Rave's white-box stage, became one of the fastest-growing branded releases the studio has produced to date.",
    image: "/Frame-34.jpeg",
  },
  {
    slug: "new-chroma-stage",
    category: "Studio",
    date: "Aug 14, 2026",
    title: "A new chroma stage built for effects-heavy shoots",
    excerpt:
      "Air-conditioned, sound-proofed and fully rigged for VFX work, the new green-screen space is built for brands who need total control of the background.",
    image: "/cstudio.jpeg",
  },
  {
    slug: "outstanding-production-design-award",
    category: "Awards",
    date: "Jul 30, 2026",
    title: "Rave recognized for outstanding design",
    excerpt:
      "The studio picked up its latest industry honour at this year's ceremony, recognizing the design and production team behind a run of recent campaigns.",
    image: "/ravibhaia award.jpg",
  },
  {
    slug: "recording-facility-joins-studio",
    category: "Studio",
    date: "Jul 12, 2026",
    title: "A sound-treated recording facility joins the studio",
    excerpt:
      "Voice, music and mixing now sit under the same roof as picture, with a dedicated control room built for same-day turnarounds.",
    image: "/Recording Studio.jpeg",
  },
  {
    slug: "day-on-set",
    category: "Culture",
    date: "Jun 25, 2026",
    title: "A day on set: how the crew keeps a production running",
    excerpt:
      "From first call sheet to last light, a look at how Rave's production, art and camera teams coordinate to keep a shoot day on schedule.",
    image: "/w2orking.JPG",
  },
  {
    slug: "400-ad-films",
    category: "Milestone",
    date: "Jun 5, 2026",
    title: "Rave crosses 400 ad films produced",
    excerpt:
      "Four hundred campaigns, one studio: a look back at the sets, clients and crews that got Rave to this number.",
    image: "/private-photography.jpeg",
  },
];
