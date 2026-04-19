import createMiddleware from "next-intl/middleware";

// Edge Runtime does not have __dirname — polyfill it so any bundled code
// that references it doesn't throw a ReferenceError at runtime.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
if (typeof (globalThis as any).__dirname === "undefined") {
  (globalThis as any).__dirname = "/";
}

export default createMiddleware({
  locales: ["bs", "en"],
  defaultLocale: "bs",
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|favicon.png|honey.png|turmeric.webp|stress-women.jpg|product_stomach.png|product_heart.png|product_default.png|pom.png|menopause.jpg|gymnema.png|griffonia.png|grape.png|frankincense.webp|belly-fat.jpg|Bleta-02.png|Bleta-01.png|not.jpg).*)",
  ],
};
