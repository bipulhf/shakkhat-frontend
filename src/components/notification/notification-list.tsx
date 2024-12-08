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

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    title: "New message",
    description: "You have a new message from John Doe",
    time: "2 min ago",
  },
  {
    id: "2",
    title: "Payment received",
    description: "You received a payment of $50",
    time: "1 hour ago",
  },
  {
    id: "3",
    title: "New follower",
    description: "Jane Smith started following you",
    time: "3 hours ago",
  },
  {
    id: "4",
    title: "Reminder",
    description: "Meeting with the team at 3 PM",
    time: "5 hours ago",
  },
  {
    id: "5",
    title: "System update",
    description: "Your system has been successfully updated",
    time: "1 day ago",
  },
];

export function NotificationList() {
  const { token } = useFirebaseNotifications();
  console.log(token);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );
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
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <ScrollArea className='h-[300px]'>
          {notifications.map((notification) => (
            <DropdownMenuItem key={notification.id} className='cursor-pointer'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {notification.title}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {notification.description}
                </p>
                <p className='text-xs text-muted-foreground'>
                  {notification.time}
                </p>
              </div>
            </DropdownMenuItem>
          ))}
        </ScrollArea>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
