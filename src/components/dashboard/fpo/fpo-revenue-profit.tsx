
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { name: 'Jan', revenue: 1200000, profit: 450000 },
  { name: 'Feb', revenue: 1500000, profit: 550000 },
  { name: 'Mar', revenue: 1350000, profit: 500000 },
  { name: 'Apr', revenue: 1800000, profit: 700000 },
  { name: 'May', revenue: 1600000, profit: 600000 },
  { name: 'Jun', revenue: 2000000, profit: 850000 },
];

const chartConfig = {
  revenue: {
    label: 'Revenue',
    color: 'hsl(var(--chart-2))',
  },
  profit: {
    label: 'Profit',
    color: 'hsl(var(--chart-1))',
  },
};

export function FpoRevenueProfit() {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
        <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis
                tickFormatter={(value) => `₹${Number(value) / 100000}L`}
                tickLine={false}
                axisLine={false}
            />
            <Tooltip content={<ChartTooltipContent formatter={(value, name) => [`₹${(Number(value) / 100000).toFixed(2)}L`, name as string]} />} />
            <Legend />
            <Bar dataKey="revenue" fill="var(--color-revenue)" radius={4} />
            <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
        </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
