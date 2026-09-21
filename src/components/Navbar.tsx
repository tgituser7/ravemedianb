"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { Play, Menu, X } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

function YoutubeIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.97C18.88 4 12 4 12 4s-6.88 0-8.59.45A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.95 1.97C5.12 19.5 12 19.5 12 19.5s6.88 0 8.59-.45a2.78 2.78 0 0 0 1.95-1.97 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33ZM9.75 15.02V8.48l5.75 3.27-5.75 3.27Z" />
    </svg>
  );
}

function InstagramIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Project", href: "/project", badge: false },
  { label: "Network", href: "/network", badge: false },
  { label: "Studio", href: "/studio", badge: false },
];

const SOCIAL_ICONS = [
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@RaveNetworkIndustries" },
  { Icon: XIcon, label: "X", href: "#" },
];

const LINK_STAGGER = 0.06;
const LINKS_START = 0.25;

// The bar morphs into a floating capsule continuously as you scroll: every
// property is interpolated from one 0..1 progress value (scroll position,
// smoothed by a spring), so a slow scroll eases it gradually and a fast
// scroll glides instead of snapping.
const MORPH_RANGE = 140; // px of scroll over which the bar fully condenses
const FULL_MAX_WIDTH = 1600;
const CAPSULE_GAP = 32; // 2rem between nav links and the icons group
const CAPSULE_PAD_X = 24;

