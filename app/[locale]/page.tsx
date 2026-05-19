import HomePageClientWrapper from "@/components/home-page-client-wrapper";
// misc
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
// import Image from "next/image";
async function get_page_data({ locale }: { locale: string | undefined }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_CMS_URL +
        `/api/globals/home_page?locale=${locale}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
async function get_products({ locale }: { locale: string | undefined }) {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_CMS_URL + `/api/products?locale=${locale}`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
// async function get_testimonials({ locale }: { locale: string | undefined }) {
//   try {
//     const response = await fetch(
//       process.env.NEXT_PUBLIC_CMS_URL +
//         `/api/testimonials?locale=${locale}&draft=false`,
//     );
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }
export default async function Home() {
  const c_s = cookies();
  const locale = c_s.get("NEXT_LOCALE")?.value ?? undefined;
  const page_data = await get_page_data({ locale });
  const product_data = await get_products({ locale });
  const t = await getTranslations("Shared");
  // const testimonials = await get_testimonials({ locale });
  // extract data needed for components
  // Science section
  const science_section_title = page_data.third_section_title;
  const science_array = page_data.studies_array;
  // Presentation section
  const presentation_paragraph = page_data.presentation_paragraph;
  const presentation_products = page_data.presentation_products;
  // order button
  const order_button = t("order-button");
  // recipe section
  const recipe_paragraph = page_data.recipe_section_paragraph;
  // testimonial title
  

  return (
    <main className="min-h-screen w-full h-full mx-auto">
      <HomePageClientWrapper
        page_data={page_data}
        science_section_title={science_section_title}
        science_array={science_array}
        presentation_paragraph={presentation_paragraph}
        presentation_products={presentation_products}
        product_data={product_data}
        order_button={order_button}
        recipe_section_paragraph={recipe_paragraph}
        
        
      />
    </main>
  );
}
