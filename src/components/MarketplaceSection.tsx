"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

const ITEMS = [
  { label: "Artnesia Gap", gradient: "from-zinc-900 via-zinc-800 to-black" },
  { label: "Immortalise Works", gradient: "from-violet-500 via-purple-600 to-indigo-700" },
  { label: "Creativity Class", gradient: "from-rose-500 via-orange-400 to-yellow-300" },
  { label: "Celebrates Party", gradient: "from-emerald-500 via-teal-500 to-blue-600" },
];

export default function MarketplaceSection() {
  const [active, setActive] = useState(0);

  return (
    <section className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="max-w-lg">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
              Get more <span className="text-fuchsia-600">closer</span>
            </span>
            <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
              Marketplace for Creativity
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 sm:text-base">
              In the realm of Artnesia, creativity knows no bounds, an
              eternal marketplace that celebrates the timeless nature of
              art.
            </p>
          </div>
          <button className="flex-shrink-0 rounded-full bg-fuchsia-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-fuchsia-700">
            View All
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {ITEMS.map((item) => (
            <div key={item.label}>
              <PlaceholderImage
                label={item.label}
                gradient={item.gradient}
                className="aspect-[3/4] rounded-2xl"
              />
              <p className="mt-3 text-sm font-medium text-zinc-900">
                {item.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              aria-label="Previous"
              onClick={() => setActive((a) => Math.max(0, a - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              aria-label="Next"
              onClick={() => setActive((a) => Math.min(ITEMS.length - 1, a + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:bg-zinc-50"
            >
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-zinc-100">
            <div
              className="h-full rounded-full bg-zinc-900 transition-all duration-300"
              style={{
                width: `${100 / ITEMS.length}%`,
                marginLeft: `${(active * 100) / ITEMS.length}%`,
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
