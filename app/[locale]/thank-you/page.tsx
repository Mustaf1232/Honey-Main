import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
const ThankYouPage = () => {
  return (
    <div className="h-screen flex flex-col  items-center justify-between bg-background absolute top-0 left-0 w-screen z-50">
      <Image src="/Bleta-02.png" alt="background" width={100} height={100} />
      <div className="w-full max-w-md px-4 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold text-center mb-6">
          Thank you for your order !
        </h1>
        <h2 className="text-center text-lg font-medium text-foreground">
          Your order has been placed successfully. <br />
          We will send you an email with your order details.
        </h2>
        <Link href="/">
          <Button variant="ghost" className="hover:bg-red-800/20 mt-14 ">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go back to homepage
          </Button>
        </Link>
      </div>
      <Image src="/Bleta-01.png" alt="background" width={400} height={400} />
    </div>
  );
};
export default ThankYouPage;
