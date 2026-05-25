"use client";

import { FacebookIcon, InstagramIcon } from "@/components/header";
import { LanguageSwitch } from "@/components/language-switch-combobox";
import { useSetCountry } from "@/context/CountryContext";
import { useRouter } from "next/navigation";
import type { ContactInfoType } from "@/types";
import Link from "next/link";
import { MapPin, X } from "lucide-react";

const AboveHeader = ({
  locale,
  contact_info,
}: {
  locale: string;
  contact_info: ContactInfoType;
}) => {
  const { clear_country, clear_country_name, country_name } = useSetCountry();
  const router = useRouter();

  const handle_change_country = () => {
    clear_country();
    clear_country_name();
    router.refresh();
  };

  return (
    <div className="w-full bg-gradient-to-r from-red-950 via-red-900 to-red-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 flex items-center h-9">

        {/* Left — social icons (equal width to right side) */}
        <div className="flex items-center gap-1.5 w-1/3">
          <Link
            href={contact_info?.facebook ?? "#"}
            aria-label="Facebook"
            className="flex items-center justify-center w-6 h-6 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <FacebookIcon />
          </Link>
          <Link
            href={contact_info?.instagram ?? "#"}
            aria-label="Instagram"
            className="flex items-center justify-center w-6 h-6 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <InstagramIcon />
          </Link>
        </div>

        {/* Centre tagline */}
        <p className="hidden sm:block w-1/3 text-center text-[10px] font-semibold text-white/40 tracking-[0.25em] uppercase select-none whitespace-nowrap">
          100% Prirodan · Med za mršavljenje
        </p>

        {/* Right — Country + Language (equal width to left side) */}
        <div className="flex items-center justify-end gap-1.5 w-1/3">
          {country_name && (
            <button
              onClick={handle_change_country}
              className="flex items-center gap-1 text-[11px] font-medium text-white/70 hover:text-white transition-colors px-2 py-0.5 rounded-full hover:bg-white/10 border border-white/10 hover:border-white/20"
            >
              <MapPin className="h-2.5 w-2.5" />
              {country_name}
              <X className="h-2.5 w-2.5 opacity-60" />
            </button>
          )}
          <LanguageSwitch locale={locale} variant="dark" />
        </div>

      </div>
    </div>
  );
};

export default AboveHeader;
