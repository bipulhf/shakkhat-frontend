"use server";

import { API_URL } from "@/lib/api";
import { cookies } from "next/headers";

export async function createMeeting({
  date,
  slotNo,
  description,
  hostId,
  guestIds,
}: {
  date: string;
  slotNo: number;
  description: string;
  hostId: number;
  guestIds: number[];
}) {
  try {
    const c = await cookies();
    const id = c.get("userId")?.value;
    guestIds.push(Number(id));
    const response = await fetch(`${API_URL}/meet/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        date,
        slotId: slotNo,
        description,
        hostId,
        guestIds,
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function getAllMeetings() {
  try {
    const response = await fetch(`${API_URL}/meet/allmeet`, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch data.");
    }
    const data = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}

export async function getMeetingByHostId() {
  try {
    const c = await cookies();
    const response = await fetch(
      `${API_URL}/meet/user/${c.get("userId")?.value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch meetings");
    }
    const data = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}
