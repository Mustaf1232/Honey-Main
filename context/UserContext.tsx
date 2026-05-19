"use client";

import React, { createContext, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { get_me, retrieve_user_orders } from "@/app/[locale]/account/actions";
import type { OrderObjectType } from "@/types";
type UserOrderResponse = {
  docs: OrderObjectType[];
  hasNextPage: boolean;
  hasPrevPage: boolean;
  limit: number;
  page: number;
};
export type UserType = {
  id: number;
  user_name: string;
  user_phone_number: string;
  user_role: string;
  email: string;
};
export type UserContextType = {
  user_data: UserType | null | undefined;
  user_data_loading: boolean;
  user_orders: UserOrderResponse | null;
  user_orders_loading: boolean;
  user_order_error: boolean;
};
const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  //   const queryClient = useQueryClient();

  const { data: user_data, isError: user_data_loading } = useQuery({
    queryKey: ["get_user"],
    queryFn: () => get_me(),
  });

  const {
    data: user_orders,
    isLoading: user_orders_loading,
    isError: user_order_error,
  } = useQuery({
    queryKey: ["user_orders"],
    queryFn: () => retrieve_user_orders(),
  });

  const value = {
    user_data: user_data,
    user_data_loading: user_data_loading,
    user_orders: user_orders,
    user_orders_loading: user_orders_loading,
    user_order_error: user_order_error,
  };
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === null) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
