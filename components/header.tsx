"use client";

import { useState, useEffect } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import Cart from "./cart";
import type { Menu, MenuItem } from "@/types";
import { useWindowSize } from "@/hooks/use-window-size";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Header = ({ menu }: { menu: Menu }) => {
  const { width } = useWindowSize();
  const is_sm = width! < 768;
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_2px_24px_0_rgba(127,29,29,0.10)] border-b border-red-900/10"
          : "bg-white/85 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 py-2 flex items-center justify-between gap-4">

        {/* Brand logo */}
        <Link href="/" className="shrink-0">
          <Image
            src="/Medza1.png"
            alt="Medza logo"
            width={240}
            height={80}
            className="h-20 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        {!is_sm && (
          <nav className="flex items-center gap-1">
            {menu?.menu_items?.map((item: MenuItem) => {
              const active = pathname === item.url || pathname.startsWith(item.url + "/");
              return (
                <Link
                  key={item.id}
                  href={item.url}
                  className={`relative px-4 py-2 text-sm font-bold transition-colors duration-200 group rounded-full ${
                    active ? "text-red-900" : "text-gray-700 hover:text-red-900"
                  }`}
                >
                  {item.title}
                  <span
                    className={`absolute bottom-1 left-4 right-4 h-0.5 rounded-full bg-red-800 transition-transform duration-300 origin-left ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        )}

        {/* Right actions */}
        <div className="flex items-center gap-1 shrink-0">
          {is_sm && (
            <Sheet>
              <SheetTrigger
                className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-50 transition-colors"
                aria-label="Open menu"
              >
                <MenuIcon />
              </SheetTrigger>

              <SheetContent side="left" className="w-[280px] p-0 border-r border-red-900/10">
                {/* Drawer top — logo on red */}
                <div className="bg-gradient-to-br from-red-950 to-red-800 px-4 pt-10 pb-6">
                  <Image
                    src="/Medza1.png"
                    alt="Medza logo"
                    width={200}
                    height={66}
                    className="w-[55%] h-auto object-contain brightness-0 invert"
                  />
                  <p className="mt-3 text-xs text-white/60 font-medium tracking-widest uppercase">
                    100% Prirodan
                  </p>
                </div>

                {/* Nav links */}
                <nav className="flex flex-col gap-0.5 px-3 py-4">
                  {menu?.menu_items?.map((item: MenuItem) => (
                    <SheetClose key={item.id} asChild>
                      <Link
                        href={item.url}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-red-50 hover:text-red-900 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-red-800/40 group-hover:bg-red-800" />
                        {item.title}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>

                {/* Drawer footer */}
                <div className="absolute bottom-0 left-0 right-0 px-6 py-5 border-t border-red-900/8">
                  <p className="text-[11px] text-gray-400 text-center tracking-wide">
                    Med za mršavljenje
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          )}

          <UserIcon />
          <Cart />
        </div>
      </div>
    </header>
  );
};

export default Header;

export const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="17"
    height="17"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="16" y1="12" y2="12" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

const UserIcon = () => (
  <Link href="/account">
    <div className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-red-50 transition-colors">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-600"
      >
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </svg>
    </div>
  </Link>
);
