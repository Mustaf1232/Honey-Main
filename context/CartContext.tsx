"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createCart, getCart } from "@/lib/cart";
import {
  addItemToCart,
  clear_cart,
  removeItemFromCart,
  set_shipping,
} from "@/app/cart/actions";
import type { Cart } from "@/lib/cart";

export type CartContextType = {
  cart_data: Cart | null | undefined;
  cart_loading: boolean;
  cart_error: boolean;
  add_to_cart: (variables: {
    product_sale_price: string;
    product_name: string;
    product_picture_url: string;
    product_id: string;
    quantity: number;
    price: string;
    currency: string;
    shipping: string | null;
  }, options?: { onSuccess?: () => void; onError?: (error: Error) => void }) => void;
  add_to_cart_loading: boolean;
  add_to_cart_error: boolean;
  clear_cart_contents: (variables: { cart_key: string }) => void;
  clear_cart_loading: boolean;
  clear_cart_error: boolean;
  remove_item_from_cart: (variables: {
    product_id: string;
    cart_key: string;
  }) => void;
  remove_item_from_cart_loading: boolean;
  remove_item_from_cart_error: boolean;
  shipping_data: (variables: { shipping: string }) => void;
  shipping_loading: boolean;
  shipping_error: boolean;
};
const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const query_client = useQueryClient();
  const [cart_key, set_cart_key] = useState<string | null>(null);
  // if there is no cart key in local storage create a new cart
  useEffect(() => {
    const local_cart_key = localStorage.getItem("cart_key");
    if (local_cart_key === null || local_cart_key === undefined) {
      createCart().then((response) => {
        if (response !== null) {
          localStorage.setItem("cart_key", response.id);
          set_cart_key(response.id);
        }
      });
    } else {
      set_cart_key(local_cart_key);
    }
  }, []);
  const get_or_create_cart = async () => {
    const local_cart = localStorage.getItem("cart_key");
    if (local_cart !== null || local_cart !== undefined) {
      set_cart_key(local_cart!);
      return await getCart(local_cart!);
    } else {
      const new_cart = await createCart();
      localStorage.setItem("cart_key", new_cart!.id);
      return new_cart;
    }
  };
  // if there is a cart key in local storage get cart from redis
  const {
    data: cart_data,
    isLoading: cart_loading,
    isError: cart_error,
  } = useQuery<Cart | null>({
    queryKey: ["cart", cart_key],
    queryFn: () => get_or_create_cart(),
    enabled: cart_key !== null,
  });
  const {
    mutate: shipping_data,
    isPending: shipping_loading,
    isError: shipping_error,
  } = useMutation({
    mutationKey: ["shipping", cart_key],
    mutationFn: async ({ shipping }: { shipping: string }) => {
      if (cart_key !== null) {
        await set_shipping({ shipping, cart_key });
      }
    },
    onSuccess: () => {
      if (cart_key) {
        query_client.invalidateQueries({ queryKey: ["cart", cart_key] });
      }
    },
    onError: (error) => {
      console.error("shipping_error", error);
    },
  });

  // Mutation to add an item to the cart
  const {
    mutate: add_to_cart,
    isPending: add_to_cart_loading,
    isError: add_to_cart_error,
  } = useMutation({
    mutationKey: ["add_to_cart", cart_key],
    mutationFn: async ({
      product_sale_price,
      product_name,
      product_picture_url,
      product_id,
      quantity,
      price,
      currency,
      shipping,
    }: {
      product_sale_price: string;
      product_name: string;
      product_picture_url: string;
      product_id: string;
      quantity: number;
      price: string;
      currency: string;
      shipping: string | null;
    }) =>
      await addItemToCart({
        product_sale_price,
        product_name,
        product_picture_url,
        product_id,
        quantity,
        price,
        cart_key: cart_key! as string,
        currency,
        shipping: shipping,
      }),
    onError: (error) => {
      console.error("add_to_cart_error", error);
    },
    onSuccess: () => {
      if (cart_key) {
        query_client.invalidateQueries({ queryKey: ["cart", cart_key] });
      }
    },
  });
  const {
    mutate: clear_cart_contents,
    isPending: clear_cart_loading,
    isError: clear_cart_error,
  } = useMutation({
    mutationKey: ["clear_cart", cart_key],
    mutationFn: async ({ cart_key }: { cart_key: string }) => {
      await clear_cart({ cart_key });
    },
    onError: (error) => {
      console.error("clear_cart_error", error);
    },
    onSuccess: () => {
      if (cart_key) {
        query_client.invalidateQueries({ queryKey: ["cart", cart_key] });
      }
    },
  });

  const {
    mutate: remove_item_from_cart,
    isPending: remove_item_from_cart_loading,
    isError: remove_item_from_cart_error,
  } = useMutation({
    mutationKey: ["remove_item_from_cart", cart_key],
    mutationFn: async ({
      product_id,
      cart_key,
    }: {
      product_id: string;
      cart_key: string;
    }) => {
      await removeItemFromCart({ product_id, cart_key });
    },
    onError: (error) => {
      console.error("remove_item_from_cart", error);
    },
    onSuccess: () => {
      if (cart_key) {
        
        query_client.invalidateQueries({ queryKey: ["cart", cart_key] });
      }
    },
  });

  const value = {
    cart_data,
    cart_loading,
    cart_error,
    add_to_cart,
    add_to_cart_loading,
    add_to_cart_error,
    clear_cart_contents,
    clear_cart_loading,
    clear_cart_error,
    remove_item_from_cart,
    remove_item_from_cart_error,
    remove_item_from_cart_loading,
    shipping_data,
    shipping_loading,
    shipping_error,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === null) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
