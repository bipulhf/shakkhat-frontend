/* eslint-disable @typescript-eslint/no-explicit-any */

import { API_URL } from "@/lib/api";

export const login = async (email: string, password: string) => {
  try {
    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const data = await response.json();
    return data;
  } catch (e: any) {
    return e.message;
  }
};

export const register = async (
  name: string,
  email: string,
  profession: string,
  timezone: string,
  password: string
) => {
  try {
    if (!name || !email || !profession || !timezone || !password) {
      throw new Error("All fields are required");
    }

    const response = await fetch(`${API_URL}/register`, {
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
    return e.message;
  }
};
