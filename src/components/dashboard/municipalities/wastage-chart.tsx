'use client';

import {
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { commodity: 'Tomatoes', wastage: 15.2 },
  { commodity: 'Onions', wastage: 8.1 },
  { commodity: 'Potatoes', wastage: 5.5 },
  { commodity: 'Wheat', wastage: 1.8 },
  { commodity: 'Rice', wastage: 2.3 },
  { commodity: 'Lentils', wastage: 3.4 },
];

const chartConfig = {
  wastage: {
    label: 'Wastage (%)',
    color: 'hsl(var(--chart-3))',
  },
};

export function WastageChart() {
  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline">Wastage by Commodity</CardTitle>
        <CardDescription>Estimated wastage percentage in the last 30 days.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="commodity" tickLine={false} axisLine={false} />
                <YAxis unit="%" tickLine={false} axisLine={false} />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="wastage" fill="var(--color-wastage)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </>
  );
}
