"use client";
import { FacebookIcon, InstagramIcon } from "@/components/header";
import { LanguageSwitch } from "@/components/language-switch-combobox";
import { useSetCountry } from "@/context/CountryContext";
import { useRouter } from "next/navigation";

import type { ContactInfoType } from "@/types";
import Link from "next/link";

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
    <div className="bg-white h-full w-full  overflow-x-hidden">
      {/* <Link href="/product/4">
        <div className="text-red-900 font-medium w-full text-center py-1 background-noise px-2">
          <p className="text-sm font-medium text-white">
            🎉 Black Friday Sale 🎉
          </p>
        </div>
      </Link> */}
      <div className="flex items-center justify-between max-w-7xl mx-auto px-2">
        <div className="flex space-x-4 items-center px-4 py-2 rounded-full">
          <Link href={contact_info.facebook}>
            <FacebookIcon />
          </Link>
          <Link href={contact_info.instagram}>
            <InstagramIcon />
          </Link>
        </div>

        <div className="flex space-x-4 items-center   rounded-full">
          <div className="flex space-x-4 items-center   rounded-full">
            <p
              onClick={() => handle_change_country()}
              className="text-xs cursor-pointer"
            >
              {country_name !== null ? country_name : ""}
            </p>
          </div>
          <LanguageSwitch locale={locale} />
        </div>
      </div>
    </div>
  );
};

export default AboveHeader;
