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
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Sustainability Data</CardTitle>
        <CardDescription>Adoption of sustainable practices.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={50}
                strokeWidth={5}
              >
                 {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
              </Pie>
               <ChartLegend
                content={<ChartLegendContent nameKey="name" />}
                className="-mt-4"
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
