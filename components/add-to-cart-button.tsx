"use client";

import { useState } from "react";
import { Plus, Minus, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useRouter } from "@/i18n/navigation";
import { useToast } from "@/hooks/use-toast";

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
  const { add_to_cart, cart_data } = useCart();
  const router = useRouter();
  const { toast } = useToast();

  const [count, setCount] = useState(initialCount);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => Math.max(1, prev - 1));

  const alreadyInCart = cart_data?.items?.some((item) => item.id === product_id) ?? false;

  const handleAddToCart = () => {
    add_to_cart(
      {
        product_sale_price,
        product_name,
        product_picture_url,
        product_id,
        quantity: count,
        price,
        currency,
        shipping,
      },
      {
        onSuccess: () => {
          toast({
            title: "Added to cart",
            description: `${product_name} (x${count}) has been added to your cart.`,
          });
          setCount(1);
        },
      },
    );
  };

  const handleBuyNow = () => {
    if (alreadyInCart) {
      router.push("/checkout");
      return;
    }
    add_to_cart(
      {
        product_sale_price,
        product_name,
        product_picture_url,
        product_id,
        quantity: count,
        price,
        currency,
        shipping,
      },
      { onSuccess: () => router.push("/checkout") },
    );
  };

  return (
    <div className="flex flex-col gap-3">
      {/* Quantity selector */}
      <div className="flex items-center border rounded-full w-fit">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-none rounded-l-full"
          onClick={decrement}
          aria-label="Decrease quantity"
          disabled={count <= 1}
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
          className="h-9 w-9 rounded-none rounded-r-full"
          onClick={increment}
          aria-label="Increase quantity"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        <Button
          onClick={handleAddToCart}
          disabled={count === 0}
          variant="outline"
          className="rounded-full border-red-900 text-red-900 hover:bg-red-900 hover:text-white"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>

        <Button
          onClick={handleBuyNow}
          disabled={count === 0}
          className="rounded-full bg-red-900 hover:bg-red-800 text-white"
        >
          <Zap className="mr-2 h-4 w-4" />
          {buy_button_text}
        </Button>
      </div>
    </div>
  );
}
