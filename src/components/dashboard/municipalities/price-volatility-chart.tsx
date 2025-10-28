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
  { commodity: 'Wheat', volatility: 2.5 },
  { commodity: 'Rice', volatility: 5.2 },
  { commodity: 'Tomatoes', volatility: 18.7 },
  { commodity: 'Onions', volatility: 12.1 },
  { commodity: 'Potatoes', volatility: 8.3 },
  { commodity: 'Lentils', volatility: 4.1 },
];

const chartConfig = {
  volatility: {
    label: 'Price Volatility (%)',
    color: 'hsl(var(--chart-5))',
  },
};

export function PriceVolatilityChart() {
  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline">Price Volatility</CardTitle>
        <CardDescription>Last 30 days</CardDescription>
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
                <Bar dataKey="volatility" fill="var(--color-volatility)" radius={4} />
              </BarChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </>
  );
}
