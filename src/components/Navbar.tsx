"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Play, User, Sun, Menu, X } from "lucide-react";
import { EASE_OUT } from "@/lib/motion";

const NAV_LINKS = [
  { label: "Get Started", href: "#", badge: false },
  { label: "Create strategy", href: "#", badge: true },
  { label: "Pricing", href: "#", badge: false },
  { label: "Contact", href: "#", badge: false },
  { label: "Solution", href: "#", badge: false },
  { label: "E-Commerce", href: "#", badge: false },
  { label: "Network", href: "/network", badge: false },
];

const LINK_STAGGER = 0.07;
const LINKS_START = 0.25;

export default function Navbar({ entranceDelay = 0 }: { entranceDelay?: number }) {
  const [open, setOpen] = useState(false);
  const iconsDelay = LINKS_START + NAV_LINKS.length * LINK_STAGGER + 0.1;

  return (
    <motion.header
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: entranceDelay, ease: EASE_OUT }}
      className="sticky top-0 z-50 border-b border-white/10 bg-white/60 backdrop-blur-lg backdrop-saturate-150 transition-colors duration-300"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-5">
        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: entranceDelay, ease: EASE_OUT }}
          className="flex items-center gap-2"
        >
          <Send size={22} strokeWidth={0} fill="#5eead4" className="-rotate-12" />
          <span className="text-[15px] font-semibold tracking-tight text-neutral-900">
            Pallet Ross
          </span>
        </motion.a>

        <nav className="hidden items-center gap-7 md:flex">
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
              className="group flex items-center gap-2 text-[13px] font-medium text-neutral-700 transition-colors duration-200 hover:text-neutral-900"
            >
              {badge ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                  <Play size={9} fill="white" strokeWidth={0} className="ml-px" />
                </span>
              ) : null}
              <span className="relative">
                {label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-neutral-900 transition-all duration-300 group-hover:w-full" />
              </span>
            </motion.a>
          ))}
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: entranceDelay + iconsDelay, ease: EASE_OUT }}
          className="flex items-center gap-3"
        >
          <button
            aria-label="Account"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50 sm:flex"
          >
            <User size={16} />
          </button>
          <button
            aria-label="Toggle theme"
            className="hidden h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition-colors hover:bg-neutral-50 sm:flex"
          >
            <Sun size={16} />
          </button>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-700 md:hidden"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </motion.div>
      </div>

      {open ? (
        <nav className="flex flex-col gap-1 border-t border-neutral-100 bg-white px-8 pb-6 pt-2 md:hidden">
          {NAV_LINKS.map(({ label, href, badge }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="flex items-center gap-2 py-2.5 text-[14px] font-medium text-neutral-700 transition-colors hover:text-neutral-900"
            >
              {badge ? (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black">
                  <Play size={9} fill="white" strokeWidth={0} className="ml-px" />
                </span>
              ) : null}
              {label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-3 sm:hidden">
            <button
              aria-label="Account"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600"
            >
              <User size={16} />
            </button>
            <button
              aria-label="Toggle theme"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-neutral-600"
            >
              <Sun size={16} />
            </button>
          </div>
        </nav>
      ) : null}
    </motion.header>
  );
}
