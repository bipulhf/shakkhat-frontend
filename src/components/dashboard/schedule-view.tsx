"use client";

import { useState } from "react";
import { format, addDays, subDays } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock data for meetings
const meetings = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    time: "09:00 AM",
    date: "2023-05-15",
    description: "Project kickoff meeting",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    time: "02:00 PM",
    date: "2023-05-15",
    description: "Design review session",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    time: "11:00 AM",
    date: "2023-05-16",
    description: "Sprint planning",
  },
];

export function ScheduleView() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handlePreviousDay = () => {
    setSelectedDate((prevDate) => subDays(prevDate, 1));
  };

  const handleNextDay = () => {
    setSelectedDate((prevDate) => addDays(prevDate, 1));
  };

  return (
    <Card className=''>
      <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2 mb-5'>
        <Button variant='outline' size='icon' onClick={handlePreviousDay}>
          <ChevronLeft className='h-4 w-4' />
        </Button>
        <CardTitle>
          Schedule for {format(selectedDate, "MMMM d, yyyy")}
        </CardTitle>
        <Button variant='outline' size='icon' onClick={handleNextDay}>
          <ChevronRight className='h-4 w-4' />
        </Button>
      </CardHeader>
      <CardContent>
        {meetings.length > 0 ? (
          <ul className='space-y-4'>
            {meetings.map((meeting) => (
              <li
                key={meeting.id}
                className='flex items-center justify-between p-4 border rounded-lg shadow-sm my-3'
              >
                <div>
                  <h3 className='font-semibold'>{meeting.name}</h3>
                  <p className='text-sm text-gray-500'>{meeting.email}</p>
                  <p className='my-2 text-blue-700 font-semibold'>
                    {meeting.description}
                  </p>
                </div>
                <div className='text-right'>
                  <p className='font-medium'>{meeting.time}</p>
                  <p className='text-sm text-gray-500'>{meeting.date}</p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className='text-center text-gray-500'>
            No meetings scheduled for this day.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
