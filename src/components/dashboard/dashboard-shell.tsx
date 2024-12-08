"use client";

import { CalendarDays, Bell, BarChart2, Search, TimerIcon } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Link from "next/link";

export function DashboardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className='flex h-screen'>
      <Sidebar className='basis-[30%]'>
        <SidebarHeader>
          <h2 className='px-6 text-lg font-semibold'>Dashboard</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/dashboard'>
                  <CalendarDays className='mr-2 h-4 w-4' />
                  Schedules
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/slot'>
                  <TimerIcon className='mr-2 h-4 w-4' />
                  Slot
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/notifications'>
                  <Bell className='mr-2 h-4 w-4' />
                  Notifications
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/analytics'>
                  <BarChart2 className='mr-2 h-4 w-4' />
                  Analytics
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link href='/search'>
                  <Search className='mr-2 h-4 w-4' />
                  Search
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className='basis-[70%]'>
        <div className='container py-4'>
          <SidebarTrigger className='mb-6' />
          {children}
        </div>
      </SidebarInset>
    </div>
  );
}
