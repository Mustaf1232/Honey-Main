"use client";
import type { Children } from "./rich-text/serialize";
import RichText from "@/components/rich-text";
const RecipeSection = ({
  recipe_paragraph,
}: {
  recipe_paragraph: Children;
}) => {
  return (
    <section className="max-w-7xl mx-auto flex pt-14 px-4">
      <div className="w-full text-center">
        <RichText content={recipe_paragraph} className="text-center" />
      </div>
    </section>
  );
};
export default RecipeSection;
export type IngredientType = {
  id: string;
  name: string;
  image_src: string;
  ingredient_color: string;
};
// const IngredientGrid = () => {
//   const ingredients: IngredientType[] = [
//     {
//       id: "pom",
//       name: "Nar - Najljekovitije voće na svijetu",
//       image_src: "/pom.png",
//       ingredient_color: "bg-white",
//     },
//     {
//       id: "turmeric",
//       name: "Kurkuma - Ljekoviti začin koji zamjenjuje i kutiju lijekova",
//       image_src: "/turmeric.webp",
//       ingredient_color: "bg-white",
//     },
//     {
//       id: "gymnema",
//       name: "Gurmar - Rzarač šećera",
//       image_src: "/gymnema.png",
//       ingredient_color: "bg-white",
//     },
//     {
//       id: "frankincense",
//       name: "Tamjan",
//       image_src: "/frankincense.webp",
//       ingredient_color: "bg-white",
//     },
//     {
//       id: "griffonia",
//       name: "Griffonia",
//       image_src: "/griffonia.png",
//       ingredient_color: "bg-white",
//     },
//     {
//       id: "grape",
//       name: "Grape",
//       image_src: "/grape.png",
//       ingredient_color: "bg-white",
//     },
//   ];
//   return (
//     <div className="grid grid-cols-3 justify-items-center gap-4">
//       {ingredients.map((ingredient: IngredientType) => {
//         return (
//           <div
//             key={ingredient.id}
//             className={`w-full h-full  relative rounded-md space-x-4 flex items-center justify-center`}
//           >
//             <div className="w-32 h-32 relative">
//               <Image
//                 src={ingredient.image_src}
//                 alt={ingredient.name}
//                 fill
//                 className={`object-contain object-center rounded-full p-1 ${ingredient.ingredient_color} `}
//               />
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };
