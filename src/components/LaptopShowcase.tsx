"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const DESIGN_W = 1672;
const DESIGN_H = 941;
const SCREEN_W = 1600;
const SCREEN_H = 900;

// How much real scroll drives the pin — independent of the authored
// content's own (design-pixel) height, since the two coordinate spaces
// are unrelated once the laptop composition is scaled to fit the viewport.
const SCROLL_VH = 420;

// The laptop screen's photographed corners in /public/lap.png (measured),
// and the flat full-bleed rect they unwarp into as the scroll "zooms in"
// during the last stretch of the pin — the same homography-solving used
// to derive the static overlay, recomputed live each frame from lerped
// corners so the perspective smoothly flattens while the content grows
// to fill the frame and hands off to the real section below.
const ORIGINAL_CORNERS = {
  TL: [448, 180] as [number, number],
  TR: [1047, 103] as [number, number],
  BR: [1133, 513] as [number, number],
  BL: [520, 614] as [number, number],
};
const FLAT_CORNERS = {
  TL: [0, 0] as [number, number],
  TR: [DESIGN_W, 0] as [number, number],
  BR: [DESIGN_W, DESIGN_H] as [number, number],
  BL: [0, DESIGN_H] as [number, number],
};
// Fraction of the pin's scroll progress where the zoom/unwarp begins.
const ZOOM_START = 0.85;

function lerpPt(a: [number, number], b: [number, number], t: number): [number, number] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
}

// Classic 4-point homography solver (Heckbert-derived), the same method
// used offline to derive the static SCREEN_MATRIX — run here live so the
// quad can be re-solved every frame as its corners animate.
function adj(m: number[]) {
  return [
    m[4] * m[8] - m[5] * m[7], m[2] * m[7] - m[1] * m[8], m[1] * m[5] - m[2] * m[4],
    m[5] * m[6] - m[3] * m[8], m[0] * m[8] - m[2] * m[6], m[2] * m[3] - m[0] * m[5],
    m[3] * m[7] - m[4] * m[6], m[1] * m[6] - m[0] * m[7], m[0] * m[4] - m[1] * m[3],
  ];
}
function multmm(a: number[], b: number[]) {
  const c = Array(9).fill(0);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      let cij = 0;
      for (let k = 0; k < 3; k++) cij += a[3 * i + k] * b[3 * k + j];
      c[3 * i + j] = cij;
    }
  return c;
}
function multmv(m: number[], v: number[]) {
  return [
    m[0] * v[0] + m[1] * v[1] + m[2] * v[2],
    m[3] * v[0] + m[4] * v[1] + m[5] * v[2],
    m[6] * v[0] + m[7] * v[1] + m[8] * v[2],
  ];
}
function basisToPoints(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number) {
  const m = [x1, x2, x3, y1, y2, y3, 1, 1, 1];
  const v = multmv(adj(m), [x4, y4, 1]);
  return multmm(m, [v[0], 0, 0, 0, v[1], 0, 0, 0, v[2]]);
}
function matrix3dFromQuad(
  w: number,
  h: number,
  corners: { TL: [number, number]; TR: [number, number]; BR: [number, number]; BL: [number, number] }
) {
  const s = basisToPoints(0, 0, w, 0, w, h, 0, h);
  const d = basisToPoints(
    corners.TL[0], corners.TL[1],
    corners.TR[0], corners.TR[1],
    corners.BR[0], corners.BR[1],
    corners.BL[0], corners.BL[1]
  );
  const m = multmm(d, adj(s));
  const c = [];
  for (let i = 0; i < 9; i++) c[i] = m[i] / m[8];
  return `matrix3d(${c[0]}, ${c[3]}, 0, ${c[6]}, ${c[1]}, ${c[4]}, 0, ${c[7]}, 0, 0, 1, 0, ${c[2]}, ${c[5]}, 0, ${c[8]})`;
}

function useDesignScale(designWidth: number) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(el.clientWidth / designWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [designWidth]);

  return [ref, scale] as const;
}

