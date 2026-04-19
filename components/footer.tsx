import { Facebook, Instagram } from "lucide-react";
import type { Menu, MenuItem } from "@/types";
import Link from "next/link";
export default function Footer({ menu }: { menu: Menu }) {
  return (
    <footer className="bg-red-800 text-background py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0 md:w-1/3">
            <p className="text-sm">
              &copy; {new Date().getFullYear()} Med za mršavljenje. All rights
              reserved.
            </p>
          </div>
          <nav className="mb-4 md:mb-0 md:w-1/3">
            <ul className="flex space-x-4">
              {menu.menu_items.map((item: MenuItem) => {
                return (
                  <li key={item.id}>
                    <Link href={item.url}>
                      <p className="text-background hover:shadow-sm transition-colors">
                        {item.title}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="flex space-x-4 md:w-1/3 md:justify-end">
            <a
              href="#"
              className="text-backgroudn hover:shadow-sm transition-colors"
            >
              <Facebook size={20} />
              <span className="sr-only">Facebook</span>
            </a>

            <a
              href="#"
              className="text-background hover:shadow-sm transition-colors"
            >
              <Instagram size={20} />
              <span className="sr-only">Instagram</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
