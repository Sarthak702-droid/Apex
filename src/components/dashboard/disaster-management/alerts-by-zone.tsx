
'use client';

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { zone: "Rasulgarh", alerts: 5 },
  { zone: "Old Town", alerts: 3 },
  { zone: "Patia", alerts: 4 },
  { zone: "Baramunda", alerts: 2 },
  { zone: "Mancheswar", alerts: 1 },
];

const chartConfig = {
  alerts: {
    label: "Alerts",
    color: "hsl(var(--chart-4))",
  },
};

export function AlertsByZone() {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="zone" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} allowDecimals={false} />
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