function useCountUp(target: number, active: boolean, duration = 1100) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let raf: number;
    const start = performance.now();
    function tick(t: number) {
      const p = Math.min((t - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return value;
}

const PROJECTS = [
  {
    title: "Sonnet Poster",
    desc: "A minimal poster series that explores the intersection of typography and emotion.",
    tags: ["Branding", "Poster"],
    gradient: "from-zinc-200 via-zinc-300 to-zinc-400",
  },
  {
    title: "Earbuds Device App",
    desc: "A seamless mobile experience for modern sound and lifestyle.",
    tags: ["UI/UX", "Product Design"],
    gradient: "from-indigo-950 via-slate-900 to-black",
  },
  {
    title: "Kinetica Logo",
    desc: "A modern brand identity inspired by analog precision.",
    tags: ["Branding & Identity"],
    gradient: "from-stone-200 via-stone-300 to-stone-400",
  },
  {
    title: "Fleespace Branding",
    desc: "Editorial packaging for a modern workspace brand.",
    tags: ["Branding", "Packaging"],
    gradient: "from-zinc-700 via-zinc-800 to-black",
  },
];

function ProjectCard({
  title,
  desc,
  tags,
  gradient,
}: (typeof PROJECTS)[number]) {
  return (
    <div>
      <div className={`aspect-[16/10] w-full rounded-md bg-gradient-to-br ${gradient}`} />
      <h3 className="mt-5 text-2xl font-semibold text-white">{title}</h3>
      <p className="mt-2 max-w-sm text-[15px] leading-relaxed text-zinc-400">{desc}</p>
      <div className="mt-4 flex items-center gap-2">
        {tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/15 px-3 py-1 text-xs font-medium text-zinc-300"
          >
            {tag}
          </span>
        ))}
        <span className="ml-1 flex h-7 w-7 items-center justify-center rounded-full border border-white/15 text-zinc-300">
          ↗
        </span>
      </div>
    </div>
  );
}

function PortfolioSection() {
  return (
    <div style={{ width: SCREEN_W }} className="bg-[#0b0b0c] p-16 text-white">
      <span className="text-[13px] font-medium uppercase tracking-widest text-zinc-500">
        [03] Selected Work
      </span>
      <div className="mt-14 grid grid-cols-2 gap-x-14 gap-y-16">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.title} {...p} />
        ))}
      </div>
    </div>
  );
}

function TestimonialSection() {
  return (
    <div style={{ width: SCREEN_W }} className="relative bg-white p-16 pb-24 text-zinc-900">
      <span className="text-[13px] font-medium uppercase tracking-widest text-zinc-400">
        [04] What Clients Say
      </span>

      <div className="mt-16 flex items-start gap-12">
        <div className="w-56 shrink-0">
          <div className="aspect-[3/4] w-full rounded-md bg-gradient-to-br from-zinc-200 via-zinc-300 to-zinc-400" />
          <div className="mt-3 flex items-center justify-between text-[11px] uppercase tracking-wide text-zinc-400">
            <span>Happy Customer</span>
            <span>2025©</span>
          </div>
        </div>

        <div className="flex-1">
          <span className="font-serif text-6xl leading-none text-orange-500">&ldquo;</span>
          <p className="-mt-4 max-w-2xl text-3xl font-medium leading-snug text-zinc-900">
            They captured our vision with surprising clarity. The process was
            simple, collaborative, and the result feels timeless.
          </p>
          <p className="mt-8 text-lg text-zinc-500">— Sarah C.</p>
        </div>
      </div>

      <div className="absolute right-16 top-40 flex items-center gap-4">
        <div className="flex -space-x-2">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-zinc-300 to-zinc-500"
            />
          ))}
        </div>
        <span className="text-sm text-zinc-500">+1K</span>
      </div>
      <p className="absolute right-16 top-56 max-w-[220px] text-sm text-zinc-500">
        They joined not just for design. We&apos;re ready when you are.
      </p>
    </div>
  );
}

