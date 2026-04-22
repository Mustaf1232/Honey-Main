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
    <div className="relative w-full max-h-[75vh] overflow-hidden">
      <Image
        src="/Baner1.jpeg"
        width={1920}
        height={1080}
        alt="Banner"
        className="w-full h-auto object-contain"
        priority
      />
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6 gap-5">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center [&_h1]:text-3xl [&_h1]:md:text-5xl [&_h2]:text-xl [&_h2]:md:text-3xl [&_p]:text-sm [&_p]:md:text-base bg-black/40 backdrop-blur-sm rounded-2xl px-6 py-4"
        >
          <RichText
            content={page_data?.hero_title}
            className="text-white text-center [&_*]:drop-shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/product/4">
            <Button className="rounded-full text-sm px-6 py-4 min-w-[130px] uppercase font-semibold bg-white text-red-900 hover:bg-red-900 hover:text-white transition-all duration-500 shadow-lg">
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
