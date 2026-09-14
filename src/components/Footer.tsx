import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-100 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 sm:flex-row">
        <a href="#" className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-500 text-white">
            <Send size={13} strokeWidth={2.5} fill="white" />
          </span>
          <span className="text-sm font-semibold tracking-tight text-zinc-900">
            Pallet Ross
          </span>
        </a>
        <p className="text-xs text-zinc-400">
          © {new Date().getFullYear()} Pallet Ross. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
