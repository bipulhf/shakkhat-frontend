"use client";

import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { host: "Alice", meetings: 25 },
  { host: "Bob", meetings: 18 },
  { host: "Charlie", meetings: 30 },
  { host: "David", meetings: 22 },
  { host: "Eve", meetings: 15 },
];

export function MeetingDistributionChart() {
  return (
    <ChartContainer
      config={{
        meetings: {
          label: "Meetings",
          color: "hsl(var(--chart-6))",
        },
      }}
      className='h-[300px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey='host' />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey='meetings' fill='var(--color-meetings)' />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
