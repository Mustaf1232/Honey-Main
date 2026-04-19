"use server";
import type { OrderObjectType } from "@/types";
export async function place_order(props: OrderObjectType) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/orders`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(props),
      },
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error placing order", error);
    throw new Error("Error placing order");
  }
}
