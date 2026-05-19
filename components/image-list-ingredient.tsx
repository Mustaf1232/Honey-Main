"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface IngredientCardProps {
  name: string;
  picture: string;
}

export default function IngredientListItem({
  name,
  picture,
}: IngredientCardProps) {
  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden hover:shadow-sm transition-shadow duration-300 "
      whileHover={{ scale: 1.02 }}
    >
      <div className="relative h-48 w-full">
        <Image
          src={picture}
          alt={name}
          layout="fill"
          objectFit="contain"
          className="transition-opacity duration-300 ease-in-out group-hover:opacity-75"
        />
      </div>
      <div className="p-4 justify-center flex">
        <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
      </div>
    </motion.div>
  );
}
