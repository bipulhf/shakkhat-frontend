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

const transformData = (meetings: Meeting[]) => {
  const meetingDistribution = meetings.reduce((acc, meeting) => {
    if (!acc[meeting.host.name]) {
      acc[meeting.host.name] = 0;
    }
    acc[meeting.host.name]++;
    return acc;
  }, {} as Record<string, number>);

  return Object.entries(meetingDistribution).map(([host, meetings]) => ({
    host,
    meetings,
  }));
};

export function MeetingDistributionChart({
  meetings,
}: {
  meetings: Meeting[];
}) {
  const data = transformData(meetings).slice(0, 5);
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
