"use server";

import { API_URL } from "@/lib/api";
import { cookies } from "next/headers";

export async function sendNotificationId(token: string) {
  try {
    const c = await cookies();
    const response = await fetch(`${API_URL}/auth/nid`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        id: c.get("token")?.value,
        notificationId: token,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to PUT");
    }
    const data = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function getNotificationByUserId() {
  try {
    const c = await cookies();
    const response = await fetch(
      `${API_URL}/auth/nt/${c.get("userId")?.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to GET");
    }
    const data = await response.json();
    return data.notifications;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}
