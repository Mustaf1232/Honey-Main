"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import type { Product, AllProducts } from "@/types";
import RichText from "./rich-text";
import AddToCartWithCounter from "./add-to-cart-button";
import { useSetCountry } from "@/context/CountryContext";

const get_country_price = (product: Product, country: string) => {
  let product_standart_price;
  let product_sale_price;
  let product_shipping;
  let currency;
  switch (country) {
    case "Bosnia":
      product_standart_price =
        product.product_price_bosnia.bosnia_standart_price;
      product_sale_price = product.product_price_bosnia.bosnia_sale_price;
      product_shipping = product.product_price_bosnia.bosnia_shipping_price;
      currency = product.product_price_bosnia.currency;
      break;
    case "Macedonia":
      product_standart_price =
        product.product_price_macedonia.macedonia_standart_price;
      product_sale_price = product.product_price_macedonia.macedonia_sale_price;
      product_shipping = null;
      currency = product.product_price_macedonia.currency;
      break;
    case "Serbia":
      product_standart_price =
        product.product_price_serbia.serbia_standart_price;
      product_sale_price = product.product_price_serbia.serbia_sale_price;
      product_shipping = null;
      currency = product.product_price_serbia.currency;
      break;
    case "Europe":
      product_standart_price =
        product.product_price_europe.europe_standart_price;
      product_sale_price = product.product_price_europe.europe_sale_price;
      product_shipping = null;
      currency = product.product_price_europe.currency;
      break;
    case "America":
      product_standart_price =
        product.product_price_america.america_standart_price;
      product_sale_price = product.product_price_america.america_sale_price;
      product_shipping = null;
      currency = product.product_price_america.currency;
      break;
  }
  return {
    product_standart_price,
    product_sale_price,
    product_shipping,
    currency,
  };
};
export default function ProductPageComponent({
  product,
  all_products,
  buy_button,
}: {
  product: Product;
  all_products: AllProducts;
  buy_button: string;
}) {
  const { country } = useSetCountry();

  const pricing = get_country_price(product, country as string);

  return (
    <div className="mx-auto max-w-7xl  px-4 py-8">
      <Card className="overflow-hidden shadow-none border-red-800/10">
        <div className="md:flex md:items-center md:justify-between">
          <div className="md:w-1/2">
            <Image
              src={
                product.product_type === "heart"
                  ? "/Heart.png"
                  : product.product_type === "stomach"
                  ? "/Belly.png"
                  : process.env.NEXT_PUBLIC_CMS_URL + product.product_image.url
              }
              alt="Product Image"
              width={400}
              height={400}
              className="w-full h-auto object-cover"
            />
          </div>
          <CardContent className="md:w-1/2 p-6 py-24">
            <h1 className="text-3xl font-bold mb-4">{product.product_name}</h1>
            {pricing.product_sale_price === null && (
              <div className="text-2xl font-bold mb-6">
                {pricing.product_standart_price} {pricing.currency}
              </div>
            )}
            {pricing.product_sale_price !== null && (
              <div className="flex items-center space-x-4 text-2xl font-bold mb-6">
                <p className="text-red-300 line-through text-xl">
                  {" "}
                  {pricing.product_standart_price} {pricing.currency}
                </p>
                <p>
                  {pricing.product_sale_price} {pricing.currency}
                </p>
              </div>
            )}
            <AddToCartWithCounter
              buy_button_text={buy_button}
              product_id={product.id.toString()}
              product_sale_price={pricing.product_sale_price?.toString() ?? ""}
              product_name={product.product_name}
              product_picture_url={
                process.env.NEXT_PUBLIC_CMS_URL + product.product_image.url
              }
              price={pricing.product_standart_price?.toString() ?? ""}
              currency={pricing.currency as string}
              shipping={pricing.product_shipping?.toString() ?? "0"}
            />
            <div className="pb-8" />
            <RichText content={product.product_description} />
            <CardFooter className="px-0"></CardFooter>
          </CardContent>
        </div>
      </Card>

      <RelatedProductCards
        products={all_products}
        current_product={product.id}
        buy_button={buy_button}
      />
    </div>
  );
}

const RelatedProductCards = ({
  products,
  current_product,
  buy_button,
}: {
  products: AllProducts;
  current_product: number;
  buy_button: string;
}) => {
  const { country } = useSetCountry();

  return (
    <div className="grid md:grid-cols-2 gap-6 pt-8">
      {products.docs.map((product: Product) => {
        const pricing = get_country_price(product, country as string);

        if (product.id === current_product) return null;
        const image_src =
          product.product_type === "heart"
            ? "/Heart.png"
            : product.product_type === "stomach"
            ? "/Belly.png"
            : (process.env.NEXT_PUBLIC_CMS_URL as string) + product.product_image.url;

        return (
          <Card key={product.id} className="shadow-none border-red-800/10">
            <CardContent className="p-4">
              <Link href={`/product/${product.id}`}>
                <Image
                  src={image_src}
                  alt={product.product_name}
                  width={400}
                  height={400}
                  className="w-full h-auto object-cover mb-4"
                />
                <h3 className="text-xl font-bold mb-2">{product.product_name}</h3>
                <RichText
                  className="line-clamp-3"
                  content={product.product_description}
                />
              </Link>
              {pricing.product_sale_price === null && (
                <div className="text-lg font-bold mb-4 mt-2">
                  {pricing.product_standart_price} {pricing.currency}
                </div>
              )}
              {pricing.product_sale_price !== null && (
                <div className="flex items-center space-x-4 text-lg font-bold mb-4 mt-2">
                  <p className="text-red-300 line-through text-md">
                    {pricing.product_standart_price} {pricing.currency}
                  </p>
                  <p>{pricing.product_sale_price} {pricing.currency}</p>
                </div>
              )}
              <AddToCartWithCounter
                buy_button_text={buy_button}
                product_id={product.id.toString()}
                product_sale_price={pricing.product_sale_price?.toString() ?? ""}
                product_name={product.product_name}
                product_picture_url={image_src}
                price={pricing.product_standart_price?.toString() ?? ""}
                currency={pricing.currency as string}
                shipping={pricing.product_shipping?.toString() ?? "0"}
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
