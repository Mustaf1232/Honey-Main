"use client";
import Image from "next/image";
import RichText from "./rich-text";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Children } from "./rich-text/serialize";

export type Study = { id: string; study: string };
export type StudyArray = Study[];

const ScienceSection = ({ title, studies }: { title: Children; studies: StudyArray }) => {
  const { ref, inView } = useInView({ threshold: 0.15 });

  return (
    <section className="w-full bg-gradient-to-b from-red-950 via-red-900 to-red-950 py-24 px-4 relative overflow-hidden">
      {/* noise texture overlay — same as hero sections above */}
      <div className="absolute inset-0 background-noise-transparent opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="flex items-center justify-center gap-3 mb-5">
            <span className="h-px w-10 bg-white/20" />
            <span className="text-xs font-bold text-white/50 tracking-[0.2em] uppercase">Nauka</span>
            <span className="h-px w-10 bg-white/20" />
          </div>
          <RichText
            content={title}
            className="text-white
              [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-extrabold
              [&_h2]:text-2xl [&_h2]:font-bold
              [&_p]:text-white/60 [&_p]:mt-2
              [&_strong]:text-white"
          />
        </motion.div>

        <ScienceCardSection studies={studies} />
      </div>
    </section>
  );
};

export default ScienceSection;

const picture_array = ["/belly-fat.jpg", "/stress-women.jpg", "/menopause.jpg"];

const ScienceCard = ({ img_src, title, index }: { img_src: string; title: string; index: number }) => (
  <div className="relative w-full rounded-2xl overflow-hidden aspect-[4/5] group">
    <Image
      src={img_src}
      fill
      alt="Science study image"
      className="object-cover transition-transform duration-700 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <span className="text-xs font-bold text-white/40 tracking-widest uppercase mb-2 block">
        0{index + 1}
      </span>
      <p className="text-white font-semibold text-base leading-snug">{title}</p>
    </div>
  </div>
);

const ScienceCardSection = ({ studies }: { studies: StudyArray }) => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  return (
    <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {studies.map((study, index) => (
        <motion.div
          key={study.id}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.15 }}
        >
          <ScienceCard img_src={picture_array[index]} title={study.study} index={index} />
        </motion.div>
      ))}
    </div>
  );
};
