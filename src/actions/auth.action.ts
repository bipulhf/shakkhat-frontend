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
  first_name: string,
  last_name: string,
  email: string,
  password: string
) => {
  try {
    if (!first_name || !last_name || !email || !password) {
      throw new Error("All fields are required");
    }

    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ first_name, last_name, email, password }),
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
