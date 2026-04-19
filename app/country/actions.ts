"use server";
import { cookies } from "next/headers";
export async function set_country_cookie(country: string) {
  const cookie_store = cookies();
  cookie_store.set("country", country);
}
export async function set_country_name_cookie(country_name: string) {
  const cookie_store = cookies();
  cookie_store.set("country_name", country_name);
}
export async function get_country_name_cookie() {
  const cookie_store = cookies();
  const country_name = cookie_store.get("country_name");
  if (country_name === undefined) {
    return null;
  } else {
    return country_name.value;
  }
}

export async function get_country_cookie() {
  const cookie_store = cookies();
  const country = cookie_store.get("country");
  if (country === undefined) {
    return null;
  } else {
    return country.value;
  }
}
export async function clear_country_cookie() {
  const cookie_store = cookies();
  cookie_store.delete("country");
}
export async function clear_country_name_cookie() {
  const cookie_store = cookies();
  cookie_store.delete("country_name");
}
