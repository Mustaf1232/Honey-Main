import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|images|favicon.ico|favicon.png|honey.png|Baner1.jpeg|Baner1bg.png|turmeric.webp|stress-women.jpg|product_stomach.png|product_heart.png|product_default.png|Heart.png|Belly.png|pom.png|menopause.jpg|gymnema.png|griffonia.png|grape.png|frankincense.webp|belly-fat.jpg|Bleta-02.png|Bleta-01.png|not.jpg|pc.jpeg|Ipad.jpeg|Iphone.jpeg|bcg.jpeg|pc1.jpeg|Ipad1.jpeg|iphone1.jpeg|medza.jpg).*)",
  ],
};
