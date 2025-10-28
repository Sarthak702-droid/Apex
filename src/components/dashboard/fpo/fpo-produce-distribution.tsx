'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const data = [
    { name: 'Wheat', value: 400, color: 'hsl(var(--chart-1))' },
    { name: 'Soybean', value: 300, color: 'hsl(var(--chart-2))' },
    { name: 'Cotton', value: 300, color: 'hsl(var(--chart-3))' },
    { name: 'Mustard', value: 200, color: 'hsl(var(--chart-4))' },
    { name: 'Other', value: 50, color: 'hsl(var(--chart-5))' },
];

export function FpoProduceDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Aggregated Produce Distribution</CardTitle>
        <CardDescription>Breakdown by crop type for the current season.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={{}} className="h-64 w-full">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Legend />
              <Tooltip content={<ChartTooltipContent hideLabel />} />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
