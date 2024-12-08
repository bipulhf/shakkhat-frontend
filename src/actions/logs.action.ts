"use server";

import { API_URL } from "@/lib/api";

export async function getAllLogs() {
  try {
    const response = await fetch(`${API_URL}/auth/history`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }
    const data = await response.json();
    return data.history;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}
