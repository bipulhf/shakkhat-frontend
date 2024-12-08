/* eslint-disable @typescript-eslint/no-explicit-any */

"use server";

import { API_URL } from "@/lib/api";
import { cookies } from "next/headers";

export const login = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const c = await cookies();

    const data = await response.json();

    console.log(data);
    c.set("token", data.token, {
      maxAge: 24 * 60 * 60,
    });

    c.set("userId", data.user.userId, {
      maxAge: 24 * 60 * 60,
    });
    return data;
  } catch (e: any) {
    return { error: e.message };
  }
};

export const register = async ({
  name,
  email,
  profession,
  timezone,
  password,
}: {
  name: string;
  email: string;
  profession: string;
  timezone: string;
  password: string;
}) => {
  try {
    if (!name || !email || !profession || !timezone || !password) {
      throw new Error("All fields are required");
    }

    const response = await fetch(`${API_URL}/auth/reg`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, profession, timezone }),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    const data = await response.json();
    return data;
  } catch (e: any) {
    return { error: e.message };
  }
};

export const isLoggedIn = async () => {
  return (await cookies()).get("token")?.value !== undefined;
};

export const logout = async () => {
  const c = await cookies();
  c.delete("token");
  c.delete("userId");
};
