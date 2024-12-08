"use client";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

interface SlotUtilizationChartProps {
  data: { status: string; count: number }[];
}

export function SlotUtilizationChart({ data }: SlotUtilizationChartProps) {
  return (
    <ChartContainer
      config={{
        status: {
          label: "Status",
          color: "hsl(var(--chart-1))",
        },
        count: {
          label: "Count",
          color: "hsl(var(--chart-2))",
        },
      }}
      className='h-[300px]'
    >
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='status' />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey='count' fill='var(--color-count)' />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
