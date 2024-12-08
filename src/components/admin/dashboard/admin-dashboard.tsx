"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TopProfessionsChart } from "./top-professions-chart";
import { MeetingStatusChart } from "./meeting-status-chart";
import { UserRegistrationChart } from "./user-registration-chart";
import { SlotUtilizationChart } from "./slot-utilization-chart";
import { MeetingDistributionChart } from "./meeting-distribution-chart";
import { UserList } from "../user-list";

export default function AdminDashboard({
  users,
  meetings,
}: {
  users: User[];
  meetings: Meeting[];
}) {
  const [isUserListOpen, setIsUserListOpen] = useState(false);

  return (
    <div className='container mx-auto px-2'>
      <h1 className='text-4xl font-bold mb-8 text-center'>
        Admin Analytics Dashboard
      </h1>
      <div className='mt-8 flex justify-center mb-10'>
        <Dialog open={isUserListOpen} onOpenChange={setIsUserListOpen}>
          <DialogTrigger asChild>
            <Button size='lg'>Show User List</Button>
          </DialogTrigger>
          <DialogContent className='max-w-4xl'>
            <DialogHeader>
              <DialogTitle>User List</DialogTitle>
              <DialogDescription>
                Here&apos;s a list of all registered users in the system.
              </DialogDescription>
            </DialogHeader>
            <UserList users={users} />
          </DialogContent>
        </Dialog>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8'>
        <Card>
          <CardHeader>
            <CardTitle>User Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <UserRegistrationChart users={users} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meeting Status Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <MeetingStatusChart meetings={meetings} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Professions</CardTitle>
          </CardHeader>
          <CardContent>
            <TopProfessionsChart users={users} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Slot Utilization</CardTitle>
          </CardHeader>
          <CardContent>
            <SlotUtilizationChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Meeting Distribution by Host</CardTitle>
          </CardHeader>
          <CardContent>
            <MeetingDistributionChart meetings={meetings} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
