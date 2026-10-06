import type { AllProducts, Product } from "@/types";

export const dynamic = "force-dynamic";

const BRAND = "Med za mršavljenje";
const LOCALE = "bs";
// ids of the feed-only test products start here, well away from the cms product ids
const TEST_ID_START = 9001;

const COUNTRIES = ["bosnia", "macedonia", "serbia", "europe", "america"] as const;
type Country = (typeof COUNTRIES)[number];

// same images the product page shows
const get_product_image = (product: Product): string => {
  if (product.product_type === "heart") return "/Heart.png";
  if (product.product_type === "stomach") return "/Belly.png";
  return "/product_default.png";
};

const get_country_price = (product: Product, country: Country) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pricing = (product as any)[`product_price_${country}`] ?? {};
  const currency = pricing.currency === "€" ? "EUR" : pricing.currency;
  return {
    standart_price: pricing[`${country}_standart_price`] as number | undefined,
    sale_price: pricing[`${country}_sale_price`] as number | null | undefined,
    currency: currency as string,
  };
};

const format_price = (price: number, currency: string) =>
  `${price.toFixed(2)} ${currency}`;

const get_description = (product: Product): string =>
  (product.product_description ?? [])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((node: any) =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (node.children ?? []).map((child: any) => child.text ?? "").join("")
    )
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

const to_csv_row = (values: string[]) =>
  values.map((value) => `"${value.replace(/"/g, '""')}"`).join(",");

export async function GET(request: Request) {
  const { origin, searchParams } = new URL(request.url);
  const requested_country = (searchParams.get("country") ?? "").toLowerCase();
  const country: Country = COUNTRIES.includes(requested_country as Country)
    ? (requested_country as Country)
    : "bosnia";

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_CMS_URL}/api/products?locale=${LOCALE}&limit=100`,
    { cache: "no-cache" }
  );
  if (!response.ok) {
    return new Response("Failed to fetch products", { status: 502 });
  }
  const products: AllProducts = await response.json();

  const rows = [
    to_csv_row([
      "id",
      "title",
      "description",
      "availability",
      "condition",
      "price",
      "sale_price",
      "link",
      "image_link",
      "brand",
    ]),
  ];

  const sorted_products = [...products.docs].sort((a, b) => a.id - b.id);
  // real products first, then one feed-only test copy of each (not shown on the website)
  for (const is_test of [false, true]) {
    for (let index = 0; index < sorted_products.length; index++) {
      const product = sorted_products[index];
      const pricing = get_country_price(product, country);
      if (pricing.standart_price == null || !pricing.currency) continue;
      rows.push(
        to_csv_row([
          is_test ? (TEST_ID_START + index).toString() : product.id.toString(),
          is_test ? `${product.product_name} (Test)` : product.product_name,
          get_description(product) || product.product_name,
          "in stock",
          "new",
          format_price(pricing.standart_price, pricing.currency),
          pricing.sale_price != null
            ? format_price(pricing.sale_price, pricing.currency)
            : "",
          `${origin}/${LOCALE}/product/${product.id}`,
          origin + get_product_image(product),
          BRAND,
        ])
      );
    }
  }

  return new Response(rows.join("\r\n") + "\r\n", {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'inline; filename="meta-feed.csv"',
    },
  });
}
