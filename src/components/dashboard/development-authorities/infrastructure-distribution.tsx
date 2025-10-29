
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Building, Snowflake } from 'lucide-react';

const data = [
  { name: 'Zone A', warehouses: 40, coldStorage: 20 },
  { name: 'Zone B', warehouses: 30, coldStorage: 45 },
  { name: 'Zone C', warehouses: 20, coldStorage: 10 },
  { name: 'Zone D', warehouses: 38, coldStorage: 25 },
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
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Infrastructure by Zone</CardTitle>
        <CardDescription>Distribution of key food storage facilities.</CardDescription>
      </CardHeader>
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
    </Card>
  );
}
