import { Play, Eye } from "lucide-react";
import PlaceholderImage from "./PlaceholderImage";

export default function StorySection() {
  return (
    <section className="border-t border-zinc-100 px-6 py-20 lg:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-900">
          Your story{" "}
          <span className="text-violet-600">telling</span>
        </span>
        <h2 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-zinc-900 sm:text-4xl">
          Every piece of art tells a story
        </h2>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 sm:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm">
          <div className="relative">
            <PlaceholderImage
              label="Prada"
              gradient="from-zinc-800 via-zinc-900 to-black"
              className="aspect-[4/3]"
            />
            <span className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm">
              <Play size={12} fill="white" /> Play Video
            </span>
            <span className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white">
              @robin
            </span>
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-zinc-900">
              Connect, Create, Commerce
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Offering buyers a chance to own a piece of that narrative
              alongside a curated marketplace experience.
            </p>
            <button className="mt-4 rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50">
              How it works?
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-zinc-100 bg-white shadow-sm">
          <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-blue-600 to-indigo-700">
            <Eye size={72} strokeWidth={1.2} className="text-white/90" />
          </div>
          <div className="p-6">
            <h3 className="text-lg font-semibold text-zinc-900">
              Where Art Breathes Commerce
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500">
              Artistic spirit with commercial viability, providing a
              platform where creativity and business coexist.
            </p>
            <button className="mt-4 rounded-full border border-zinc-200 px-4 py-2 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-50">
              Read more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
