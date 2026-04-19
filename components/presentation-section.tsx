"use client";
import ProductCard from "./product-card";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Children } from "./rich-text/serialize";
import type { Product, AllProducts } from "@/types";
import type { ProductType } from "./product-card";
import RichText from "./rich-text";
const PresentationSection = ({
  presentation_paragraph,
  presentation_products,
  product_data,
}: {
  presentation_paragraph: Children;
  presentation_products: Children;
  product_data: AllProducts;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const { ref: prod_ref, inView: prod_in_view } = useInView({
    threshold: 0.2,
  });
  return (
    <div
      ref={ref}
      className="w-full h-full p-8 bg-gradient-to-t from-background to-red-800 via-red-800 flex flex-col items-center mt-14"
    >
      <motion.div
        initial={{ opacity: 0, y: 0 }}
        animate={inView && { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className=" text-white max-w-7xl px-4 md:py-14 md:pb-24 py-8 rounded-lg"
      >
        <RichText
          content={presentation_paragraph}
          className="text-white text-center"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView && { opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <RichText
          content={presentation_products}
          className="pt-14 text-white pb-14 text-center"
        />
      </motion.div>
      <div
        ref={prod_ref}
        className="flex justify-evenly items-center md:flex-row flex-col"
      >
        {product_data.docs
          .sort((a, b) => (a.id < b.id ? -1 : 1))
          .map((product: Product, index: number) => {
            return (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={prod_in_view && { opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                key={product.id}
              >
                <ProductCard
                  key={product.id}
                  product_id={product.id}
                  product_type={product.product_type as ProductType}
                />
              </motion.div>
            );
          })}
      </div>
    </div>
  );
};
export default PresentationSection;
