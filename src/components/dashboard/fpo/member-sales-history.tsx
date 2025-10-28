
'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

const data = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 2780 },
  { name: 'May', sales: 1890 },
  { name: 'Jun', sales: 2390 },
];

const chartConfig = {
  sales: {
    label: 'Sales (₹)',
    color: 'hsl(var(--chart-1))',
  },
};

export function MemberSalesHistoryChart() {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
        <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis
                tickFormatter={(value) => `₹${Number(value) / 1000}k`}
                tickLine={false}
                axisLine={false}
            />
            <Tooltip content={<ChartTooltipContent formatter={(value) => `₹${value.toLocaleString()}`} />} />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
        </BarChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
