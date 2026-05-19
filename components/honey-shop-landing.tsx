"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import RichText from "./rich-text";
import type { HomePageData, AllProducts } from "@/types";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { Tag, ChevronDown, ShoppingBag } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";

export function HoneyShopLandingComponent({
  page_data,
  buy_button,
  product_data,
}: {
  page_data: HomePageData;
  buy_button: string;
  product_data?: AllProducts;
}) {
  const t = useTranslations("Landing");
  const locale = useLocale();
  const { toast } = useToast();

  const handleSaleToast = () => {
    toast({
      title: t("sale-toast-title"),
      description: t("sale-toast-message"),
    });
  };

  return (
    <div className="relative w-full overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/medza.jpg" alt="Banner" className="w-full h-auto" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />

      <div className="absolute inset-0 flex flex-col justify-center z-10 px-10 md:px-24">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between lg:gap-20">

          {/* Left — main hero */}
          <div className="flex flex-col">
            {/* eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-5"
            >
              <span className="h-px w-10 bg-white/50" />
              <span className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/70 font-semibold">
                100% Prirodan
              </span>
            </motion.div>

            {/* title */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="max-w-xl mb-6 [&_h1]:text-4xl [&_h1]:md:text-6xl [&_h1]:font-extrabold [&_h1]:leading-[1.1] [&_h2]:text-xl [&_h2]:md:text-3xl [&_h2]:font-medium [&_h2]:text-white/80 [&_h2]:mt-3 [&_p]:text-sm [&_p]:md:text-base [&_p]:text-white/70 [&_p]:mt-4 [&_p]:leading-relaxed"
            >
              <RichText
                content={page_data?.hero_title}
                className="text-white [&_strong]:text-white [&_*]:[text-shadow:_0_2px_16px_rgba(0,0,0,1)]"
              />
            </motion.div>

            {/* divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              style={{ transformOrigin: "left" }}
              className="h-px w-24 bg-white/30 mb-8"
            />

            {/* buy button + sale dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-center gap-3 flex-wrap"
            >
              <Link href="/product/4">
                <Button className="rounded-full text-sm md:text-base px-9 py-5 uppercase font-bold bg-red-800 text-white hover:bg-white hover:text-red-900 transition-all duration-500 shadow-2xl tracking-widest border border-red-600 hover:border-red-900">
                  {buy_button}
                </Button>
              </Link>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    className="rounded-full text-sm md:text-base px-7 py-5 uppercase font-bold bg-yellow-400 text-red-900 hover:bg-yellow-300 transition-all duration-500 shadow-2xl tracking-widest border border-yellow-500"
                  >
                    <Tag className="mr-2 h-4 w-4" />
                    {t("sale-button")}
                    <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-72 p-0 rounded-2xl shadow-2xl border-0 overflow-hidden"
                  sideOffset={10}
                  align="start"
                >
                  {/* Header */}
                  <div className="bg-yellow-400 px-4 py-3">
                    <p className="font-bold text-red-900 text-sm uppercase tracking-wide">
                      {t("sale-toast-title")}
                    </p>
                    <p className="text-red-900/70 text-xs mt-0.5">
                      {t("sale-toast-message")}
                    </p>
                  </div>

                  {/* Product list */}
                  <div className="bg-white p-3 space-y-2">
                    {product_data?.docs?.map((product) => (
                      <PopoverClose asChild key={product.id}>
                        <Link
                          href={`/${locale}/product/${product.id}`}
                          onClick={handleSaleToast}
                        >
                          <div className="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-yellow-50 transition-colors cursor-pointer group border border-transparent hover:border-yellow-200">
                            <div className="flex items-center gap-2">
                              <ShoppingBag className="h-4 w-4 text-red-800 group-hover:text-red-900" />
                              <span className="text-sm font-semibold text-gray-800 group-hover:text-red-900">
                                {product.product_name}
                              </span>
                            </div>
                            <span className="text-xs font-bold bg-yellow-400 text-red-900 px-2 py-0.5 rounded-full">
                              -10%
                            </span>
                          </div>
                        </Link>
                      </PopoverClose>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          </div>

          {/* Right — ingredients (desktop only) */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hidden lg:flex flex-col max-w-sm border-l border-white/20 pl-12"
          >
            <span className="text-xs uppercase tracking-[0.35em] text-white/70 font-semibold mb-4">
              {t("our-ingredients")}
            </span>
            <h3 className="text-3xl font-bold text-white leading-snug mb-4" style={{ textShadow: "0 2px 16px rgba(0,0,0,1)" }}>
              {t("ingredients-title")}
            </h3>
            <p className="text-white/70 text-sm leading-relaxed mb-8">
              {t("ingredients-description")}
            </p>
            <Link href={`/${locale}/ingredients`}>
              <Button className="rounded-full text-sm px-8 py-4 uppercase font-bold bg-transparent text-white hover:bg-white hover:text-red-900 transition-all duration-500 shadow-xl tracking-widest border border-white/60 hover:border-white w-fit">
                {t("learn-more")}
              </Button>
            </Link>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
