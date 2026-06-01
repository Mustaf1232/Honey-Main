"use client";
import RichText from "@/components/rich-text";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "./ui/accordion";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import type { HomePageData } from "@/types";

type InfoSectionFaq = { id: string; question: string; answer: string };
type InfoSectionFaqs = InfoSectionFaq[];

const InfoSection = ({ page_data }: { page_data: HomePageData }) => {
  const { ref, inView } = useInView({ threshold: 0.15 });
  const info_section_faq = page_data.question_array;

  return (
    <section className="w-full bg-stone-50 py-24 px-4">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="max-w-3xl mx-auto"
      >
        {/* Section eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-5">
          <span className="h-px w-10 bg-red-800/30" />
          <span className="text-xs font-bold text-red-800 tracking-[0.2em] uppercase">
            FAQ
          </span>
          <span className="h-px w-10 bg-red-800/30" />
        </div>

        <RichText
          content={page_data.second_section_title}
          className="text-center mb-12
            [&_h1]:text-3xl [&_h1]:md:text-4xl [&_h1]:font-extrabold [&_h1]:text-gray-900
            [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-gray-900
            [&_p]:text-gray-500 [&_p]:mt-2"
        />

        <HomePageFaq info_section_faq={info_section_faq} />
      </motion.div>
    </section>
  );
};

export default InfoSection;

const HomePageFaq = ({ info_section_faq }: { info_section_faq: InfoSectionFaqs }) => {
  return (
    <Accordion type="single" defaultValue={info_section_faq[0]?.id} className="space-y-3">
      {info_section_faq.map((faq) => (
        <AccordionItem
          key={faq.id}
          value={faq.id}
          className="bg-white rounded-2xl border border-red-900/8 px-6 shadow-sm
            data-[state=open]:border-red-900/20 data-[state=open]:shadow-md
            transition-all duration-200"
        >
          <AccordionTrigger className="py-5 text-left hover:no-underline [&>svg]:text-red-800">
            <h2 className="text-base md:text-lg font-bold text-gray-800 pr-4 leading-snug">
              {faq.question}
            </h2>
          </AccordionTrigger>
          <AccordionContent className="pb-5">
            <p className="text-gray-600 leading-relaxed text-sm md:text-base">
              {faq.answer}
            </p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
