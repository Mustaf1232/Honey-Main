"use server";

import { redis_client } from "@/lib/redis";
import { Cart, CartItem, getCart } from "@/lib/cart";
import { cookies } from "next/headers";
const c_s = cookies();
export async function get_cart_key() {
  const cart_key = c_s.get("cart_key");
  return cart_key ? cart_key : null;
}
export async function set_cart_key({ cart_key }: { cart_key: string }) {
  c_s.set("cart_key", cart_key);
  return cart_key;
}

export async function set_cart_discount({
  cart_id,
  discount_amount,
}: {
  cart_id: string;
  discount_amount: number;
}) {
  let first_order = false;
  const user_data_cookie = c_s.get("user_data");
  if (user_data_cookie) {
    const user_data = JSON.parse(user_data_cookie.value);
    first_order = !!user_data.first_order;
  }
  try {
    const cart = await getCart(cart_id);
    cart!.discount = discount_amount;
    const new_cart = calculate_cart_totals(
      cart!,
      cart!.items,
      cart!.shipping as string,
      first_order
    );

    const cart_response = await redis_client.set(
      cart_id,
      JSON.stringify(new_cart),
    );
    return JSON.parse(JSON.stringify(cart_response));
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function set_shipping({
  shipping,
  cart_key,
}: {
  shipping: string;
  cart_key: string;
}) {
  const cart = await getCart(cart_key);
  cart!.shipping = shipping;
  try {
    const cart_response = await redis_client.set(
      cart_key,
      JSON.stringify(cart),
    );

    return JSON.parse(JSON.stringify(cart_response));
  } catch (error) {
    console.error(error);
    return null;
  }
}
export async function clear_cart({ cart_key }: { cart_key: string }) {
  const new_cart: Cart = {
    id: cart_key,
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
    coupon: "",
  };
  try {
    const response = await redis_client.set(cart_key, JSON.stringify(new_cart));

    return JSON.parse(JSON.stringify(response));
  } catch (error) {
    console.error(error);
    return new Error("Error clearing cart");
  }
}



export async function addItemToCart({
  product_id,
  quantity,
  price,
  cart_key,
  product_name,
  product_picture_url,
  product_sale_price,
  currency,
  shipping,
}: {
  product_id: string;
  quantity: number;
  price: string;
  cart_key: string;
  product_name: string;
  product_picture_url: string;
  product_sale_price: string | null;
  currency: string;
  shipping: string | null;
}) {
  if (!cart_key) {
    return new Error("Cart key not found");
  }

  try {
    const cart: Cart | null = await getCart(cart_key);
    cart!.currency = currency;
    const line_items: CartItem[] = cart!.items;

    const existing_item = line_items.find((item) => item.id === product_id);
    if (existing_item) {
      existing_item.quantity += quantity;
    } else {
      const new_item: CartItem = {
        price,
        quantity,
        id: product_id,
        name: product_name,
        sale_price: product_sale_price,
        image: product_picture_url,
        url: "",
      };
      line_items.push(new_item);
    }

    // New discount logic based on first_order flag
    let first_order = false;
  const user_data_cookie = c_s.get("user_data");
  if (user_data_cookie) {
    const user_data = JSON.parse(user_data_cookie.value);
    first_order = !!user_data.first_order;
  }

    const new_cart = calculate_cart_totals(cart!, line_items, shipping as string , first_order);
    const cart_response = await redis_client.set(cart_key, JSON.stringify(new_cart));

    return JSON.parse(JSON.stringify(cart_response));
  } catch (error) {
    console.error("Error updating cart", error);
    return new Error("Error updating cart");
  }
}


// helper function to calculate cart totals
const calculate_cart_totals = (
  cart: Cart,
  line_items: CartItem[],
  shipping: string,
  first_order: boolean
): Cart => {
  cart.shipping = shipping;
  const subtotal = calculate_totals(line_items);
  cart.subtotal = subtotal;

  // Apply 5% discount if first_order is true, otherwise no discount
  cart.discount = first_order ? 10 : 0;

  const discount_amount = subtotal * (cart.discount / 100);

  cart.total =
    cart.shipping !== null
      ? subtotal + parseFloat(cart.shipping) - discount_amount
      : subtotal - discount_amount;

  cart.totalItems = line_items.reduce((sum, item) => sum + item.quantity, 0);

  return cart;
};

// helper function to calculate discount
export type coupon = {
  id: number;
  coupon_code: string;
  coupon_value: number;
  coupon_type: "percentage" | "flat_rate";
  usage: string[];
};

// Helper function to calculate the total amount
const calculate_totals = (line_items: CartItem[]): number => {
  return line_items.reduce((total, item) => {
    const item_price =
      item.sale_price && item.sale_price !== ""
        ? parseFloat(item.sale_price)
        : parseFloat(item.price);
    return total + item_price * item.quantity;
  }, 0);
};

// TODO HERE SET DISCUONT AND CALCULATE IT
// export async function calculate_cart_discount({
//   cart_key,
//   discount,
// }: {
//   cart_key: string;
//   discount: number;
// }) {
//   if (!cart_key) {
//     return new Error("Cart key not found");
//   }
//   try {
//     const cart : Cart = (await getCart(cart_key)) as Cart ;

//   }
// }
export async function removeItemFromCart({
  product_id,
  cart_key,
}: {
  product_id: string;
  cart_key: string;
}) {
  if (!cart_key) {
    return new Error("Cart key not found");
  }

  try {
    // Retrieve the existing cart
    const cart: Cart = (await getCart(cart_key)) as Cart;

    if (!cart || !cart.items) {
      console.error("Cart not found or empty");
      return new Error("Cart not found or empty");
    }

    const originalLength = cart.items.length;

    // Filter out the item to remove
    const updated_items: CartItem[] = cart.items.filter(
      (item) => item.id !== product_id
    );

    if (updated_items.length === originalLength) {
      console.warn(
        `No item was removed. Possible ID mismatch. product_id: ${product_id}`
      );
    } else {
      console.log(
        `Item removed. Updated items count: ${updated_items.length}`
      );
    }

    // ✅ FIX: Assign the filtered items back to the cart
    cart.items = updated_items;
       let first_order = false;
  const user_data_cookie = c_s.get("user_data");
  if (user_data_cookie) {
    const user_data = JSON.parse(user_data_cookie?.value);
    first_order = !!user_data.first_order;
  }
    // Recalculate totals after removal
    const new_cart = calculate_cart_totals(
      cart,
      cart.items,
      cart.shipping as string,
      first_order
    );

    // Save updated cart to Redis
    await redis_client.set(cart_key, JSON.stringify(new_cart));

    console.log("Updated cart saved:", new_cart);

    return new_cart;
  } catch (error) {
    console.error("Error removing item from cart", error);
    return new Error("Error removing item from cart");
  }
}

