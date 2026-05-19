export const dynamic = "force-dynamic";
import ProductPageComponent from "@/components/product-page";
import { routing } from "@/i18n/routing";
import type { Product } from "@/types";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
export async function generateStaticParams() {
  const languages = routing.locales;
  try {
    const paramsArray = await Promise.all(
      languages.map(async (language: "bs" | "en") => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_CMS_URL}/api/products?locale=${language}`,
          { cache: "no-cache" },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products" + response.statusText);
        }
        const product_data = await response.json();
        return product_data.docs.map((product: { id: number }) => {
          return {
            language: language,
            product_id: product.id,
          };
        });
      }),
    );
    return paramsArray.flat();
  } catch (error) {
    console.error("Error generatic static params:", error);
    return [];
  }
}

async function get_product(product_id: number, language: string) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/products/${product_id}?locale=${language}&draft=false&depth=3`,
    { cache: "no-cache" },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch product" + response.statusText);
  }
  const product_data = await response.json();
  return product_data;
}

export default async function Product({
  params: { id },
}: {
  params: { id: number };
}) {
  const c_s = cookies();
  const locale = c_s.get("NEXT_LOCALE")?.value ?? undefined;
  const product: Product = await get_product(id, locale as string);
  const all_products_data = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/products?locale=${locale}`,
  );
  const all_products = await all_products_data.json();
  const t = await getTranslations("Shared");
  const buy_button = t("order-button");
  return (
    <div className="bg-background">
      <ProductPageComponent
        product={product}
        all_products={all_products}
        buy_button={buy_button}
      />
    </div>
  );
}
