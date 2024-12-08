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

const data = [
  { date: "2023-01", users: 400 },
  { date: "2023-02", users: 600 },
  { date: "2023-03", users: 800 },
  { date: "2023-04", users: 1000 },
  { date: "2023-05", users: 1400 },
  { date: "2023-06", users: 1800 },
];

export function UserRegistrationChart() {
  return (
    <ChartContainer
      config={{
        users: {
          label: "Users",
          color: "hsl(var(--chart-1))",
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
            dataKey='users'
            stroke='var(--color-users)'
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
