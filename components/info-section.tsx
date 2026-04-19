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
type InfoSectionFaq = {
  id: string;
  question: string;
  answer: string;
};
type InfoSectionFaqs = InfoSectionFaq[];
const InfoSection = ({ page_data }: { page_data: HomePageData }) => {
  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  const info_section_faq = page_data.question_array;
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={inView && { opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      ref={ref}
      className="max-w-7xl mx-auto flex justify-center items-center flex-col space-y-4 py-4 pt-24"
    >
      <RichText
        content={page_data.second_section_title}
        className="text-center pb-14"
      />
      <HomePageFaq info_section_faq={info_section_faq} />
    </motion.div>
  );
};

export default InfoSection;

const HomePageFaq = ({
  info_section_faq,
}: {
  info_section_faq: InfoSectionFaqs;
}) => {
  return (
    <Accordion
      type="single"
      defaultValue="question-1"
      className="w-full p-8 bg-red-200/20 rounded-md"
    >
      {info_section_faq.map((faq) => (
        <AccordionItem key={faq.id} value={faq.id} className=" w-full py-2">
          <AccordionTrigger>
            <h2 className="text-2xl text-left">{faq.question}</h2>
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-lg ">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
