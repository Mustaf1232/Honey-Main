import ContactForm from "@/components/contact-form";

import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";
const get_contact_info = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/contact-info`,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error receiving contact info: ", error);
    return error;
  }
};
const ContactPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  setRequestLocale(locale);
  const t = await getTranslations("Contact");
  const translations = {
    contact_us: t("contact_us"),
    contact_paragraph: t("contact_paragraph"),
    first_name: t("name"),
    first_name_placeholder: t("name_placeholder"),
    email: t("email"),
    email_placeholder: t("email_placeholder"),
    message: t("message"),
    message_placeholder: t("message_placeholder"),
    send_message: t("send_message"),
    phone: t("phone"),
    phone_placeholder: t("phone_placeholder"),
    last_name: t("last_name"),
    last_name_placeholder: t("last_name_placeholder"),
  };
  const contact_info = await get_contact_info();

  return (
    <main className="">
      <ContactForm translations={translations} contact_info={contact_info} />
    </main>
  );
};
export default ContactPage;
