"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import RevealText from "@/components/RevealText";
import { EASE_OUT, fadeUpInView, viewportOnce } from "@/lib/motion";
import { NEWS, type NewsCategory } from "@/data/news";

const CATEGORIES: NewsCategory[] = ["Announcement", "Studio", "Milestone", "Awards", "Culture"];

export default function Newsroom() {
  const [filter, setFilter] = useState<"All" | NewsCategory>("All");
  const [featured, ...rest] = NEWS;
  const visible = useMemo(() => {
    const list = filter === "All" ? rest : rest.filter((n) => n.category === filter);
    return list;
  }, [filter, rest]);
  const showFeatured = filter === "All" || filter === featured.category;

  return (
    <>
      {/* Hero */}
      <section className="px-[6%] pb-12 pt-16 sm:pt-20">
        <motion.p
          {...fadeUpInView(0, 12, 0.5)}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-orange-500"
        >
          Newsroom
        </motion.p>
        <h1 className="mt-4 max-w-3xl text-[clamp(34px,6vw,72px)] font-bold leading-[1.02] tracking-tight text-zinc-900">
          <RevealText text="Stories from inside the studio." delay={0.15} stagger={0.05} />
        </h1>
        <motion.p {...fadeUpInView(0.25, 14, 0.6)} className="mt-6 max-w-xl text-zinc-600">
          Announcements, milestones and behind-the-scenes updates from Rave, as they happen.
        </motion.p>

        {/* Category filter */}
        <motion.div {...fadeUpInView(0.35, 10, 0.5)} className="mt-10 flex flex-wrap gap-2.5">
          {(["All", ...CATEGORIES] as const).map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
                filter === c
                  ? "border-zinc-900 bg-zinc-900 text-white"
                  : "border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900"
              }`}
            >
              {c}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Featured story */}
      {showFeatured ? (
        <section className="px-[6%] pb-8">
          <motion.a
            href="#"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7, ease: EASE_OUT }}
            className="group grid overflow-hidden rounded-[28px] bg-white shadow-[0_30px_60px_-35px_rgba(0,0,0,0.35)] md:grid-cols-2"
          >
            <div className="relative h-64 overflow-hidden md:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featured.image}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col justify-center px-8 py-10 sm:px-12">
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
                <span>{featured.category}</span>
                <span className="text-zinc-300">&bull;</span>
                <span className="text-zinc-400">{featured.date}</span>
              </div>
              <h2 className="mt-4 text-2xl font-bold leading-tight tracking-tight text-zinc-900 sm:text-3xl">
                {featured.title}
              </h2>
              <p className="mt-4 max-w-md text-[15px] leading-relaxed text-zinc-600">{featured.excerpt}</p>
              <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-zinc-900">
                Read the story
                <span className="transition-transform group-hover:translate-x-1">&rarr;</span>
              </span>
            </div>
          </motion.a>
        </section>
      ) : null}

      {/* Grid */}
      <section className="px-[6%] pb-24 pt-8 sm:pb-32">
        <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((item, i) => (
            <motion.a
              key={item.slug}
              href="#"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewportOnce}
              transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: EASE_OUT }}
              className="group flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.image}
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="mt-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-widest text-orange-500">
                <span>{item.category}</span>
                <span className="text-zinc-300">&bull;</span>
                <span className="text-zinc-400">{item.date}</span>
              </div>
              <h3 className="mt-3 text-lg font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-orange-600">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.excerpt}</p>
            </motion.a>
          ))}
          {visible.length === 0 && !showFeatured ? (
            <p className="col-span-full text-center text-zinc-500">No stories in this category yet.</p>
          ) : null}
        </div>
      </section>
    </>
  );
}
