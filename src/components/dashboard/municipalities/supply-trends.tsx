'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Legend, Tooltip, ResponsiveContainer, Line, LineChart } from 'recharts';

const chartData = [
  { commodity: 'Lentils', current: 1800, forecast: 2000 },
  { commodity: 'Onions', current: 3000, forecast: 2800 },
  { commodity: 'Potatoes', current: 4500, forecast: 4000 },
  { commodity: 'Tomatoes', current: 1500, forecast: 2000 },
  { commodity: 'Wheat', current: 3500, forecast: 3200 },
  { commodity: 'Rice', current: 5200, forecast: 5000 },
];

const chartConfig = {
  current: {
    label: 'Current Supply',
    color: 'hsl(var(--primary))',
  },
  forecast: {
    label: 'Demand Forecast',
    color: 'hsl(var(--chart-4))',
  },
};

export function SupplyTrends() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          Supply Trends
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="commodity" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                dataKey="current"
                type="monotone"
                stroke="var(--color-current)"
                strokeWidth={2}
                dot={true}
              />
              <Line
                dataKey="forecast"
                type="monotone"
                stroke="var(--color-forecast)"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
         <div className="flex justify-center gap-6 mt-4 text-sm">
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span>Current Supply</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-4))]" />
                <span>Demand Forecast</span>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
