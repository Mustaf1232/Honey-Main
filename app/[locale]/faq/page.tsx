import FaqComponent from "@/components/faq-component";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
const FaqPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  setRequestLocale(locale);
  const t = await getTranslations("Faq");
  const translations = {
    search_faqs: t("search_faqs"),
  };
  const get_faqs = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/faqs?locale=${locale}&draft=false&depth=1`,
        { cache: "no-cache" },
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("error :", error);
      return null;
    }
  };
  const faqs = await get_faqs();

  return (
    <main className="max-w-7xl mx-auto">
      <FaqComponent faqs={faqs} tranlsations={translations} />
    </main>
  );
};
export default FaqPage;