export default function Navbar({ entranceDelay = 0 }: { entranceDelay?: number }) {
  const [open, setOpen] = useState(false);
  const iconsDelay = LINKS_START + NAV_LINKS.length * LINK_STAGGER + 0.1;

  // Same look on every route, including home — no more black bar there.
  const linkColor = "text-neutral-900/90 hover:text-neutral-900";
  const underlineColor = "bg-neutral-900";
  const dividerColor = "bg-neutral-400/60";
  const iconColor = "text-neutral-800 hover:text-neutral-950";
  const badgeBg = "bg-black";
  const badgeFill = "white";

  const reduced = useReducedMotion();
  const headerRef = useRef<HTMLElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const iconsRef = useRef<HTMLDivElement | null>(null);
  const [measured, setMeasured] = useState(false);
  const [spacer, setSpacer] = useState(0);

  const { scrollY } = useScroll();
  const raw = useTransform(scrollY, [0, MORPH_RANGE], [0, 1]);
  const smooth = useSpring(raw, { stiffness: 170, damping: 30, mass: 0.6, restDelta: 0.0005 });
  const p = reduced ? raw : smooth;

  // Real pixel widths (auto <-> 100% can't be interpolated, which is what made
  // the old transition jump): full = viewport width, capsule = content width.
  const fullW = useMotionValue(1200);
  const capW = useMotionValue(720);
  const width = useTransform([p, fullW, capW], ([pp, f, c]: number[]) => f + (c - f) * pp);
  const marginTop = useTransform(p, [0, 1], [0, 12]);
  const padX = useTransform(p, [0, 1], [32, CAPSULE_PAD_X]);
  const padY = useTransform(p, [0, 1], [20, 10]);
  const radius = useTransform(p, [0, 1], [0, 34]);
  const dropRadius = useTransform(p, [0, 1], [0, 24]);
  const shadow = useTransform(p, (v) => `0 10px 30px -5px rgba(0,0,0,${(0.18 * v).toFixed(3)})`);

  useLayoutEffect(() => {
    const measure = () => {
      const header = headerRef.current;
      const bar = barRef.current;
      const wrap = wrapRef.current;
      const nav = navRef.current;
      const icons = iconsRef.current;
      if (!header || !bar || !wrap || !nav || !icons) return;

      const headW = header.clientWidth;
      const full = Math.min(headW, FULL_MAX_WIDTH);
      const gap = parseFloat(getComputedStyle(bar).columnGap) || 24;

      let total = 0;
      let count = 0;
      for (const child of Array.from(bar.children) as HTMLElement[]) {
        if (child === wrap) {
          const navW = nav.offsetWidth;
          total += navW > 0 ? navW + CAPSULE_GAP + icons.offsetWidth : icons.offsetWidth;
        } else {
          if (child.offsetWidth === 0) continue;
          total += child.offsetWidth;
        }
        count += 1;
      }
      const cap = total + gap * Math.max(0, count - 1) + CAPSULE_PAD_X * 2;
      fullW.set(full);
      capW.set(Math.min(cap, full));

      // Constant spacer = the bar's height at rest, so page content never
      // shifts while the bar condenses.
      const cs = getComputedStyle(bar);
      const contentH = bar.offsetHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      setSpacer(Math.round(contentH + 40));
      setMeasured(true);
    };

    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    if (iconsRef.current) ro.observe(iconsRef.current);
    void document.fonts?.ready.then(measure);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [fullW, capW]);

  return (
    <>
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      <motion.div
        ref={barRef}
        style={{
          width: measured ? width : "100%",
          marginTop,
          paddingLeft: padX,
          paddingRight: padX,
          paddingTop: padY,
          paddingBottom: padY,
          borderRadius: radius,
          boxShadow: shadow,
        }}
        className="flex items-center gap-6 bg-[#eae8e2]"
      >
        {/* Logo — back on the left like before, but shifted toward the
            right side of its own slot (left edge to the small divider
            bar) instead of sitting flush against the edge. */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: entranceDelay, ease: EASE_OUT }}
          className="flex w-[80px] shrink-0 items-center justify-end pr-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Rave" className="h-7 w-auto" />
        </motion.a>

        <span className={`hidden h-6 w-px shrink-0 md:block ${dividerColor}`} />

        {/* Nav links + social/CTA group share this wrapper so the gap
            between them can be pinned to a fixed ~2rem once scrolled,
            instead of the spread-apart, fill-the-bar spacing used at
            the top of the page. */}
        <div ref={wrapRef} className="flex flex-1 items-center justify-between">
        <nav ref={navRef} className="hidden items-center gap-5 md:flex lg:gap-6">
          {NAV_LINKS.map(({ label, href, badge }, i) => (
            <motion.a
              key={label}
              href={href}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: entranceDelay + LINKS_START + i * LINK_STAGGER,
                ease: EASE_OUT,
              }}
              className={`group flex shrink-0 items-center gap-2 text-[15px] font-[520] transition-colors duration-200 ${linkColor}`}
            >
              {badge ? (
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${badgeBg}`}>
                  <Play size={9} fill={badgeFill} strokeWidth={0} className="ml-px" />
                </span>
              ) : null}
              <span className="relative whitespace-nowrap">
                {label}
                <span
                  className={`absolute -bottom-0.5 left-0 h-px w-0 transition-all duration-300 group-hover:w-full ${underlineColor}`}
                />
              </span>
            </motion.a>
          ))}
        </nav>

        {/* Social icons + CTA */}
        <motion.div
          ref={iconsRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: entranceDelay + iconsDelay, ease: EASE_OUT }}
          className="flex shrink-0 items-center gap-5"
        >
          <div className="hidden items-center gap-5 md:flex">
            {SOCIAL_ICONS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`transition-colors ${iconColor}`}
              >
                <Icon size={18} />
              </a>
            ))}
          </div>

          <span className={`hidden h-6 w-px md:block ${dividerColor}`} />

          <a
            href="/network"
            className="hidden rounded-full bg-orange-500 px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-orange-400 sm:inline-block"
          >
            Get Started
          </a>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-400/60 text-neutral-900 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
        </div>
      </motion.div>

      {open ? (
        <motion.nav
          style={{
            width: measured ? width : "100%",
            borderBottomLeftRadius: dropRadius,
            borderBottomRightRadius: dropRadius,
            boxShadow: shadow,
          }}
          className="flex flex-col gap-1 border-t border-neutral-300/60 bg-[#eae8e2] px-8 pb-6 pt-2 md:hidden"
        >
          {NAV_LINKS.map(({ label, href, badge }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 py-2.5 text-[15px] font-[520] transition-colors ${linkColor}`}
            >
              {badge ? (
                <span className={`flex h-5 w-5 items-center justify-center rounded-full ${badgeBg}`}>
                  <Play size={9} fill={badgeFill} strokeWidth={0} className="ml-px" />
                </span>
              ) : null}
              {label}
            </a>
          ))}
          <div className="mt-3 flex items-center gap-4">
            {SOCIAL_ICONS.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`transition-colors ${iconColor}`}
              >
                <Icon />
              </a>
            ))}
          </div>
          <a
            href="/network"
            onClick={() => setOpen(false)}
            className="mt-4 inline-block rounded-full bg-orange-500 px-5 py-2.5 text-center text-[13px] font-semibold text-white transition-colors hover:bg-orange-400"
          >
            Get Started
          </a>
        </motion.nav>
      ) : null}
    </header>
    <div style={{ height: spacer }} aria-hidden />
    </>
  );
}
