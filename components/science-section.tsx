"use client";
import Image from "next/image";
import RichText from "./rich-text";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import type { Children } from "./rich-text/serialize";
export type Study = {
  id: string;
  study: string;
};
export type StudyArray = Study[];
const ScienceSection = ({
  title,
  studies,
}: {
  title: Children;
  studies: StudyArray;
}) => {
  const { ref, inView } = useInView({
    threshold: 0.7,
  });
  return (
    <div className="max-w-7xl mx-auto flex  justify-center items-center  flex-col space-y-4 py-4 pt-14 ">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 10 }}
        animate={inView && { opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <RichText content={title} />
      </motion.div>
      <ScienceCardSection studies={studies} />
    </div>
  );
};

export default ScienceSection;

const ScienceCard = ({
  img_src,
  title,
}: {
  img_src: string;
  title: string;
}) => {
  return (
    <div className="bg-white rounded-md aspect-square relative w-full ">
      <Image
        src={img_src}
        fill
        alt="Belly Fat picture"
        className="object-cover rounded-md"
      />
      <div className="text-xl relative z-20  bg-gradient-to-br from-background via-background w-full h-full p-8 rounded-md">
        <p className="w-full ">{title}</p>
      </div>
    </div>
  );
};

const ScienceCardSection = ({ studies }: { studies: StudyArray }) => {
  const picture_array = [
    "/belly-fat.jpg",
    "/stress-women.jpg",
    "/menopause.jpg",
  ];
  const { ref, inView } = useInView({
    threshold: 0.5,
  });
  return (
    <div
      ref={ref}
      className="flex items-center space-x-2 md:flex-row flex-col px-2"
    >
      {studies.map((study: Study, index: number) => {
        return (
          <motion.div
            key={study.id}
            initial={{ opacity: 0, y: 10 }}
            animate={inView && { opacity: 1 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="w-full h-full"
          >
            <ScienceCard img_src={picture_array[index]} title={study.study} />
          </motion.div>
        );
      })}
    </div>
  );
};
