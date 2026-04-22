import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["bs", "en"],
  defaultLocale: "bs",
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|favicon.png|honey.png|Baner1bg.png|turmeric.webp|stress-women.jpg|product_stomach.png|product_heart.png|product_default.png|pom.png|menopause.jpg|gymnema.png|griffonia.png|grape.png|frankincense.webp|belly-fat.jpg|Bleta-02.png|Bleta-01.png|not.jpg).*)",
  ],
};
