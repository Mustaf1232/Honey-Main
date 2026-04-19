"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

export default function AddToCartWithCounter({
  initialCount = 1,
  buy_button_text,
  product_sale_price,
  product_name,
  product_picture_url,
  product_id,
  price,
  currency,
  shipping,
}: {
  initialCount?: number;
  buy_button_text: string;
  product_sale_price: string;
  product_name: string;
  product_picture_url: string;
  product_id: string;
  price: string;
  currency: string;
  shipping: string;
}) {
  const { add_to_cart } = useCart();

  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(0, prev - 1));

  const handleAddToCart = () => {
    add_to_cart({
      product_sale_price,
      product_name,
      product_picture_url,
      product_id: product_id,
      quantity: count,
      price: price,
      currency: currency,
      shipping: shipping,
    });
    setCount(1);
  };

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center border rounded-l-full">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-none rounded-l-full"
          onClick={decrement}
          aria-label="Decrease quantity"
          disabled={count === 0}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <span
          className="w-10 text-center text-sm font-semibold"
          aria-live="polite"
          aria-label="Current quantity"
        >
          {count}
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-none"
          onClick={increment}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <Button
        onClick={handleAddToCart}
        disabled={count === 0}
        className="h-9 rounded-l-none rounded-r-full bg-red-900"
      >
        <ShoppingCart className="mr-2 h-4 w-4" />
        {buy_button_text}
      </Button>
    </div>
  );
}
