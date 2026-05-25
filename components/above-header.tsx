"use client";

import { FacebookIcon, InstagramIcon } from "@/components/header";
import { LanguageSwitch } from "@/components/language-switch-combobox";
import { useSetCountry } from "@/context/CountryContext";
import { useRouter } from "next/navigation";
import type { ContactInfoType } from "@/types";
import Link from "next/link";
import { X } from "lucide-react";

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
    <div className="w-full border-b border-red-900/8 bg-white">
      <div className="max-w-7xl mx-auto px-5 py-1.5 flex items-center justify-between">

        {/* Social links */}
        <div className="flex items-center gap-3">
          <Link
            href={contact_info?.facebook ?? "#"}
            className="text-gray-400 hover:text-red-800 transition-colors"
            aria-label="Facebook"
          >
            <FacebookIcon />
          </Link>
          <Link
            href={contact_info?.instagram ?? "#"}
            className="text-gray-400 hover:text-red-800 transition-colors"
            aria-label="Instagram"
          >
            <InstagramIcon />
          </Link>
        </div>

        {/* Country + Language */}
        <div className="flex items-center gap-2">
          {country_name && (
            <button
              onClick={handle_change_country}
              className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-900 transition-colors px-2 py-1 rounded-full hover:bg-red-50"
            >
              {country_name}
              <X className="h-3 w-3" />
            </button>
          )}
          <LanguageSwitch locale={locale} />
        </div>
      </div>
    </div>
  );
};

export default AboveHeader;
