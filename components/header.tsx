"use client";
import { Link } from "@/i18n/navigation";
import Cart from "./cart";
import type { Menu, MenuItem } from "@/types";
import { useWindowSize } from "@/hooks/use-window-size";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
const Header = ({ menu }: { menu: Menu }) => {
  const { width } = useWindowSize();
  const is_sm = width! < 768;
  return (
    <header className="flex items-center justify-between  px-2 py-2 text-md sticky top-0 z-40 max-w-7xl mx-auto ">
      {!is_sm && (
        <div className="flex gap-x-6 items-center  px-4 py-2  font-medium rounded-full bg-background border-red-800/20 border-2">
          {menu.menu_items.map((item: MenuItem) => (
            <Link key={item.id} href={item.url}>
              <p>{item.title}</p>
            </Link>
          ))}
        </div>
      )}
      {is_sm && (
        <Sheet>
          <SheetTrigger className="rounded-full bg-background border-2 border-red-800/20 p-3">
            <MenuIcon />
          </SheetTrigger>
          <SheetContent
            className="overflow-y-auto h-full flex-col flex gap-4 text-lg"
            side="left"
          >
            {menu.menu_items.map((item: MenuItem) => (
              <Link key={item.id} href={item.url}>
                <SheetClose>
                  <p className="text-md font-medium">{item.title}</p>
                </SheetClose>
              </Link>
            ))}
          </SheetContent>
        </Sheet>
      )}
      <div className="flex items-center space-x-2">
        <UserIcon />
        <Cart />
      </div>
    </header>
  );
};
export default Header;

export const FacebookIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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
};
export const InstagramIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
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
};
const MenuIcon = () => {
  return (
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
};

const UserIcon = () => {
  return (
    <Link href="/account">
      <div className="flex items-center justify-center bg-background rounded-full p-3 relative border-2 border-red-800/20">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="8" r="5" />
          <path d="M20 21a8 8 0 0 0-16 0" />
        </svg>
      </div>
    </Link>
  );
};
