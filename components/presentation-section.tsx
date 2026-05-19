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
      className="w-full bg-gradient-to-b from-red-950 via-red-900 to-background"
    >
      {/* Top decorative divider */}
      <div className="flex items-center justify-center pt-16 pb-2 gap-3">
        <span className="h-px w-16 bg-white/20" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
        <span className="h-px w-16 bg-white/20" />
      </div>

      {/* Main headline */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto px-6 py-12 text-center"
      >
        <RichText
          content={presentation_paragraph}
          className="text-white
            [&_h1]:text-3xl [&_h1]:md:text-5xl [&_h1]:lg:text-6xl
            [&_h1]:font-extrabold [&_h1]:leading-tight [&_h1]:tracking-tight
            [&_h1]:[text-shadow:_0_4px_32px_rgba(0,0,0,0.6)]
            [&_h2]:text-xl [&_h2]:md:text-2xl [&_h2]:font-semibold [&_h2]:text-white/80 [&_h2]:mt-4
            [&_p]:text-base [&_p]:md:text-lg [&_p]:text-white/65 [&_p]:leading-relaxed [&_p]:mt-4 [&_p]:max-w-2xl [&_p]:mx-auto
            [&_strong]:text-white"
        />
      </motion.div>

      {/* Middle decorative divider */}
      <div className="flex items-center justify-center pb-10 gap-3">
        <span className="h-px w-24 bg-white/15" />
        <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
        <span className="h-px w-24 bg-white/15" />
      </div>

      {/* Products subtitle */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="max-w-3xl mx-auto px-6 pb-12 text-center"
      >
        <RichText
          content={presentation_products}
          className="text-white
            [&_h2]:text-2xl [&_h2]:md:text-3xl [&_h2]:font-bold [&_h2]:tracking-tight
            [&_p]:text-white/60 [&_p]:mt-3 [&_p]:text-base
            [&_strong]:text-white"
        />
      </motion.div>

      {/* Product cards */}
      <div
        ref={prod_ref}
        className="flex justify-center items-stretch md:flex-row flex-col gap-6 md:gap-8 px-6 pb-20 max-w-6xl mx-auto"
      >
        {product_data.docs
          .sort((a, b) => (a.id < b.id ? -1 : 1))
          .map((product: Product, index: number) => (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={prod_in_view ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 * index }}
              key={product.id}
            >
              <ProductCard
                key={product.id}
                product_id={product.id}
                product_type={product.product_type as ProductType}
                image_url={
                  product.product_image?.url
                    ? (process.env.NEXT_PUBLIC_CMS_URL ?? "") + product.product_image.url
                    : undefined
                }
                product_name={product.product_name}
              />
            </motion.div>
          ))}
      </div>
    </div>
  );
};
export default PresentationSection;
