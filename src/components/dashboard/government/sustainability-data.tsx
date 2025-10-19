'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Pie, PieChart, ResponsiveContainer, Cell } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Badge } from "@/components/ui/badge";

const data = [
  { name: "Organic Farming", value: 45, fill: "hsl(var(--chart-1))" },
  { name: "Water Conservation", value: 30, fill: "hsl(var(--chart-2))" },
  { name: "Reduced Pesticides", value: 15, fill: "hsl(var(--chart-3))" },
  { name: "Crop Rotation", value: 10, fill: "hsl(var(--chart-4))" },
];

const chartConfig = {
  value: {
    label: "Adoption",
  },
  "Organic Farming": {
    label: "Organic Farming",
    color: "hsl(var(--chart-1))",
  },
  "Water Conservation": {
    label: "Water Conservation",
    color: "hsl(var(--chart-2))",
  },
  "Reduced Pesticides": {
    label: "Reduced Pesticides",
    color: "hsl(var(--chart-3))",
  },
  "Crop Rotation": {
    label: "Crop Rotation",
    color: "hsl(var(--chart-4))",
  },
};


export default function SustainabilityData() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Sustainability Data</CardTitle>
        <CardDescription>Adoption of sustainable practices.</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center">
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
                labelLine={false}
                label={({
                  cx,
                  cy,
                  midAngle,
                  innerRadius,
                  outerRadius,
                  percent,
                }) => {
                  const RADIAN = Math.PI / 180;
                  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                  const x = cx + radius * Math.cos(-midAngle * RADIAN);
                  const y = cy + radius * Math.sin(-midAngle * RADIAN);

                  return (
                    <text
                      x={x}
                      y={y}
                      fill="white"
                      textAnchor={x > cx ? 'start' : 'end'}
                      dominantBaseline="central"
                      className="text-xs font-bold fill-primary-foreground"
                    >
                      {`${(percent * 100).toFixed(0)}%`}
                    </text>
                  );
                }}
              >
                 {data.map((entry) => (
                    <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                  ))}
              </Pie>
               <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-mt-2"
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
         <div className="mt-4 flex flex-wrap justify-center gap-2">
            <Badge variant="secondary">Overall Index: 78%</Badge>
            <Badge variant="secondary" className="bg-green-500/10 text-green-700 dark:text-green-400">Trend: +2.5%</Badge>
        </div>
      </CardContent>
    </Card>
  );
}
