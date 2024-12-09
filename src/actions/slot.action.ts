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
  recurring,
}: {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  startDate: string;
  endDate: string;
  recurring: boolean;
}) {
  try {
    const c = await cookies();
    if (recurring) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const dates = [];

      while (start <= end) {
        dates.push(new Date(start));
        start.setDate(start.getDate() + 1);
      }

      const promises = dates.map(async (date) => {
        const startDateTime = new Date(
          `${date.toISOString().split("T")[0]}T${startTime}`
        );
        const endDateTime = new Date(
          `${date.toISOString().split("T")[0]}T${endTime}`
        );

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
            recurring: true,
          }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message);
        }
      });

      await Promise.all(promises);
      return { message: "Slots created successfully" };
    }
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
      console.log(data);
      throw new Error(data.message);
    }
    const data = await response.json();
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
}

export const getSevenDaysSlots = async (input_date: Date) => {
  try {
    const c = await cookies();
    const d = input_date || new Date();
    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${
      d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()
    }`;
    const response = await fetch(
      `${API_URL}/slot/date/${date}/user/${c.get("userId")!.value}`
    );

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    return data.groupedSlots;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
};

export const slotPriority = async (id: number) => {
  try {
    console.log(id);
    const response = await fetch(`${API_URL}/ai/body/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message);
    }
    const data = await response.json();
    console.log(data);
    return data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return { error: e.message };
  }
};

export const slotSuggestions = async (text: string) => {
  try {
    const c = await cookies();
    const response = await fetch(`${API_URL}/ai/guest`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text, userId: c.get("userId")!.value }),
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
};
