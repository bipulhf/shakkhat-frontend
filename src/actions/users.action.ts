"use server";

import { API_URL } from "@/lib/api";
import { cookies } from "next/headers";

export async function getAllUsers() {
  try {
    const response = await fetch(`${API_URL}/auth/users`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();
    return data.users;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}

export const getUserId = async () => {
  const c = await cookies();
  return c.get("userId")?.value;
};
