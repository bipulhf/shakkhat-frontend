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

const transformData = (users: User[]) => {
  const professionCount = users.reduce((acc, user) => {
    acc[user.profession] = acc[user.profession] ? acc[user.profession] + 1 : 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(professionCount).map(([profession, count]) => ({
    profession,
    count,
  }));
};

export function TopProfessionsChart({ users }: { users: User[] }) {
  const data = transformData(users);
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
