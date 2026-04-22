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
    <div className="relative w-full h-screen max-h-[90vh] overflow-hidden">
      <Image
        src="/Baner1.jpeg"
        fill
        alt="Banner"
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/25 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center z-10 px-8 md:px-20 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-2"
        >
          <span className="inline-block text-xs md:text-sm uppercase tracking-[0.3em] text-red-300 font-semibold mb-3">
            100% Prirodan
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="[&_h1]:text-5xl [&_h1]:md:text-7xl [&_h1]:font-extrabold [&_h1]:leading-tight [&_h2]:text-2xl [&_h2]:md:text-4xl [&_h2]:font-semibold [&_h2]:mt-2 [&_p]:text-sm [&_p]:md:text-lg [&_p]:mt-3 [&_p]:text-white/90 mb-10"
        >
          <RichText
            content={page_data?.hero_title}
            className="text-white [&_strong]:text-red-300 [&_*]:[text-shadow:_0_2px_12px_rgba(0,0,0,0.9)]"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <Link href="/product/4">
            <Button className="rounded-full text-base px-10 py-6 uppercase font-bold bg-red-800 text-white hover:bg-white hover:text-red-900 transition-all duration-500 shadow-2xl tracking-widest border-2 border-red-600 hover:border-red-900">
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
