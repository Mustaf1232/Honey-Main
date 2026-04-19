"use client";

import { useState } from "react";
import { useSetCountry } from "@/context/CountryContext";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";
import type { CheckoutTranslations } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueryClient } from "@tanstack/react-query";
import { place_order } from "@/app/[locale]/checkout/actions";
import type { OrderObjectType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { check_coupon_validity, type CartItem } from "@/lib/cart";
import { useUserContext } from "@/context/UserContext";
import { set_cart_discount } from "@/app/cart/actions";
import { set_first_order_false } from "@/app/[locale]/account/actions";
// Define the form schema
const formSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  address: z.string().min(5, "Address is required, minimum 5 characters"),
  phoneNumber: z.string().min(5, "Phone number is required"),
  email: z.string().email("Invalid email address"),
  customerNote: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function CheckoutForm({
  translations,
}: {
  translations: CheckoutTranslations;
}) {
  const { country_name } = useSetCountry();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { cart_data, clear_cart_contents } = useCart();
  const { toast } = useToast();
  const { user_data } = useUserContext();
  const [coupon_code, set_coupon_code] = useState("");
  const [coupon_error, set_coupon_error] = useState("");
  const queryClient = useQueryClient();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: country_name as string,
    },
  });

  const onSubmit = async (data: FormData) => {
    const d = new Date();

    const date = d.getDate() + "-" + (d.getMonth() + 1) + "-" + d.getFullYear();
    if (cart_data!.items.length === 0) {
      toast({
        title: "Error placing order",
        description: "Please add some items to cart",
        variant: "destructive",
      });
      return;
    }
    setIsSubmitting(true);
    const line_items_object = cart_data!.items.map((item: CartItem) => ({
      line_items: item.name.toString(),
      quantity: item.quantity,
    }));

    const order_object: OrderObjectType = {
      customer_name: `${data.firstName} ${data.lastName}`,
      customer: user_data?.id ?? null,
      order_total: `${cart_data!.total.toString()} ${cart_data!.currency.toString()}`,
      order_date: date,
      order_status: "processing",
      pageMeta: {
        customer_name: data.firstName,
        customer_last_name: data.lastName,
        customer_email: data.email,
        customer_phone_number: data.phoneNumber,
        customer_country: data.country,
        customer_city: data.city,
        customer_address: data.address,
        customer_note: data.customerNote as string | null,
      },
      orderMeta: {
        line_items: line_items_object,
      },
    };
    try {
      await place_order(order_object);
      setIsSuccess(true);
      clear_cart_contents({ cart_key: cart_data!.id });
      set_first_order_false();
      router.push("/thank-you");
      setIsSubmitting(false);
      reset();
    } catch (error) {
      console.error("Error placing order", error);
      setIsSubmitting(false);
      toast({
        title: "Error placing order",
        description: "Please try again later",
        variant: "destructive",
      });
    }
  };

  return (
    <div
      className={`container mx-auto p-4 ${
        isSubmitting ? "opacity-50 pointer-events-none" : ""
      } ${isSuccess ? "opacity-0" : ""} transition-all duration-500`}
    >
      <h1 className="text-4xl font-bold mb-6 text-center py-8">
        {translations.page_title}
      </h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="shadow-none border-red-800/10 order-last md:order-1">
          <CardHeader>
            <CardTitle>{translations.customer_info}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">{translations.first_name}</Label>
                  <Input id="firstName" {...register("firstName")} />
                  {errors.firstName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <Label htmlFor="lastName">{translations.last_name}</Label>
                  <Input id="lastName" {...register("lastName")} />
                  {errors.lastName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <Label htmlFor="country">{translations.country}</Label>
                <Input
                  id="country"
                  {...register("country")}
                  className="cursor-not-allowed"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.country.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="city">{translations.city}</Label>
                <Input id="city" {...register("city")} />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.city.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="address">{translations.address}</Label>
                <Input id="address" {...register("address")} />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="phoneNumber">{translations.phone}</Label>
                <Input id="phoneNumber" {...register("phoneNumber")} />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.phoneNumber.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="email">{translations.email}</Label>
                <Input id="email" type="email" {...register("email")} />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <Label htmlFor="customerNote">
                  {translations.customer_note || "Customer Note"}
                </Label>
                <Textarea id="customerNote" {...register("customerNote")} />
              </div>
              <Button
                type="submit"
                className="w-full rounded-full bg-red-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Placing Order..." : translations.place_order}
              </Button>
            </form>
          </CardContent>
        </Card>
        <Card className="shadow-none border-red-800/10 md:order-2">
          <CardHeader>
            <CardTitle>{translations.order_summary}</CardTitle>
          </CardHeader>
          <CardContent className="h-5/6">
            <div className="flex flex-col justify-between h-full">
              <div className="space-y-4">
                {cart_data?.items.map((item, index) => {
                  const item_total = item.sale_price
                    ? parseFloat(item.sale_price) * item.quantity
                    : parseFloat(item.price) * item.quantity;
                  return (
                    <div key={index} className="flex justify-between">
                      <span>
                        {item.name} x {item.quantity}
                      </span>
                      <span>
                        {item_total.toFixed(2)} {cart_data?.currency ?? ""}
                      </span>
                    </div>
                  );
                })}
                <div className="border-t pt-4">
                  <div className="flex justify-between">
                    <span>{translations.subtotal}</span>
                    <span>
                      {cart_data?.subtotal.toFixed(2)}{" "}
                      {cart_data?.currency ?? ""}
                    </span>
                  </div>
                  {cart_data?.discount !== 0 &&
                    cart_data?.subtotal !== undefined && (
                      <div className="flex justify-between">
                        <span>Discount</span>
                        <span>
                          {(cart_data!.subtotal * cart_data!.discount) / 100}{" "}
                          {cart_data?.currency ?? ""}
                        </span>
                      </div>
                    )}
                  <div className="flex justify-between">
                    <span>{translations.shipping}</span>
                    <span>
                      {cart_data?.shipping} {cart_data?.currency}
                    </span>
                  </div>
                  <div className="flex justify-between font-bold mt-4">
                    <span>{translations.total}</span>
                    <span>
                      {cart_data?.total.toFixed(2)} {cart_data?.currency}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 items-end  w-full">
                <div className="w-full">
                  <Label htmlFor="firstName">Coupon</Label>
                  <Input
                    onChange={(e) => {
                      set_coupon_error("");
                      set_coupon_code(e.target.value);
                    }}
                  />
                  {coupon_error !== "" && (
                    <p className="text-red-500 text-sm mt-1 absolute">
                      {coupon_error}
                    </p>
                  )}
                </div>
                <Button
                  onClick={async (e) => {
                    if (coupon_code === "") {
                      set_coupon_error("Coupon code cannot be empty");
                    }
                    const validity = await check_coupon_validity(coupon_code);
                    console.log(validity);
                    if (validity?.docs?.length === 0) {
                      set_coupon_error(
                        "Your coupon code is incorrect, please provide a correct coupon",
                      );
                    } else if (validity?.docs?.length > 0) {
                      e.preventDefault();
                      console.log("Applying coupon TODO", cart_data);
                      const value = validity.docs[0].coupon_value;

                      await set_cart_discount({
                        cart_id: cart_data!.id,
                        discount_amount: value,
                      });
                      queryClient.invalidateQueries({
                        queryKey: ["cart"],
                      });
                    }
                  }}
                  className="w-1/4 rounded-full bg-red-800"
                >
                  Apply
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
