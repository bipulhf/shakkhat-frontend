"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface MeetingTrendsChartProps {
  data: { date: string; count: number }[];
}

export function MeetingTrendsChart({ data }: MeetingTrendsChartProps) {
  return (
    <ChartContainer
      config={{
        date: {
          label: "Date",
          color: "hsl(var(--chart-1))",
        },
        count: {
          label: "Meetings",
          color: "hsl(var(--chart-2))",
        },
      }}
      className='h-[300px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line type='monotone' dataKey='count' stroke='var(--color-count)' />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
