"use client";
import Image from "next/image";

import { Button } from "./ui/button";
import Link from "next/link";
import RichText from "./rich-text";
import type { HomePageData } from "@/types";
import { useWindowSize } from "@/hooks/use-window-size";

import { motion } from "framer-motion";

export function HoneyShopLandingComponent({
  page_data,
  buy_button,
}: {
  page_data: HomePageData;
  buy_button: string;
}) {
const { width } = useWindowSize();
  const is_sm = width! < 768;
  console.log(page_data, buy_button);
  return (
    <div className="relative w-full h-[90vh] md:h-[88vh] overflow-hidden">
      <Image
        src="/Baner1.jpeg"
        fill
        alt="Banner"
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col items-center justify-end z-10 px-4 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <RichText
            content={page_data?.hero_title}
            className="text-white text-center drop-shadow-lg"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Link href="/product/4" className="z-40 relative">
            <Button className="rounded-full text-md px-8 py-6 min-w-[150px] z-30 uppercase font-semibold bg-white text-red-900 hover:bg-red-900 hover:text-white transition-all duration-500 shadow-lg">
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
