import { Facebook, Instagram } from "lucide-react";
import type { Menu, MenuItem } from "@/types";
import Link from "next/link";

export default function Footer({ menu }: { menu: Menu }) {
  return (
    <footer className="w-full bg-red-950 text-white">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-10 border-b border-white/10">

          {/* Brand column */}
          <div>
            <p className="font-extrabold text-lg tracking-tight mb-3">
              Med za mršavljenje
            </p>
            <p className="text-white/45 text-sm leading-relaxed max-w-[220px]">
              100% prirodan med obogaćen ljekovitim biljem za zdravlje i vitalnost.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-[11px] font-bold text-white/35 tracking-[0.2em] uppercase mb-4">
              Navigacija
            </p>
            <nav className="flex flex-col gap-2.5">
              {menu?.menu_items?.map((item: MenuItem) => (
                <Link
                  key={item.id}
                  href={item.url}
                  className="text-white/60 hover:text-white text-sm font-medium transition-colors duration-200 w-fit"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </div>

          {/* Social */}
          <div>
            <p className="text-[11px] font-bold text-white/35 tracking-[0.2em] uppercase mb-4">
              Pratite nas
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook size={15} />
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/40 hover:bg-white/10 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Med za mršavljenje. Sva prava zadržana.
          </p>
          <p className="text-white/20 text-xs">
            100% Prirodan · Bez konzervansa
          </p>
        </div>
      </div>
    </footer>
  );
}
