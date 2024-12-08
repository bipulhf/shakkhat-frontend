"use server";

import { API_URL } from "@/lib/api";
import { cookies } from "next/headers";

export async function createSlot({
  title,
  description,
  startTime,
  endTime,
  startDate,
  endDate,
}: {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}) {
  try {
    const c = await cookies();
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    const response = await fetch(`${API_URL}/slot/create`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        title,
        description,
        startTime: startDateTime,
        endTime: endDateTime,
        startDate: startDateTime,
        endDate: endDateTime,
        userId: parseInt(c.get("userId")!.value),
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

export async function getSlotsByUserId() {
  try {
    const c = await cookies();
    const response = await fetch(
      `${API_URL}/slot/user/${c.get("userId")!.value}`
    );

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

export async function updateSlot({
  id,
  title,
  description,
  startTime,
  endTime,
  startDate,
  endDate,
}: {
  id: number;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
}) {
  try {
    const startDateTime = new Date(`${startDate}T${startTime}`);
    const endDateTime = new Date(`${endDate}T${endTime}`);

    const c = await cookies();

    const response = await fetch(`${API_URL}/slot/update`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify({
        id,
        title,
        description,
        startTime: startDateTime,
        endTime: endDateTime,
        startDate: startDateTime,
        endDate: endDateTime,
        userId: parseInt(c.get("userId")!.value),
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

export async function deleteSlot(id: number) {
  try {
    const response = await fetch(`${API_URL}/slot/delete`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
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
