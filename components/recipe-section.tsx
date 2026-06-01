"use client";
import type { Children } from "./rich-text/serialize";
import RichText from "@/components/rich-text";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

const RecipeSection = ({ recipe_paragraph }: { recipe_paragraph: Children }) => {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section className="w-full bg-background py-24 px-4 relative">
      <div className="absolute inset-0 background-noise-transparent opacity-40 pointer-events-none" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className="h-px flex-1 max-w-[80px] bg-red-900/15" />
          <span className="w-2 h-2 rounded-full bg-red-800/40" />
          <span className="h-px flex-1 max-w-[80px] bg-red-900/15" />
        </div>

        <RichText
          content={recipe_paragraph}
          className="text-center
            [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-extrabold [&_h1]:text-gray-900 [&_h1]:mb-4
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-800 [&_h2]:mb-3
            [&_p]:text-gray-500 [&_p]:leading-relaxed [&_p]:text-base [&_p]:md:text-lg [&_p]:mt-3
            [&_strong]:text-red-900"
        />

        <div className="flex items-center justify-center gap-4 mt-10">
          <span className="h-px flex-1 max-w-[80px] bg-red-900/15" />
          <span className="w-2 h-2 rounded-full bg-red-800/40" />
          <span className="h-px flex-1 max-w-[80px] bg-red-900/15" />
        </div>
      </motion.div>
    </section>
  );
};

export default RecipeSection;
