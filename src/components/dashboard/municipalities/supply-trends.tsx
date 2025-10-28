'use client';

import {
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ResponsiveContainer, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const chartData = [
  { commodity: 'Lentils', current: 1800, forecast: 2000 },
  { commodity: 'Potatoes', current: 4500, forecast: 4000 },
  { commodity: 'Wheat', current: 3200, forecast: 3500 },
  { commodity: 'Rice', current: 5200, forecast: 5000 },
];

const chartConfig = {
  current: {
    label: 'Current Supply',
    color: 'hsl(var(--chart-1))',
  },
  forecast: {
    label: 'Demand Forecast',
    color: 'hsl(var(--chart-4))',
  },
};

export function SupplyTrends() {
  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          Supply vs. Demand
        </CardTitle>
      </CardHeader>
      <div className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="commodity" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} domain={[0, 6000]} />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Legend />
              <Line
                dataKey="current"
                name="Current Supply"
                type="monotone"
                stroke="var(--color-current)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-current)' }}
              />
              <Line
                dataKey="forecast"
                name="Demand Forecast"
                type="monotone"
                stroke="var(--color-forecast)"
                strokeWidth={2}
                dot={{ r: 4, fill: 'var(--color-forecast)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
    </>
  );
}
