"use client";
import Image from "next/image";

import { Button } from "./ui/button";
import Link from "next/link";
import RichText from "./rich-text";
import type { HomePageData } from "@/types";

import { motion } from "framer-motion";

export function HoneyShopLandingComponent({
  page_data,
  buy_button,
}: {
  page_data: HomePageData;
  buy_button: string;
}) {
console.log(page_data, buy_button);
  return (
    <div className="relative w-full overflow-hidden">
      <Image
        src="/Baner1.jpeg"
        width={1920}
        height={1080}
        alt="Banner"
        className="w-full h-auto -my-[6%]"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />

      <div className="absolute inset-0 flex flex-col justify-center z-10 px-10 md:px-24">
        {/* eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-3 mb-5"
        >
          <span className="h-px w-10 bg-red-400" />
          <span className="text-xs md:text-sm uppercase tracking-[0.35em] text-red-300 font-semibold">
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
            className="text-white [&_strong]:text-red-300 [&_*]:[text-shadow:_0_2px_16px_rgba(0,0,0,1)]"
          />
        </motion.div>

        {/* divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
          className="h-px w-24 bg-red-400/60 mb-8"
        />

        {/* button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/product/4">
            <Button className="rounded-full text-sm md:text-base px-9 py-5 uppercase font-bold bg-red-800 text-white hover:bg-white hover:text-red-900 transition-all duration-500 shadow-2xl tracking-widest border border-red-600 hover:border-red-900">
              {buy_button}
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

// export async function useAddToCart({
//   product_id,
//   quantity,
//   price,
// }: {
//   product_id: string;
//   quantity: number;
//   price: string;
// }) {
//   const query_client = useQueryClient();
// }
