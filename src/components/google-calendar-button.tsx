"use client";

import { Button } from "@/components/ui/button";

export function GoogleCalendarButton() {
  const handleConnect = () => {
    window.location.href = "/api/auth/google";
  };

  return <Button onClick={handleConnect}>Connect Google Calendar</Button>;
}
