'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { BarChart, CartesianGrid, XAxis, YAxis, Bar, ResponsiveContainer, Legend } from 'recharts';

const chartData = [
  { zone: 'Zone A', rice: 2000, wheat: 1500, lentils: 800 },
  { zone: 'Zone B', rice: 1800, wheat: 1200, lentils: 1000 },
  { zone: 'Zone C', rice: 2200, wheat: 1800, lentils: 700 },
  { zone: 'Zone D', rice: 1500, wheat: 1000, lentils: 1200 },
];

const chartConfig = {
  rice: {
    label: 'Rice',
    color: 'hsl(var(--chart-1))',
  },
  wheat: {
    label: 'Wheat',
    color: 'hsl(var(--chart-2))',
  },
  lentils: {
    label: 'Lentils',
    color: 'hsl(var(--chart-4))',
  },
};

export function ZonalSupplyBreakdown() {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid vertical={false} />
          <XAxis dataKey="zone" tickLine={false} axisLine={false} />
          <YAxis unit="kg" tickLine={false} axisLine={false} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Legend />
          <Bar dataKey="rice" stackId="a" fill="var(--color-rice)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="wheat" stackId="a" fill="var(--color-wheat)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="lentils" stackId="a" fill="var(--color-lentils)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
