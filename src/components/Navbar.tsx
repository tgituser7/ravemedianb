"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
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

function DribbbleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="12" r="9.5" />
      <path d="M2.9 8.7c4.6 1.4 10 1.2 14.7-.7M6.2 20.3c2.3-6.2 6-11 11.3-14.4M4 12.5c6.3-.6 12.4.9 16.7 4.6" />
    </svg>
  );
}

const NAV_LINKS = [
  { label: "Studio", href: "#", badge: false },
  { label: "About", href: "/about", badge: false },
  { label: "Create strategy", href: "#", badge: true },
  { label: "Project", href: "/project", badge: false },
  { label: "Pricing", href: "#", badge: false },
  { label: "Contact", href: "#", badge: false },
  { label: "Network", href: "/network", badge: false },
];

const SOCIAL_ICONS = [
  { Icon: YoutubeIcon, label: "YouTube", href: "https://www.youtube.com/@RaveNetworkIndustries" },
  { Icon: InstagramIcon, label: "Instagram", href: "#" },
  { Icon: DribbbleIcon, label: "Dribbble", href: "#" },
];

const LINK_STAGGER = 0.06;
const LINKS_START = 0.25;

const SCROLL_THRESHOLD = 40;

export default function Navbar({ entranceDelay = 0 }: { entranceDelay?: number }) {
  const [open, setOpen] = useState(false);
  const iconsDelay = LINKS_START + NAV_LINKS.length * LINK_STAGGER + 0.1;
  const isHome = usePathname() === "/";

  const linkColor = isHome ? "text-white/85 hover:text-white" : "text-neutral-900/90 hover:text-neutral-900";
  const underlineColor = isHome ? "bg-white" : "bg-neutral-900";
  const dividerColor = isHome ? "bg-white/15" : "bg-neutral-400/60";
  const iconColor = isHome ? "text-white/70 hover:text-white" : "text-neutral-800 hover:text-neutral-950";
  const badgeBg = isHome ? "bg-white" : "bg-black";
  const badgeFill = isHome ? "black" : "white";

  // Shrinks into a floating, rounded "capsule" once the page scrolls past
  // SCROLL_THRESHOLD, and expands back to the full-width bar at the top —
  // a fixed header measured by a spacer so page content never jumps.
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement | null>(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    let ticking = false;
    const evaluate = () => {
      ticking = false;
      setScrolled((prev) => {
        const next = window.scrollY > SCROLL_THRESHOLD;
        return prev === next ? prev : next;
      });
    };
    // rAF-throttled: reads window.scrollY at most once per frame, so a
    // fast/fling scroll can't queue up a burst of state updates fighting
    // the transition — each crossing of the threshold gets exactly one
    // clean state flip for the tween to animate from.
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(evaluate);
    };
    evaluate();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const measure = () => setHeaderHeight(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <>
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 flex flex-col items-center">
      <motion.div
        animate={{
          marginTop: scrolled ? 12 : 0,
          width: scrolled ? "94%" : "100%",
          maxWidth: scrolled ? 1024 : 1600,
          borderRadius: scrolled ? 9999 : 0,
          paddingLeft: scrolled ? 24 : 32,
          paddingRight: scrolled ? 24 : 32,
          paddingTop: scrolled ? 10 : 20,
          paddingBottom: scrolled ? 10 : 20,
          boxShadow: scrolled
            ? "0 10px 30px -5px rgba(0,0,0,0.18)"
            : "0 0 0 0 rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.45, ease: EASE_OUT }}
        className={`flex items-center gap-6 transition-colors duration-300 ${
          isHome ? "bg-black" : "bg-[#eae8e2]"
        }`}
      >
        {/* Logo */}
        <motion.a
          href="/"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: entranceDelay, ease: EASE_OUT }}
          className="flex shrink-0 items-center pr-4"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="Rave" className="h-8 w-auto" />
        </motion.a>

        <span className={`hidden h-6 w-px shrink-0 md:block ${dividerColor}`} />

        {/* Nav links */}
        <nav className="hidden flex-1 items-center gap-8 md:flex">
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
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: entranceDelay + iconsDelay, ease: EASE_OUT }}
          className="ml-auto flex shrink-0 items-center gap-5"
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
            className={`flex h-9 w-9 items-center justify-center rounded-full border md:hidden ${
              isHome ? "border-white/20 text-white" : "border-neutral-400/60 text-neutral-900"
            }`}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </motion.div>

      {open ? (
        <nav
          className={`flex flex-col gap-1 border-t px-8 pb-6 pt-2 transition-all duration-300 md:hidden ${
            isHome ? "border-white/10 bg-black" : "border-neutral-300/60 bg-[#eae8e2]"
          } ${scrolled ? "w-[94%] max-w-5xl rounded-b-3xl shadow-xl shadow-black/10" : "w-full"}`}
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
        </nav>
      ) : null}
    </header>
    <div style={{ height: headerHeight }} aria-hidden />
    </>
  );
}
