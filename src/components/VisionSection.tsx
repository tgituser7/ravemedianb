import { Send, PenTool, Circle, Aperture, Flag, Layers, Sparkles } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

const GALLERY = [
  { label: "Staff Pick", gradient: "from-orange-400 to-amber-600" },
  { label: "Le Fleur", gradient: "from-lime-200 to-emerald-300" },
  { label: "The Green Knight", gradient: "from-yellow-400 to-amber-500" },
  { label: "Social Habits", gradient: "from-fuchsia-500 to-purple-700" },
  { label: "Glimmer", gradient: "from-orange-500 to-red-600" },
  { label: "Fluffy Worm", gradient: "from-sky-300 to-blue-500" },
];

const FLOATING_ICONS = [
  { Icon: PenTool, className: "left-2 top-0" },
  { Icon: Circle, className: "left-16 top-10" },
  { Icon: Aperture, className: "left-32 top-2" },
  { Icon: Flag, className: "left-48 top-10" },
  { Icon: Layers, className: "left-16 top-24" },
  { Icon: Sparkles, className: "left-40 top-24" },
];

export default function VisionSection() {
  return (
    <section className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-500 text-white">
            <Send size={14} strokeWidth={2.5} fill="white" />
          </span>

          <h2 className="mt-6 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
            Our vision
            <br />
            for any art technology.
          </h2>

          <p className="mt-5 max-w-md text-sm leading-relaxed text-zinc-500 sm:text-base">
            Every piece of art tells a story. Echoes of Expression allows
            artists to showcase their personal journeys through their work.
          </p>

          <button className="mt-5 text-sm font-medium text-zinc-900 underline underline-offset-4">
            Read more
          </button>

          <div className="relative mt-16 h-40 w-full max-w-xs">
            {FLOATING_ICONS.map(({ Icon, className }, i) => (
              <div
                key={i}
                className={`absolute flex h-14 w-14 items-center justify-center rounded-full border border-zinc-100 bg-white text-zinc-500 shadow-sm ${className}`}
              >
                <Icon size={18} />
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-zinc-100 bg-zinc-50 p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-1 rounded-full bg-white p-1 text-xs font-medium shadow-sm">
              <span className="rounded-full px-3 py-1.5 text-zinc-400">
                Business
              </span>
              <span className="rounded-full bg-zinc-900 px-3 py-1.5 text-white">
                Personal
              </span>
            </div>
            <button className="flex items-center gap-1 rounded-full bg-zinc-900 px-3 py-1.5 text-xs font-medium text-white">
              + Create
            </button>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {GALLERY.map((item) => (
              <PlaceholderImage
                key={item.label}
                label={item.label}
                gradient={item.gradient}
                className="aspect-[3/4] rounded-xl"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
