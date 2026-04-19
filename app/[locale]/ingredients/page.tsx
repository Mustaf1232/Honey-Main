import IngredientListItem from "@/components/image-list-ingredient";
import { unstable_setRequestLocale } from "next-intl/server";
import type { Ingredient } from "@/types";

const IngredientPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  unstable_setRequestLocale(locale);
  const get_ingredients = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/ingredients?locale=${locale}&draft=false&depth=2`,
        { cache: "no-cache" },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error", error);
      return null;
    }
  };
  const ingredients = await get_ingredients();

  return (
    <main className="max-w-7xl mx-auto bg-background pt-14">
      <div className="grid grid-cols-2 md:grid-cols-3 w-full h-full gap-2">
        {ingredients.ingredients.map((ingredient: Ingredient) => {
          return (
            <IngredientListItem
              key={ingredient.id}
              name={ingredient.ingredient_name}
              picture={
                process.env.NEXT_PUBLIC_CMS_URL +
                ingredient.ingredient_picture.url
              }
            />
          );
        })}
      </div>
    </main>
  );
};
export default IngredientPage;
