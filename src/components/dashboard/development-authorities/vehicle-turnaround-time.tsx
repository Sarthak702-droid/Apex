
'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { hub: 'Mancheswar Hub', time: 4.5 },
  { hub: 'Patia Hub', time: 3.2 },
  { hub: 'Kharabela Hub', time: 5.1 },
  { hub: 'Old Town Hub', time: 6.8 },
];

const chartConfig = {
  time: {
    label: 'Turnaround Time (hours)',
    color: 'hsl(var(--chart-5))',
  },
};

export function VehicleTurnaroundTime() {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart
          data={chartData}
          layout="vertical"
          margin={{
            top: 0,
            right: 0,
            left: 20,
            bottom: 0,
          }}
        >
          <CartesianGrid horizontal={false} />
          <YAxis
            dataKey="hub"
            type="category"
            tickLine={false}
            axisLine={false}
            tickMargin={10}
            width={100}
          />
          <XAxis dataKey="time" type="number" hide />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Bar dataKey="time" fill="var(--color-time)" radius={4} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
