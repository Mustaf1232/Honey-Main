"use client";

import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/lib/cart";
import type { Cart } from "@/lib/cart";
import Link from "next/link";
import Image from "next/image";
import { useUserContext } from "@/context/UserContext";
import LoadingSpinner from "@/components/loading-spinner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const Cart = () => {
  const {
    cart_data,
    cart_loading,
    cart_error,
    remove_item_from_cart,
    remove_item_from_cart_loading,
  } = useCart();

  const cart_items = cart_data?.items;
  const cart_key = cart_data?.id;
  const cart_currency = cart_data?.currency;
  const items_count = cart_items?.length;

  const { user_orders } = useUserContext();
  // User has first order coupon if no previous orders
  const hasFirstOrderCoupon = user_orders?.docs?.length === 0;

  return (
    <Sheet>
      <SheetTrigger
        disabled={cart_items?.length === 0}
        className="active:ring-none focus:ring-none active:outline-none focus:outline-none"
      >
        <div className="flex items-center justify-center bg-background rounded-full p-3 relative border-2 border-red-800/20">
          {items_count !== undefined && items_count !== 0 && (
            <div className="absolute -top-1 -right-1 scale-50">
              <span className="relative h-4 w-4 flex items-center justify-center">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative rounded-full h-4 w-4 bg-red-600 opacity-80"></span>
              </span>
            </div>
          )}

          <CartIcon />
        </div>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto h-full ">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col justify-between">
          {cart_loading || cart_error ? (
            <div className="w-full h-full flex items-center justify-center">
              <LoadingSpinner />
            </div>
          ) : (
            <>
              <div className="pt-4">
                {cart_items?.map((item: CartItem) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-4 items-center bg-white p-1 rounded-lg px-2 relative mb-6"
                  >
                    <div
                      onMouseDown={() =>
                        remove_item_from_cart({
                          product_id: item.id,
                          cart_key: cart_key as string,
                        })
                      }
                      className={`absolute -top-2 -left-2 bg-red-300 rounded-full w-6 h-6 flex items-center justify-center cursor-pointer ${
                        remove_item_from_cart_loading &&
                        "opacity-20 animate-pulse cursor-not-allowed"
                      }`}
                    >
                      <CloseIcon />
                    </div>
                    <div className="flex items-center justify-between w-full">
                      {item.image && (
                        <Image
                          src={item.image}
                          width={50}
                          height={50}
                          alt="Cart product picture"
                        />
                      )}
                      <p className="text-md font-medium">{item.name}</p>
                    </div>
                    <div className="flex items-center justify-between w-full text-sm">
                      <div className="flex space-x-1 items-center ">
                        <p className="text-gray-600">Item price: </p>
                        <p className="font-medium">
                          {item.price}
                          {cart_currency}
                        </p>
                      </div>

                      <div className="flex space-x-1 items-center ">
                        <p className="text-gray-600">Quantity: </p>
                        <p className="font-medium">{item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 pt-14 h-full w-full font-medium text-center">
                <div className="w-full flex items-center justify-between border-b-2 border-red-800/20">
                  <p>Subtotal:</p>
                  <p>
                    {cart_data?.subtotal} {cart_data?.currency}
                  </p>
                </div>
                <div className="w-full flex items-center justify-between border-b-2 border-red-800/20">
                  <p>Shipping:</p>
                  <p>
                    {cart_data?.shipping} {cart_data?.currency}
                  </p>
                </div>

                {/* Show discount text only if discount > 0 and user eligible */}
                {cart_data?.discount !== undefined && cart_data?.discount > 0 && hasFirstOrderCoupon && (
                  <div className="w-full flex items-center justify-center text-green-700 font-semibold">
                    🎁 10% First Order Discount 🎁
                  </div>
                )}

                <div className="w-full flex items-center justify-between">
                  <p>Total:</p>
                  <p>
                    {cart_data?.total} {cart_data?.currency}
                  </p>
                </div>

                <Link
                  className="rounded-full bg-red-800 text-white font-medium text-center py-4 w-full"
                  href={"/checkout"}
                >
                  <SheetClose className="w-full flex items-center justify-center h-full">
                    Continue to Checkout
                  </SheetClose>
                </Link>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

const CartIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="8" cy="21" r="1" />
      <circle cx="19" cy="21" r="1" />
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
    </svg>
  );
};

export const CloseIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
};

export default Cart;
