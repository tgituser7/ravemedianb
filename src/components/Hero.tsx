import PlaceholderImage from "./PlaceholderImage";

const CARDS = [
  {
    label: "Card 01",
    rotate: "-rotate-[20deg]",
    translate: "translate-y-[30px]",
    gradient: "from-red-900 via-zinc-900 to-black",
  },
  {
    label: "Card 02",
    rotate: "-rotate-[12deg]",
    translate: "translate-y-3",
    gradient: "from-blue-600 via-indigo-700 to-blue-900",
  },
  {
    label: "Card 03",
    rotate: "-rotate-[4deg]",
    translate: "translate-y-0",
    gradient: "from-amber-300 via-amber-400 to-orange-500",
  },
  {
    label: "Card 04",
    rotate: "rotate-[4deg]",
    translate: "translate-y-0",
    gradient: "from-orange-300 via-rose-300 to-sky-400",
  },
  {
    label: "Card 05",
    rotate: "rotate-[12deg]",
    translate: "translate-y-3",
    gradient: "from-red-600 via-red-700 to-rose-900",
  },
  {
    label: "Card 06",
    rotate: "rotate-[20deg]",
    translate: "translate-y-[30px]",
    gradient: "from-emerald-500 via-emerald-600 to-teal-800",
  },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden px-6 pb-20 pt-16 lg:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center"
      >
        <div className="h-[420px] w-[900px] rounded-full bg-gradient-to-b from-zinc-200/70 to-transparent blur-3xl" />
      </div>

      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-zinc-900 sm:text-5xl lg:text-[64px]">
          A place to display your masterpiece.
        </h1>
      </div>

      <div className="relative mx-auto mt-14 flex h-56 max-w-5xl items-start justify-center sm:h-72 lg:h-80">
        <div className="absolute left-[24%] top-6 z-30 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:top-10">
          @coplin
        </div>
        <div className="absolute right-[12%] top-0 z-30 flex items-center gap-1.5 rounded-full bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white shadow-lg sm:top-4">
          @andrea
        </div>

        <div className="flex items-start justify-center">
          {CARDS.map((card, i) => (
            <PlaceholderImage
              key={card.label}
              label={card.label}
              gradient={card.gradient}
              className={`relative h-40 w-28 flex-shrink-0 rounded-2xl border-[3px] border-white shadow-2xl sm:h-56 sm:w-40 lg:h-64 lg:w-44 ${card.rotate} ${card.translate} ${
                i === 0 ? "" : "-ml-8 sm:-ml-14 lg:-ml-16"
              }`}
              style={{ zIndex: i <= 2 ? i + 1 : 6 - i }}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto mt-10 max-w-lg text-center sm:mt-6">
        <p className="text-sm leading-relaxed text-zinc-500 sm:text-base">
          Artists can display their masterpieces, and buyers can discover and
          collect one-of-a-kind pieces with ease.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button className="rounded-full bg-zinc-700 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-800">
          Join for $9.99/m
        </button>
        <button className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900">
          Read more
        </button>
      </div>
    </section>
  );
}
