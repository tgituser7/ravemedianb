"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE_OUT, fadeUpInView } from "@/lib/motion";
import { DEPARTMENTS, ROLES } from "@/data/careers";

const APPLY_EMAIL = "work@rave.net.in";

export default function CareersRoles() {
  const [filter, setFilter] = useState<"All" | (typeof DEPARTMENTS)[number]>("All");
  const [open, setOpen] = useState<string | null>(null);

  const roles = useMemo(
    () => (filter === "All" ? ROLES : ROLES.filter((r) => r.department === filter)),
    [filter]
  );

  return (
    <section id="roles" className="scroll-mt-20 border-t border-zinc-200 bg-white px-[6%] py-20 sm:py-24">
      <div className="mx-auto max-w-4xl">
        <motion.p
          {...fadeUpInView(0, 14, 0.5)}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500"
        >
          Open roles
        </motion.p>
        <motion.h2
          {...fadeUpInView(0.08, 20, 0.7)}
          className="mt-4 text-[clamp(28px,3.6vw,42px)] font-bold leading-tight tracking-tight text-zinc-900"
        >
          {ROLES.length} openings right now.
        </motion.h2>

        <motion.div {...fadeUpInView(0.15, 10, 0.5)} className="mt-9 flex flex-wrap gap-2.5">
          {(["All", ...DEPARTMENTS] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setFilter(d)}
              aria-pressed={filter === d}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === d
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
              }`}
            >
              {d}
            </button>
          ))}
        </motion.div>

        <div className="mt-8 divide-y divide-zinc-200 border-y border-zinc-200">
          {roles.map((r, i) => {
            const isOpen = open === r.title;
            return (
              <motion.div key={r.title} {...fadeUpInView((i % 6) * 0.05, 14, 0.5)}>
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : r.title)}
                  aria-expanded={isOpen}
                  className="flex w-full flex-wrap items-center justify-between gap-4 py-6 text-left"
                >
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-zinc-900">{r.title}</h3>
                    <div className="mt-1.5 flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-wide text-zinc-500">
                      <span>{r.department}</span>
                      <span className="text-zinc-300">&bull;</span>
                      <span>{r.location}</span>
                      <span className="text-zinc-300">&bull;</span>
                      <span>{r.type}</span>
                    </div>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: EASE_OUT }}
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 text-zinc-600"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE_OUT }}
                      className="overflow-hidden"
                    >
                      <div className="pb-7">
                        <p className="max-w-xl text-[15px] leading-relaxed text-zinc-600">{r.blurb}</p>
                        <a
                          href={`mailto:${APPLY_EMAIL}?subject=${encodeURIComponent(`Application: ${r.title}`)}`}
                          className="mt-5 inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-orange-400"
                        >
                          Apply for this role
                        </a>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {roles.length === 0 ? <p className="py-10 text-center text-zinc-500">No openings in this team right now.</p> : null}
        </div>
      </div>
    </section>
  );
}
