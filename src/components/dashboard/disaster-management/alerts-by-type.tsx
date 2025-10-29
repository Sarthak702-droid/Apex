
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'Logistics', value: 3, fill: 'hsl(var(--chart-1))' },
  { name: 'Weather', value: 2, fill: 'hsl(var(--chart-2))' },
  { name: 'Supply', value: 1, fill: 'hsl(var(--chart-3))' },
  { name: 'Traffic', value: 1, fill: 'hsl(var(--chart-4))' },
];

export function AlertsByType() {
  return (
    <ChartContainer config={{}} className="h-64 w-full">
        <ResponsiveContainer>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                    {data.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                </Pie>
                <Legend />
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            </PieChart>
        </ResponsiveContainer>
    </ChartContainer>
  );
}
