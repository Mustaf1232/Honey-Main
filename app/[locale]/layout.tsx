import type { Metadata } from "next";
import "./globals.css";

//components
import Header from "@/components/header";
import Footer from "@/components/footer";
// translations
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
//react query
import ReactQueryClientProvider from "@/lib/query-provider";
// above header
import AboveHeader from "@/components/above-header";
// cart context
import { CartProvider } from "@/context/CartContext";
// country context
import { CountryProvider } from "@/context/CountryContext";
// user context
import { UserProvider } from "@/context/UserContext";
//fonts
import localFont from "next/font/local";
// toaster
import { Toaster } from "@/components/ui/toaster";
import { cookies } from "next/headers";
import CountrySelector from "@/components/country-selector";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
// export async function generateMetadata({
//   params: { locale },
// }: {
//   params: { locale: string };
// }) {
//   const t = await getTranslations({ locale, namespace: "Metadata" });
//   return {
//     title: t("title"),
//     description: t("description"),
//   };
// }
async function get_menu(locale: string) {
  const response = await fetch(
    process.env.NEXT_PUBLIC_CMS_URL + `/api/globals/menu?locale=${locale}`,
    { cache: "no-cache" }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch menu" + response.statusText);
  }
  const menu_data = await response.json();
  return menu_data;
}

export const metadata: Metadata = {
  title: "Med za mršavljenje",
  description: "Med za mršavljenje",
};
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
const get_contact_info = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/globals/contact-info`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error receiving contact info: ", error);
    return error;
  }
};
export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const contact_info = await get_contact_info();
  setRequestLocale(locale);
  const messages = await getMessages();
  const menu = await get_menu(locale);
  const c_s = cookies();
  const country = c_s.get("country")?.value ?? undefined;

  return (
    <html lang={locale}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryClientProvider>
          <UserProvider>
            <CountryProvider>
              <CartProvider>
                <NextIntlClientProvider messages={messages}>
                  {country === null || country === undefined ? (
                    <CountrySelector />
                  ) : (
                    <>
                      <AboveHeader
                        locale={locale}
                        contact_info={contact_info}
                      />
                      <Header menu={menu} />

                      {children}
                      <div className="h-24" />
                      <Footer menu={menu} />
                    </>
                  )}

                  <Toaster />
                </NextIntlClientProvider>
              </CartProvider>
            </CountryProvider>
          </UserProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
