import { ChevronUp, ChevronDown } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

const STACK = [
  {
    label: "Bosch / Bruegel",
    gradient: "from-neutral-900 via-red-900 to-red-700",
    className: "left-0 top-0 h-64 w-44 rotate-180 sm:h-72 sm:w-52",
    z: 10,
  },
  {
    label: "New Now",
    gradient: "from-orange-50 via-rose-50 to-amber-100",
    className: "left-28 top-10 h-60 w-40 -rotate-3 sm:left-40 sm:top-14 sm:h-64 sm:w-48",
    z: 20,
  },
  {
    label: "Tesla",
    gradient: "from-zinc-900 via-red-950 to-zinc-800",
    className: "left-[13rem] top-20 h-60 w-40 rotate-2 sm:left-[19rem] sm:top-24 sm:h-64 sm:w-48",
    z: 30,
  },
  {
    label: "Self Portrait",
    gradient: "from-sky-800 via-blue-900 to-teal-800",
    className: "left-[18.5rem] top-16 h-60 w-40 -rotate-1 sm:left-[26rem] sm:top-20 sm:h-64 sm:w-48",
    z: 40,
  },
  {
    label: "Comic Box",
    gradient: "from-yellow-300 via-amber-400 to-red-500",
    className: "left-[24rem] top-20 h-60 w-40 rotate-2 sm:left-[33rem] sm:top-24 sm:h-64 sm:w-48",
    z: 50,
  },
];

export default function EcommerceHero() {
  return (
    <section className="overflow-hidden px-6 py-16 lg:py-24">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
            E-Commerce
          </span>

          <h2 className="mt-5 text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl">
            Showcase, Sell,
            <br />
            <span className="text-red-800">&amp; acquire arts to</span>
            <br />
            our marketplace.
          </h2>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-zinc-500 sm:text-base">
            Dynamic community where artists and buyers seamlessly merge.
            ArtFusion brings together creators and enthusiasts to share
            creativity.
          </p>

          <div className="mt-8 flex items-center gap-3">
            <button className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
              Join for $9.99/m
            </button>
            <button className="rounded-full bg-zinc-100 px-6 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200">
              Read more
            </button>
          </div>
        </div>

        <div className="relative">
          <div className="absolute right-0 top-0 z-50 hidden flex-col gap-2 sm:flex">
            <button
              aria-label="Previous"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 shadow-md transition-colors hover:bg-zinc-50"
            >
              <ChevronUp size={16} />
            </button>
            <button
              aria-label="Next"
              className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-zinc-500 shadow-md transition-colors hover:bg-zinc-50"
            >
              <ChevronDown size={16} />
            </button>
          </div>

          <div className="absolute -left-2 -top-6 z-40 flex items-center gap-1.5 rounded-full bg-red-800 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:left-32 sm:-top-4">
            @howard
          </div>
          <div className="absolute left-[15rem] top-24 z-40 flex items-center gap-1.5 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:left-[21rem] sm:top-16">
            @robin
          </div>

          <div className="relative h-72 w-full sm:h-80">
            {STACK.map((card) => (
              <PlaceholderImage
                key={card.label}
                label={card.label}
                gradient={card.gradient}
                className={`absolute rounded-2xl border-4 border-white shadow-xl ${card.className}`}
                style={{ zIndex: card.z }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
