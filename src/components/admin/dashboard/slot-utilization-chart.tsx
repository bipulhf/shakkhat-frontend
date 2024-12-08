"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

// const data = [
//   { date: "Mon", utilization: 65 },
//   { date: "Tue", utilization: 75 },
//   { date: "Wed", utilization: 85 },
//   { date: "Thu", utilization: 70 },
//   { date: "Fri", utilization: 80 },
//   { date: "Sat", utilization: 50 },
//   { date: "Sun", utilization: 40 },
// ];

const transformData = (meetings: Meeting[]) => {
  const utilization = meetings.reduce((acc, meeting) => {
    const date = new Date(meeting.date).toLocaleString("en-US", {
      weekday: "short",
    });
    acc[date] = acc[date] || 0;
    acc[date] += 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.keys(utilization).map((date) => ({
    date,
    utilization: utilization[date],
  }));
};

export function SlotUtilizationChart({ meetings }: { meetings: Meeting[] }) {
  const data = transformData(meetings);
  return (
    <ChartContainer
      config={{
        utilization: {
          label: "Utilization %",
          color: "hsl(var(--chart-4))",
        },
      }}
      className='h-[300px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type='monotone'
            dataKey='utilization'
            stroke='var(--color-utilization)'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
