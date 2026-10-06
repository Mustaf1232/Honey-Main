// helpers for sending meta pixel events, the base code is loaded in app/[locale]/layout.tsx

type MetaPixelItem = {
  id: string;
  quantity: number;
  price?: string | number | null;
};

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

// meta only accepts ISO currency codes, the cms stores euro prices as "€"
const get_currency_code = (currency?: string | null) =>
  currency === "€" ? "EUR" : currency || undefined;

export const track_meta_event = (
  event: "ViewContent" | "AddToCart" | "InitiateCheckout" | "Purchase",
  {
    items,
    value,
    currency,
  }: {
    items: MetaPixelItem[];
    value?: string | number | null;
    currency?: string | null;
  }
) => {
  if (typeof window === "undefined" || !window.fbq) return;
  const parsed_value = parseFloat(String(value ?? ""));
  const currency_code = get_currency_code(currency);
  window.fbq("track", event, {
    content_type: "product",
    // same ids as the product feed in app/meta-feed.csv
    content_ids: items.map((item) => item.id),
    contents: items.map((item) => ({ id: item.id, quantity: item.quantity })),
    num_items: items.reduce((sum, item) => sum + item.quantity, 0),
    ...(!isNaN(parsed_value) && currency_code
      ? { value: parsed_value, currency: currency_code }
      : {}),
  });
};
