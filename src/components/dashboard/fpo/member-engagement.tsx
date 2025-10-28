
'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'High', value: 150, fill: 'hsl(var(--chart-1))' },
  { name: 'Medium', value: 280, fill: 'hsl(var(--chart-2))' },
  { name: 'Low', value: 93, fill: 'hsl(var(--chart-4))' },
];

export function MemberEngagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Member Engagement</CardTitle>
        <CardDescription>Based on platform activity and sales volume.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
            <div>
                 <ChartContainer config={{}} className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                        <Pie
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={70}
                            dataKey="value"
                            paddingAngle={5}
                            startAngle={90}
                            endAngle={450}
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
            <div className="space-y-3">
                {data.map((entry) => (
                    <div key={entry.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.fill }} />
                            <span className="text-muted-foreground">{entry.name}</span>
                        </div>
                        <span className="font-semibold">{entry.value} Members</span>
                    </div>
                ))}
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
