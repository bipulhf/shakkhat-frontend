"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useFirebaseNotifications } from "@/hooks/use-firebase-notification";
import { useEffect } from "react";
import { formatDistanceToNow } from "date-fns";

export function NotificationList({
  notifications,
}: {
  notifications: NotificationType[];
}) {
  const { token } = useFirebaseNotifications();
  console.log(token);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js", { scope: "./" })
        .then(async (registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
          await navigator.serviceWorker.ready;
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='outline' size='icon'>
          <Bell className='h-[1.2rem] w-[1.2rem]' />
          <span className='sr-only'>Toggle notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-80' align='end'>
        <DropdownMenuLabel className='text-lg font-bold'>
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className='h-[300px]'>
          {notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className='cursor-pointer hover:bg-gray-100'
            >
              <div className='flex flex-col space-y-1 p-2'>
                <p className='text-sm font-medium leading-none text-primary'>
                  {notification.title}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {notification.description}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {formatDistanceToNow(new Date(notification.createdAt))} ago
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
