"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Cell } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const COLORS = ["#FF6384", "#36A2EB", "#FFCE56"];

const transformData = (meetings: Meeting[]) => {
  const meetingStatus = meetings.reduce(
    (acc, meeting) => {
      if (meeting.status === 0) {
        acc.cancelled++;
      } else if (meeting.status === 1) {
        acc.pending++;
      } else {
        acc.completed++;
      }
      return acc;
    },
    { cancelled: 0, pending: 0, completed: 0 }
  );

  return [
    { name: "Cancelled", value: meetingStatus.cancelled },
    { name: "Pending", value: meetingStatus.pending },
    { name: "Completed", value: meetingStatus.completed },
  ];
};

export function MeetingStatusChart({ meetings }: { meetings: Meeting[] }) {
  const data = transformData(meetings);
  return (
    <ChartContainer
      config={{
        status: {
          label: "Status",
          color: "hsl(var(--chart-2))",
        },
      }}
      className='h-[300px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={80}
            fill='#8884d8'
            dataKey='value'
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<ChartTooltipContent />} />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
