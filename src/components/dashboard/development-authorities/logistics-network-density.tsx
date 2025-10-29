
'use client';

import {
  CardContent,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { name: 'Patia', density: 78 },
  { name: 'Kharabela Nagar', density: 65 },
  { name: 'Old Town', density: 45 },
  { name: 'Mancheswar', density: 85 },
];

const chartConfig = {
  density: {
    label: 'Density Score',
    color: 'hsl(var(--chart-4))',
  },
};

export function LogisticsNetworkDensity() {
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <ResponsiveContainer>
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="fillDensity" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-density)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-density)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Area
              dataKey="density"
              type="natural"
              fill="url(#fillDensity)"
              stroke="var(--color-density)"
              stackId="a"
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  );
}
