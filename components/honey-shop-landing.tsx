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
    <div className="relative w-full">
      <Image
        src="/Baner1.jpeg"
        width={1920}
        height={1080}
        alt="Banner"
        className="w-full h-auto"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-center z-10 px-8 md:px-16 max-w-lg">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="[&_h1]:text-2xl [&_h1]:md:text-4xl [&_h1]:font-bold [&_h2]:text-lg [&_h2]:md:text-2xl [&_p]:text-xs [&_p]:md:text-sm [&_p]:mt-2 mb-6"
        >
          <RichText
            content={page_data?.hero_title}
            className="text-white [&_*]:drop-shadow-md"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/product/4">
            <Button className="rounded-full text-sm px-7 py-4 uppercase font-semibold bg-white text-red-900 hover:bg-red-900 hover:text-white transition-all duration-500 shadow-lg">
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
