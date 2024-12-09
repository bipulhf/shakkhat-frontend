"use client";

import {
  CalendarDays,
  BarChart2,
  Search,
  TimerIcon,
  LogOut,
  Stars,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { SidebarInset } from "@/components/ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { NotificationList } from "../notification/notification-list";
import { Button } from "../ui/button";
import { logout } from "@/actions/auth.action";
import toast from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import logo from "@/../public/images/logo.png";

export function DashboardShell({
  children,
  notifications,
}: {
  children: React.ReactNode;
  notifications: NotificationType[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <div className='flex h-screen'>
      <Sidebar className='basis-[30%]'>
        <SidebarHeader>
          <Image
            src={logo}
            alt='logo'
            width={150}
            height={150}
            className='mx-auto my-5'
          />
        </SidebarHeader>
        <SidebarContent className='flex flex-col justify-between'>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/dashboard"}>
                <Link href='/dashboard'>
                  <CalendarDays className='mr-2 h-4 w-4' />
                  Schedules
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/slot"}>
                <Link href='/slot'>
                  <TimerIcon className='mr-2 h-4 w-4' />
                  Slot
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/analytics"}>
                <Link href='/analytics'>
                  <BarChart2 className='mr-2 h-4 w-4' />
                  Analytics
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/search"}>
                <Link href='/search'>
                  <Search className='mr-2 h-4 w-4' />
                  Search
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild isActive={pathname === "/slot"}>
                <Link href='/ai'>
                  <Stars className='mr-2 h-4 w-4' />
                  Schedule with AI
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <Button
                    onClick={async () => {
                      toast.dismiss();
                      toast.loading("Logging out...");
                      await logout();
                      toast.dismiss();
                      toast.success("Logged out successfully");
                      router.push("/login");
                    }}
                    variant={"outline"}
                  >
                    <LogOut className='mr-2 h-4 w-4' />
                    Logout
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </SidebarContent>
      </Sidebar>
      <SidebarInset className='basis-[70%]'>
        <div className='container py-4'>
          <div className='flex justify-between w-[1620px]'>
            <SidebarTrigger className='mb-6' />
            <NotificationList notifications={notifications} />
          </div>
          {children}
        </div>
      </SidebarInset>
    </div>
  );
}
