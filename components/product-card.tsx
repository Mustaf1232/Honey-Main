import Image from "next/image";
import { Link } from "@/i18n/navigation";

export type ProductType = "default" | "heart" | "stomach";

const static_images: Record<string, string> = {
  default: "/product_default.png",
  heart: "/Heart.png",
  stomach: "/Belly.png",
};

const ProductCard = ({
  product_type,
  product_id,
  image_url,
  product_name,
}: {
  product_type: string;
  product_id: number;
  image_url?: string;
  product_name?: string;
}) => {
  const image_src = static_images[product_type] ?? "/product_default.png";

  const label =
    product_type === "default" ? "Standard"
    : product_type === "heart" ? "Heart"
    : product_type === "stomach" ? "Belly"
    : product_name ?? product_type;

  return (
    <Link href={`/product/${product_id}`} className="rounded-md flex flex-col">
      <div className="relative w-full flex flex-col items-center justify-start">
        <div className="flex items-center justify-center w-full">
          <p className="bg-background text-red-900 shadow-md px-4 py-2 text-sm rounded-lg font-semibold">
            {label}
          </p>
        </div>
        <Image
          src={image_src}
          width={400}
          height={400}
          alt="Product Image"
          className="object-cover z-10"
        />
      </div>
    </Link>
  );
};

export default ProductCard;
