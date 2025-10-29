
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from "recharts";

const data = [
    { role: 'Municipalities Corporation', count: 85, fill: 'hsl(var(--chart-1))' },
    { role: 'Development Authorities', count: 75, fill: 'hsl(var(--chart-2))' },
    { role: 'Disaster Management', count: 50, fill: 'hsl(var(--chart-3))' },
    { role: 'FPO', count: 120, fill: 'hsl(var(--chart-4))' },
    { role: 'Logistic Supporter', count: 90, fill: 'hsl(var(--chart-5))' },
    { role: 'Admin', count: 5, fill: 'hsl(var(--muted))' },
];

export function UserRoleDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">User Role Distribution</CardTitle>
        <CardDescription>Breakdown of users by their assigned role.</CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={data} dataKey="count" nameKey="role" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Legend />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
