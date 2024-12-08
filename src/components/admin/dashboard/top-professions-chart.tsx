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
  { profession: "Developer", count: 120 },
  { profession: "Designer", count: 80 },
  { profession: "Manager", count: 60 },
  { profession: "Marketer", count: 40 },
  { profession: "Analyst", count: 30 },
];

export function TopProfessionsChart() {
  return (
    <ChartContainer
      config={{
        count: {
          label: "Count",
          color: "hsl(var(--chart-3))",
        },
      }}
      className='h-[300px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <XAxis dataKey='profession' />
          <YAxis />
          <Tooltip content={<ChartTooltipContent />} />
          <Bar dataKey='count' fill='var(--color-count)' />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
