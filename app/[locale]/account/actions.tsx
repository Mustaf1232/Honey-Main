"use server";
import { cookies } from "next/headers";

type UserData = {
  user_name: string;
  user_last_name: string;
  user_phone_number: string;
  user_birthday: string;
  password: string;
  email: string;
  first_order: boolean;
};

// retrieve user token
export const get_user_token = async () => {
  return cookies().get("user_token")?.value ?? null;
};
// refresh user token - set cookie to new user token
export const refresh_user_token = async () => {
  const user_token = await get_user_token();
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
      },
    );
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error refreshing user token", error);
    throw new Error("Error refreshing user token");
  }
};
// user login
export async function user_login(email: string, password: string) {
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/login`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
    );
    const data = await req.json();
    // console.log("Login data", data.exp, new Date(data.exp), data);
    const exp = new Date(data.exp * 1000);
    cookies().set("user_token", data.token, {
      expires: exp,
    });
    cookies().set("user_data", JSON.stringify(data.user), {
      expires: exp,
    });

    return data;
  } catch (error) {
    console.error("Error logging in user", error);
    throw new Error("Error logging in user");
  }
}
// create user
export async function create_user(user_data: UserData) {
  const new_user_object = {
    user_name: user_data.user_name,
    user_last_name: user_data.user_last_name,
    user_phone_number: user_data.user_phone_number,
    user_birthday: user_data.user_birthday,
    password: user_data.password,
    user_role: "customer",
    email: user_data.email,
    first_order: true,
  };
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(new_user_object),
    });
    const data = await req.json();

    if (data?.message === "User successfully created." || data?.doc) {
      await user_login(user_data.email, user_data.password);
    }
    return data;
  } catch (error) {
    console.error("Error creating user", error);
    throw new Error("Something went wrong", error as undefined);
  }
}
// get me
export async function get_me() {
  const user_token = await get_user_token();
  try {
    const req = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/me`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user_token}`,
      },
    });
    const data = await req.json();
    return data?.user;
  } catch (error) {
    console.error("Error getting user", error);
    throw new Error("Error getting user");
  }
}
export async function user_signout() {
  const user_token = get_user_token();
  try {
    const req = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/logout`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
      },
    );
    const data = await req.json();

    cookies().delete("user_token");
    cookies().delete("user_data");
    return data;
  } catch (error) {
    console.error("Error signing out user", error);
    throw new Error("Error signing out user");
  }
}

// update user
export async function update_user(fields: {
  user_name?: string;
  user_last_name?: string;
  user_phone_number?: string;
  user_birthday?: string;
}) {
  const user_token = await get_user_token();
  const user_data = cookies().get("user_data")?.value;
  if (!user_token || !user_data) throw new Error("User not authenticated");
  const user = JSON.parse(user_data);
  const res = await fetch(`${process.env.NEXT_PUBLIC_CMS_URL}/api/users/${user.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user_token}`,
    },
    body: JSON.stringify(fields),
  });
  const data = await res.json();
  cookies().set("user_data", JSON.stringify({ ...user, ...fields }));
  return data;
}

// retrieve user orders
export const retrieve_user_orders = async () => {
  let user_id = null;
  let json_user_data = null;
  const user_data = cookies().get("user_data")?.value ?? null;
  if (user_data === null) {
    return null;
  }
  json_user_data = JSON.parse(user_data);
  user_id = json_user_data.id;
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/orders?where[customer][equals]=${user_id}`,
    );
    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error getting user orders", error);
    throw new Error("Error fetching user orders");
  }
};
export const set_first_order_false = async () => {
  try {
    const user_token = await get_user_token();
    const user_data = cookies().get("user_data")?.value;

    if (!user_token || !user_data) {
      throw new Error("User not authenticated");
    }

    const user = JSON.parse(user_data);
    const user_id = user.id;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_CMS_URL}/api/users/${user_id}`,
      {
        method: "PATCH", // or "PUT" depending on your CMS
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user_token}`,
        },
        body: JSON.stringify({
          first_order: false,
        }),
      }
    );

    const data = await res.json();

    // Optionally update the cookie as well
    cookies().set("user_data", JSON.stringify({ ...user, first_order: false }), {
      expires: new Date(user.exp * 1000),
    });

    return data;
  } catch (error) {
    console.error("Error setting first_order to false", error);
    throw new Error("Failed to update user first_order flag");
  }
};