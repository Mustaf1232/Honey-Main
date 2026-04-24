"use client";

import { useSetCountry } from "@/context/CountryContext";
import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Check } from "lucide-react";
// import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import LoadingSpinner from "./loading-spinner";
import Image from "next/image";

export type CountryListItem = {
  country: string;
  pricing: string;
};
export type CountryList = CountryListItem[];
export default function CountrySelector() {
  const { clear_cart_contents } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<CountryListItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [cart_key, set_cart_key] = useState<string | null>(null);
  const [loading_state, set_loading_state] = useState(false);
  const { set_country, set_country_name } = useSetCountry();
  // const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      set_cart_key(localStorage.getItem("cart_key"));
    }
  }, []);

  const on_select_country = () => {
    set_loading_state(true);
    set_country({ country: selectedCountry?.pricing as string });
    set_country_name({ country_name: selectedCountry?.country as string });
    clear_cart_contents({ cart_key: cart_key as string });
  };

  const filteredCountries = countryList.filter((country) =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`h-screen flex flex-col items-center justify-between bg-background/95 backdrop-blur-md absolute top-0 left-0 w-screen z-50 overflow-hidden`}
    >
      {/* Scattered product images */}
      <Image src="/Heart.png" alt="" width={220} height={220}
        className="absolute top-[8%] left-[-3%] rotate-[-15deg] opacity-80 drop-shadow-xl pointer-events-none hidden md:block" />
      <Image src="/Belly.png" alt="" width={200} height={200}
        className="absolute bottom-[12%] right-[-2%] rotate-[12deg] opacity-80 drop-shadow-xl pointer-events-none hidden md:block" />
      <Image src="/product_default.png" alt="" width={160} height={160}
        className="absolute top-[45%] right-[4%] rotate-[-8deg] opacity-70 drop-shadow-lg pointer-events-none hidden md:block" />
      {/* mobile - smaller, corners only */}
      <Image src="/Heart.png" alt="" width={110} height={110}
        className="absolute top-[5%] left-[-5%] rotate-[-12deg] opacity-60 drop-shadow-lg pointer-events-none md:hidden" />
      <Image src="/Belly.png" alt="" width={100} height={100}
        className="absolute bottom-[10%] right-[-4%] rotate-[10deg] opacity-60 drop-shadow-lg pointer-events-none md:hidden" />

      <Image src="/Bleta-02.png" alt="background" width={100} height={100} />
      <div className="w-full max-w-md px-4" ref={dropdownRef}>
        <h1 className="text-2xl font-bold text-center mb-6">
          Please select your country to continue to shop
        </h1>
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-2 text-left bg-white border border-red-800/20 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-red-900/20 focus:border-red-900/20"
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            {selectedCountry?.country || "Select country"}
            <ChevronDown className="absolute right-4 top-3 h-5 w-5 text-gray-400" />
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
              <input
                type="text"
                placeholder="Search country..."
                className="w-full px-4 py-2 border-b border-red-800/20 focus:outline-none focus:ring-1 focus:ring-red-800/20 focus:border-red-800/20 active:ring-red-800/20 rounded-t-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <ul className="max-h-60 overflow-auto" role="listbox">
                {filteredCountries.length === 0 ? (
                  <li className="px-4 py-2 text-gray-500">No country found.</li>
                ) : (
                  filteredCountries.map((country) => (
                    <li
                      key={country.country}
                      onClick={() => {
                        setSelectedCountry(country);
                        setIsOpen(false);
                        setSearchTerm("");
                      }}
                      className={`px-4 py-2 cursor-pointer hover:bg-red-100 flex justify-between items-center ${
                        selectedCountry?.country === country.country
                          ? "bg-red-50"
                          : ""
                      }`}
                      role="option"
                      aria-selected={
                        selectedCountry?.country === country.country
                      }
                    >
                      <span>{country.country}</span>

                      {selectedCountry?.country === country.country && (
                        <Check className="h-4 w-4 text-red-800" />
                      )}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
          <div className="flex items-center justify-center">
            {loading_state ? (
              <div className="mt-4">
                <LoadingSpinner />
              </div>
            ) : (
              <button
                onMouseDown={on_select_country}
                className={`rounded-full bg-red-900 opacity-0 text-white px-4 py-2 mt-4 mx-auto ${
                  selectedCountry && "opacity-100"
                } transition-opacity duration-500`}
              >
                Continue to website
              </button>
            )}
          </div>
        </div>
      </div>
      <Image src="/Bleta-01.png" alt="background" width={400} height={400} />
    </div>
  );
}

const countryList = [
  { country: "Andorra", pricing: "Europe" },
  { country: "Armenia", pricing: "Europe" },
  { country: "Austria", pricing: "Europe" },
  { country: "Azerbaijan", pricing: "Europe" },
  { country: "Belarus", pricing: "Europe" },
  { country: "Belgium", pricing: "Europe" },
  { country: "Bosnia and Herzegovina", pricing: "Bosnia" },
  { country: "Bulgaria", pricing: "Europe" },
  { country: "Canda", pricing: "America" },
  { country: "Croatia", pricing: "Europe" },
  { country: "Cyprus", pricing: "Europe" },
  { country: "Czech Republic", pricing: "Europe" },
  { country: "Denmark", pricing: "Europe" },
  { country: "Estonia", pricing: "Europe" },
  { country: "Finland", pricing: "Europe" },
  { country: "France", pricing: "Europe" },
  { country: "Georgia", pricing: "Europe" },
  { country: "Germany", pricing: "Europe" },
  { country: "Greece", pricing: "Europe" },
  { country: "Hungary", pricing: "Europe" },
  { country: "Iceland", pricing: "Europe" },
  { country: "Ireland", pricing: "Europe" },
  { country: "Italy", pricing: "Europe" },
  { country: "Latvia", pricing: "Europe" },
  { country: "Liechtenstein", pricing: "Europe" },
  { country: "Lithuania", pricing: "Europe" },
  { country: "Luxembourg", pricing: "Europe" },
  { country: "Macedonia", pricing: "Macedonia" },
  { country: "Malta", pricing: "Europe" },
  { country: "Moldova", pricing: "Europe" },
  { country: "Monaco", pricing: "Europe" },
  { country: "Montenegro", pricing: "Europe" },
  { country: "Netherlands", pricing: "Europe" },
  { country: "Norway", pricing: "Europe" },
  { country: "Poland", pricing: "Europe" },
  { country: "Portugal", pricing: "Europe" },
  { country: "Romania", pricing: "Europe" },
  { country: "Russia", pricing: "Europe" },
  { country: "San Marino", pricing: "Europe" },
  { country: "Serbia", pricing: "Serbia" },
  { country: "Slovakia", pricing: "Europe" },
  { country: "Slovenia", pricing: "Europe" },
  { country: "Spain", pricing: "Europe" },
  { country: "Sweden", pricing: "Europe" },
  { country: "Switzerland", pricing: "Europe" },
  { country: "Turkey", pricing: "Europe" },
  { country: "Ukraine", pricing: "Europe" },
  { country: "United Kingdom", pricing: "Europe" },
  { country: "United States", pricing: "America" },
  { country: "Vatican City", pricing: "Europe" },
  { country: "Åland Islands", pricing: "Europe" },
];
