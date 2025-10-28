'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Stable', value: 70, fill: 'hsl(var(--chart-1))' },
  { name: 'Warning', value: 20, fill: 'hsl(var(--chart-4))' },
  { name: 'Critical', value: 10, fill: 'hsl(var(--destructive))' },
];
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-4))', 'hsl(var(--destructive))'];


export function SupplyStatusDistribution() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Supply Status Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
                 <ChartContainer config={{}} className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                            paddingAngle={5}
                        >
                            {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        </PieChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </div>
            <div className="space-y-4">
                {data.map((entry) => (
                    <div key={entry.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                            <span className="text-muted-foreground">{entry.name}</span>
                        </div>
                        <span className="font-semibold">{entry.value}%</span>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
