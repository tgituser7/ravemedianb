export type Role = {
  title: string;
  department: string;
  location: string;
  type: string;
  blurb: string;
};

export const DEPARTMENTS = ["Production", "Studio Ops", "Post & Animation", "Design", "Business"] as const;

// PLACEHOLDER CONTENT: these openings are fictional, written to show the
// Careers layout with realistic copy. Swap in real roles before this goes
// live, and point "Apply" at a real inbox or ATS.
export const ROLES: Role[] = [
  {
    title: "Assistant Director",
    department: "Production",
    location: "Lucknow",
    type: "Full-time",
    blurb: "Run the floor alongside our directors — call sheets, blocking, continuity, and keeping a shoot day on schedule.",
  },
  {
    title: "Gaffer / Lighting Technician",
    department: "Studio Ops",
    location: "Lucknow",
    type: "Full-time",
    blurb: "Light sets across our shooting floors, from single-cam interviews to multi-light commercial setups.",
  },
  {
    title: "Video Editor",
    department: "Post & Animation",
    location: "Mumbai",
    type: "Full-time",
    blurb: "Cut ad films, brand content and social edits, working closely with directors from rough cut to final grade.",
  },
  {
    title: "Motion Designer",
    department: "Post & Animation",
    location: "Remote",
    type: "Contract",
    blurb: "Bring type, logos and product shots to life for campaigns that need more than a straight cut.",
  },
  {
    title: "Sound Engineer",
    department: "Studio Ops",
    location: "Lucknow",
    type: "Full-time",
    blurb: "Record and mix voice, music and location sound across our recording facility and shoot floors.",
  },
  {
    title: "Studio Manager",
    department: "Studio Ops",
    location: "Lucknow",
    type: "Full-time",
    blurb: "Own the day-to-day of the facility — scheduling, equipment, vendors — so every crew walks onto a set that's ready.",
  },
  {
    title: "Client Servicing Executive",
    department: "Business",
    location: "Mumbai",
    type: "Full-time",
    blurb: "Be the line between client briefs and the production floor, keeping every project on brief and on time.",
  },
  {
    title: "UI/UX Design Intern",
    department: "Design",
    location: "Remote",
    type: "Internship",
    blurb: "Work on brand systems, decks and digital touchpoints for Rave and the brands we produce for.",
  },
];

export const VALUES = [
  {
    title: "Craft over shortcuts",
    text: "We'd rather relight a shot than fix it in post. The extra ten minutes on set usually save ten hours later.",
  },
  {
    title: "The set is a classroom",
    text: "Everyone here learned by standing next to someone better than them. We still expect you to ask questions on day one.",
  },
  {
    title: "Say yes to weird ideas",
    text: "Some of our best work started as the option nobody pitched first. We make room for it anyway.",
  },
  {
    title: "Ship, then improve",
    text: "A campaign that airs and gets refined beats a perfect deck that never leaves the studio.",
  },
];

export const PERKS = [
  { icon: "heart-pulse", label: "Health cover", text: "For you and your family, from day one." },
  { icon: "clock", label: "Flexible hours", text: "Shoot days move; your schedule around them can too." },
  { icon: "camera", label: "Gear & studio access", text: "Use our cameras, stages and kit on your own projects." },
  { icon: "graduation-cap", label: "Learning budget", text: "Courses, workshops and festival passes, on us." },
  { icon: "plane", label: "Team offsites", text: "Once a year, off the floor and out of town." },
  { icon: "utensils", label: "Meals on shoot days", text: "Nobody grades a shot well on an empty stomach." },
  { icon: "wallet", label: "Referral bonus", text: "Bring in great people, get paid for it." },
  { icon: "gift", label: "Paid time off", text: "Real rest, tracked honestly, taken without guilt." },
];

export const PROCESS = [
  { step: "01", title: "Apply", text: "Send your reel, resume or portfolio — whatever shows your work best." },
  { step: "02", title: "Review", text: "We look at the work first. A senior lead from that team reviews it within a week." },
  { step: "03", title: "Meet the team", text: "A conversation (or a trial day on set) with the people you'd actually work with." },
  { step: "04", title: "Offer", text: "We move fast once we know. Most roles close within two to three weeks of applying." },
];
