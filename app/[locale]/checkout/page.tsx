"use server";

import CheckoutForm from "../../../components/checkout-form";

import { getTranslations } from "next-intl/server";
import { setRequestLocale } from "next-intl/server";

const Checkout = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  setRequestLocale(locale);
  const t = await getTranslations("Checkout");
  const translations = {
    page_title: t("page_title"),
    customer_info: t("customer_info"),
    first_name: t("first_name"),
    last_name: t("last_name"),
    country: t("country"),
    city: t("city"),
    address: t("address"),
    phone: t("phone"),
    email: t("email"),
    place_order: t("place_order"),
    order_summary: t("order_summary"),
    subtotal: t("subtotal"),
    shipping: t("shipping"),
    total: t("total"),
    customer_note: t("customer_note"),
  };

  return (
    <main>
      <CheckoutForm translations={translations} />
    </main>
  );
};
export default Checkout;
