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
  { date: "Mon", utilization: 65 },
  { date: "Tue", utilization: 75 },
  { date: "Wed", utilization: 85 },
  { date: "Thu", utilization: 70 },
  { date: "Fri", utilization: 80 },
  { date: "Sat", utilization: 50 },
  { date: "Sun", utilization: 40 },
];

export function SlotUtilizationChart() {
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
