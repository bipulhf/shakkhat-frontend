"use client";

import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface MeetingStatusChartProps {
  data: { status: string; count: number }[];
}

export function MeetingStatusChart({ data }: MeetingStatusChartProps) {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

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
        <PieChart>
          <Pie
            data={data}
            cx='50%'
            cy='50%'
            labelLine={false}
            outerRadius={80}
            fill='#8884d8'
            dataKey='count'
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <ChartTooltip
            content={({ payload }) => {
              if (payload && payload.length > 0) {
                return (
                  <div className='bg-white p-2 rounded shadow'>
                    <p className='font-semibold'>{payload[0].payload.status}</p>
                  </div>
                );
              }
              return null;
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
