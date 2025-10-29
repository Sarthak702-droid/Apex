
'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { date: "Oct 18", alerts: 3 },
  { date: "Oct 19", alerts: 5 },
  { date: "Oct 20", alerts: 2 },
  { date: "Oct 21", alerts: 6 },
  { date: "Oct 22", alerts: 4 },
  { date: "Oct 23", alerts: 7 },
  { date: "Oct 24", alerts: 5 },
];

const chartConfig = {
  alerts: {
    label: "Alerts",
    color: "hsl(var(--primary))",
  },
};

export function AlertsOverTime() {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="date" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="alerts" fill="var(--color-alerts)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
