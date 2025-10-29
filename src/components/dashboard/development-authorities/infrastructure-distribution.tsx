
'use client';

import { CardContent } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const data = [
  { name: 'Patia', warehouses: 40, coldStorage: 20 },
  { name: 'Kharabela Nagar', warehouses: 30, coldStorage: 45 },
  { name: 'Old Town', warehouses: 20, coldStorage: 10 },
  { name: 'Mancheswar', warehouses: 38, coldStorage: 25 },
];

const chartConfig = {
  warehouses: {
    label: 'Warehouses',
    color: 'hsl(var(--chart-1))',
  },
  coldStorage: {
    label: 'Cold Storage (kMT)',
    color: 'hsl(var(--chart-2))',
  },
};

export function InfrastructureDistribution() {
  return (
    <CardContent>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <ResponsiveContainer>
          <BarChart data={data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
            <Bar dataKey="warehouses" fill="var(--color-warehouses)" radius={4} />
            <Bar dataKey="coldStorage" fill="var(--color-coldStorage)" radius={4} />
          </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    </CardContent>
  );
}
