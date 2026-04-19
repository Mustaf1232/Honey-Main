import Image from "next/image";
import { Link } from "@/i18n/navigation";
export type ProductType = "default" | "heart" | "stomach";
const ProductCard = ({
  product_type,
  product_id,
}: {
  product_type: ProductType;
  product_id: number;
}) => {
  const product_image_src = {
    default: "/product_default.png",
    heart: "/product_heart.png",
    stomach: "/product_stomach.png",
  };
  return (
    <Link href={`/product/${product_id}`} className="rounded-md flex flex-col ">
      <div className="relative w-full flex flex-col items-centers justify-start">
        <div className="flex items-center justify-center w-full ">
          {product_type === "default" && (
            <p className="bg-background text-red-900 shadow-md px-4 py-2 text-sm rounded-lg font-semibold">
              Standard
            </p>
          )}
          {product_type === "heart" && (
            <p className="bg-background text-red-900 shadow-md px-4 py-2 text-sm rounded-lg font-semibold">
              Heart
            </p>
          )}
          {product_type === "stomach" && (
            <p className="bg-background text-red-900 shadow-md px-4 py-2 text-sm rounded-lg font-semibold">
              Belly
            </p>
          )}
        </div>
        <Image
          src={product_image_src[product_type]}
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
