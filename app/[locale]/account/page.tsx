"use server";
import AccountPage from "@/components/account-page";
import AuthForm from "@/components/auth-form";
import { cookies } from "next/headers";
import { getTranslations } from "next-intl/server";
import { unstable_setRequestLocale } from "next-intl/server";
const AuthPage = async ({
  params: { locale },
}: {
  params: { locale: string };
}) => {
  const c_store = cookies();
  const user_token = c_store.get("user_token")?.value ?? null;
  const user_data = c_store.get("user_data")?.value ?? null;
  unstable_setRequestLocale(locale);
  const t = await getTranslations("Account");
  const translations = {
    login: t("login"),
    enter_credentials: t("enter_credentials"),
    email: t("email"),
    password: t("password"),
    logging_in: t("logging_in"),
    register_question: t("register_question"),
    register: t("register"),
    create_account: t("create_account"),
    first_name: t("first_name"),
    last_name: t("last_name"),
    phone_number: t("phone_number"),
    confirm_password: t("confirm_password"),
    have_account: t("have_account"),
    personal_information: t("personal_information"),
    update_info: t("update_info"),
    save_changes: t("save_changes"),
    sign_out: t("sign_out"),
    registering : t("registering"),
  };
  if (user_token !== null) {
    return <AccountPage user_data={user_data} translations={translations}/>;
  }
  return (
    <main>
      <AuthForm translations={translations} />
    </main>
  );
};
export default AuthPage;
