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

const transformData = (users: User[]) => {
  const userCount = users.reduce((acc, user) => {
    const date = new Date(user.createdAt).toISOString().slice(0, 7);
    acc[date] = acc[date] ? acc[date] + 1 : 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(userCount).map(([date, users]) => ({
    date,
    users,
  }));
};

export function UserRegistrationChart({ users }: { users: User[] }) {
  const data = transformData(users);
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
