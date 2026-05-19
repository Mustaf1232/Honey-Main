"use client";
import React, { createContext, useContext } from "react";

type CountryContextType = {
  country: string | null | undefined;
  country_loading: boolean;
  set_country: (variables: { country: string }) => void;
  set_country_loading: boolean;
  clear_country: () => void;
  clear_country_loading: boolean;
  country_name: string | null | undefined;
  country_name_loading: boolean;
  set_country_name: (variables: { country_name: string }) => void;
  set_country_name_loading: boolean;
  clear_country_name: () => void;
  clear_country_name_loading: boolean;
};
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  get_country_cookie,
  set_country_cookie,
  get_country_name_cookie,
  set_country_name_cookie,
  clear_country_name_cookie,
  clear_country_cookie,
} from "@/app/country/actions";
// 2. Initialize the context with a default value that matches CountryContextType
const CountryContext = createContext<CountryContextType | null>(null);

// 3. Define the CountryProvider component
export const CountryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Make sure to pass both country and set_country in the value
  const query_client = useQueryClient();
  const { data: country, isLoading: country_loading } = useQuery({
    queryKey: ["country"],
    queryFn: () => get_country_cookie(),
  });
  const { mutate: set_country, isPending: set_country_loading } = useMutation({
    mutationKey: ["set_country"],
    mutationFn: ({ country }: { country: string }) =>
      set_country_cookie(country),
    onError: (error) => {
      console.error("SET COUNTRY ERROR", error);
    },
    onSuccess: () => {
      query_client.invalidateQueries({ queryKey: ["country"] });
    },
  });
  const { mutate: clear_country, isPending: clear_country_loading } =
    useMutation({
      mutationKey: ["clear_country"],
      mutationFn: () => clear_country_cookie(),
      onError: (error) => {
        console.error("CLEAR COUNTRY ERROR", error);
      },
      onSuccess: () => {
        query_client.invalidateQueries({ queryKey: ["country"] });
      },
    });
  const { data: country_name, isLoading: country_name_loading } = useQuery({
    queryKey: ["country_name"],
    queryFn: () => get_country_name_cookie(),
  });
  const { mutate: set_country_name, isPending: set_country_name_loading } =
    useMutation({
      mutationKey: ["set_country_name"],
      mutationFn: ({ country_name }: { country_name: string }) =>
        set_country_name_cookie(country_name),
      onError: (error) => {
        console.error("SET COUNTRY NAME ERROR", error);
      },
      onSuccess: () => {
        query_client.invalidateQueries({ queryKey: ["country_name"] });
      },
    });
  const { mutate: clear_country_name, isPending: clear_country_name_loading } =
    useMutation({
      mutationKey: ["clear_country_name"],
      mutationFn: () => clear_country_name_cookie(),
      onError: (error) => {
        console.error("CLEAR COUNTRY NAME ERROR", error);
      },
      onSuccess: () => {
        query_client.invalidateQueries({ queryKey: ["country_name"] });
      },
    });
  const value = {
    country,
    country_loading,
    set_country,
    set_country_loading,
    clear_country,
    clear_country_loading,
    country_name,
    country_name_loading,
    set_country_name,
    set_country_name_loading,
    clear_country_name,
    clear_country_name_loading,
  };
  return (
    <CountryContext.Provider value={value}>{children}</CountryContext.Provider>
  );
};

// 4. Define the useSetCountry hook
export const useSetCountry = () => {
  const context = useContext(CountryContext);
  if (context === null) {
    throw new Error("useSetCountry must be used within a CountryProvider");
  }
  return context; // Now, you can access set_country here
};
