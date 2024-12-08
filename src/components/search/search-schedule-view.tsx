"use client";

import { Card, CardContent } from "@/components/ui/card";

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

export function SearchScheduleView() {
  return (
    <Card className='pt-2'>
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
          <p className='text-center text-gray-500'>No meetings found.</p>
        )}
      </CardContent>
    </Card>
  );
}
