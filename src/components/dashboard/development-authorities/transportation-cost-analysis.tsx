
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';

const chartData = [
  { month: 'Jan', cost: 12.5 },
  { month: 'Feb', cost: 12.8 },
  { month: 'Mar', cost: 13.2 },
  { month: 'Apr', cost: 13.1 },
  { month: 'May', cost: 13.5 },
  { month: 'Jun', cost: 13.8 },
];

const chartConfig = {
  cost: {
    label: 'Cost (₹/Ton-Km)',
    color: 'hsl(var(--chart-3))',
  },
};

export function TransportationCostAnalysis() {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="fillCost" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-cost)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-cost)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `₹${value}`}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="cost"
            type="monotone"
            fill="url(#fillCost)"
            stroke="var(--color-cost)"
            stackId="a"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
