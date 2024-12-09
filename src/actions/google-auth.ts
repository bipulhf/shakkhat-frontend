"use server";

import { createClient } from "@/utils/server";
import { google } from "googleapis";

export async function createCalendarEvent(eventData: {
  summary: string;
  description: string;
  start: string;
  end: string;
}) {
  const supabase = createClient();

  const {
    data: { session },
  } = await (await supabase).auth.getSession();

  if (!session) {
    throw new Error("Not authenticated");
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1/callback`
  );

  oauth2Client.setCredentials({
    access_token: session.provider_token,
    refresh_token: session.provider_refresh_token,
  });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    const event = await calendar.events.insert({
      calendarId: "primary",
      requestBody: {
        summary: eventData.summary,
        description: eventData.description,
        start: {
          dateTime: eventData.start,
          timeZone: "UTC",
        },
        end: {
          dateTime: eventData.end,
          timeZone: "UTC",
        },
      },
    });

    if (event.data.id) {
      await (await supabase).from("calendar_events").insert({
        id: event.data.id,
        user_id: session.user.id,
        summary: eventData.summary,
        start: eventData.start,
        end: eventData.end,
      });
    }

    return event.data;
  } catch (error) {
    console.error("Error creating calendar event:", error);
    throw error;
  }
}