function Stat({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  return (
    <div>
      <div className="text-6xl font-semibold tracking-tight text-zinc-900">
        {value}
        <span className="text-orange-500">{suffix}</span>
      </div>
      <div className="mt-3 text-sm text-zinc-500">{label}</div>
    </div>
  );
}

const MilestonesSection = ({
  innerRef,
  active,
}: {
  innerRef: React.Ref<HTMLDivElement>;
  active: boolean;
}) => {
  const years = useCountUp(5, active);
  const projects = useCountUp(120, active);
  const brands = useCountUp(50, active);
  const returning = useCountUp(12, active);

  return (
    <div
      ref={innerRef}
      style={{ width: SCREEN_W }}
      className="border-t border-zinc-100 bg-white p-16 pb-20 text-zinc-900"
    >
      <span className="text-[13px] font-medium uppercase tracking-widest text-zinc-400">
        [05] Agency Milestones
      </span>
      <div className="mt-16 grid grid-cols-4 gap-10">
        <Stat value={years} suffix="+" label="Years Experience" />
        <Stat value={projects} suffix="+" label="Projects Completed" />
        <Stat value={brands} suffix="+" label="Brands Transformed" />
        <Stat value={returning} suffix="%" label="Returning Clients" />
      </div>
    </div>
  );
};

function PricingTeaseSection() {
  return (
    <div
      style={{ width: SCREEN_W }}
      className="border-t border-zinc-100 bg-white p-16 pb-24 text-zinc-900"
    >
      <span className="text-[13px] font-medium uppercase tracking-widest text-zinc-400">
        [06] Pricing Plan
      </span>
      <h2 className="mt-8 max-w-2xl text-5xl font-semibold leading-tight tracking-tight">
        Design, Scaled to Your Needs, Instantly Ready When You Are.
      </h2>
    </div>
  );
}

export default function LaptopShowcase() {
  const [wrapRef, scale] = useDesignScale(DESIGN_W);
  const scrollRef = useRef<HTMLElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const milestonesRef = useRef<HTMLDivElement | null>(null);
  const screenRef = useRef<HTMLDivElement | null>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);

  const [maxScroll, setMaxScroll] = useState(1);
  const [milestonesTop, setMilestonesTop] = useState(Infinity);
  const [milestonesActive, setMilestonesActive] = useState(false);

  useLayoutEffect(() => {
    const measure = () => {
      if (contentRef.current) {
        setMaxScroll(Math.max(contentRef.current.scrollHeight - SCREEN_H, 1));
      }
      if (milestonesRef.current) {
        setMilestonesTop(milestonesRef.current.offsetTop);
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    if (screenRef.current) {
      screenRef.current.style.transform = matrix3dFromQuad(SCREEN_W, SCREEN_H, ORIGINAL_CORNERS);
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: scrollRef,
    offset: ["start start", "end end"],
  });

  // Content scrolls normally up to ZOOM_START, then holds in place while
  // the zoom/unwarp takes over for the rest of the pin.
  const rawY = useTransform(scrollYProgress, (v) => {
    const t = Math.min(v, ZOOM_START) / ZOOM_START;
    return -maxScroll * t;
  });
  const y = useSpring(rawY, { stiffness: 220, damping: 32, mass: 0.6 });

  useMotionValueEvent(y, "change", (latest) => {
    const scrolledTo = -latest + SCREEN_H * 0.55;
    setMilestonesActive(scrolledTo >= milestonesTop);
  });

  const zoomT = useTransform(scrollYProgress, [ZOOM_START, 1], [0, 1], { clamp: true });

  useMotionValueEvent(zoomT, "change", (t) => {
    if (screenRef.current) {
      const corners = {
        TL: lerpPt(ORIGINAL_CORNERS.TL, FLAT_CORNERS.TL, t),
        TR: lerpPt(ORIGINAL_CORNERS.TR, FLAT_CORNERS.TR, t),
        BR: lerpPt(ORIGINAL_CORNERS.BR, FLAT_CORNERS.BR, t),
        BL: lerpPt(ORIGINAL_CORNERS.BL, FLAT_CORNERS.BL, t),
      };
      screenRef.current.style.transform = matrix3dFromQuad(SCREEN_W, SCREEN_H, corners);
    }
    if (imgRef.current) {
      imgRef.current.style.opacity = String(1 - t);
    }
  });

  return (
    <section
      ref={scrollRef}
      className="relative bg-black"
      style={{ height: `${SCROLL_VH}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden px-6">
        <div
          ref={wrapRef}
          className="relative w-full max-w-5xl"
          style={{ aspectRatio: `${DESIGN_W} / ${DESIGN_H}` }}
        >
          <div
            style={{
              width: DESIGN_W,
              height: DESIGN_H,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
            className="absolute left-0 top-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imgRef}
              src="/lap.png"
              alt="Laptop displaying the studio's work"
              width={DESIGN_W}
              height={DESIGN_H}
              draggable={false}
              className="pointer-events-none absolute left-0 top-0 h-full w-full select-none"
            />

            <div
              ref={screenRef}
              className="absolute left-0 top-0 overflow-hidden"
              style={{
                width: SCREEN_W,
                height: SCREEN_H,
                transformOrigin: "0 0",
              }}
            >
              <motion.div ref={contentRef} className="flex flex-col" style={{ y }}>
                <PortfolioSection />
                <TestimonialSection />
                <MilestonesSection innerRef={milestonesRef} active={milestonesActive} />
                <PricingTeaseSection />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
