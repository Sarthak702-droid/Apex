
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts';

const data = [
  { name: 'High', value: 4, fill: 'hsl(var(--destructive))' },
  { name: 'Medium', value: 2, fill: 'hsl(var(--chart-4))' },
  { name: 'Low', value: 1, fill: 'hsl(var(--chart-2))' },
];

export function AlertsBySeverity() {
  return (
    <ChartContainer config={{}} className="h-64 w-full">
        <ResponsiveContainer>
            <PieChart>
                <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
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
