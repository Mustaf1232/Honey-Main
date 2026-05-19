"use server";
import { cookies } from "next/headers";
import { redis_client } from "./redis";

export type CartItem = {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
  url: string;
  sale_price: string | null;
};

export type Cart = {
  id: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  tax: number;
  shipping: string | null;
  totalItems: number;
  discount: number;
  totalAfterDiscount: number;
  shippingMethod: string;
  paymentMethod: string;
  currency: string;
  coupon: string | null;
};
// function to create a cart if user is not logged in and doesn't have a cart key in local storage or cookie

export async function createCart(): Promise<Cart | null> {
  const cart_hash = crypto.randomUUID();
  const c_store = cookies();
  c_store.set("cart_key", cart_hash);
  const cart: Cart = {
    id: cart_hash,
    items: [],
    total: 0,
    subtotal: 0,
    tax: 0,
    shipping: "0",
    discount: 0,
    totalItems: 0,
    totalAfterDiscount: 0,
    shippingMethod: "",
    paymentMethod: "",
    currency: "",
    coupon: null,
  };
  try {
    await redis_client.set(cart_hash, JSON.stringify(cart));

    return {
      id: cart_hash,
      items: [],
      total: 0,
      subtotal: 0,
      tax: 0,
      shipping: "0",
      discount: 0,
      totalItems: 0,
      totalAfterDiscount: 0,
      shippingMethod: "",
      paymentMethod: "",
      currency: "",
      coupon: null,
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}
export async function getCart(cart_key: string): Promise<Cart | null> {
  try {
    const cart = await redis_client.get(cart_key);
    return JSON.parse(cart as string) as Cart;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function apply_coupon({
  coupon_code,
  cart_key,
}: {
  coupon_code: string;
  cart_key: string;
}) {
  const cart = await getCart(cart_key);
  const coupon = check_coupon_validity(coupon_code);

  console.log(cart);
  console.log(coupon);
}
export async function check_coupon_validity(coupon_code: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/coupons?where[coupon_code][equals]=${coupon_code}`
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error checking coupon validity", error);
    throw new Error("Error checking coupon validity");
  }
}
