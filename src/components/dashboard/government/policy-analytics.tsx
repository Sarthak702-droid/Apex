'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { region: "Odisha", Groundnut: 65, Mustard: 40 },
  { region: "Maharashtra", Soybean: 80, Sunflower: 55 },
  { region: "Chhattisgarh", Soybean: 50, Linseed: 70 },
  { region: "Jharkhand", Mustard: 60, Sesame: 45 },
  { region: "Telangana", Sunflower: 75, Groundnut: 60 },
];

const chartConfig = {
  Soybean: {
    label: "Soybean",
    color: "hsl(var(--chart-1))",
  },
  Groundnut: {
    label: "Groundnut",
    color: "hsl(var(--chart-2))",
  },
  Mustard: {
    label: "Mustard",
    color: "hsl(var(--chart-3))",
  },
  Sunflower: {
    label: "Sunflower",
    color: "hsl(var(--chart-4))",
  },
  Linseed: {
      label: "Linseed",
      color: "hsl(var(--chart-5))",
  },
  Sesame: {
      label: "Sesame",
      color: "hsl(var(--destructive))",
  }
};

export default function PolicyAnalytics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Scheme Adoption Analytics</CardTitle>
        <CardDescription>Adoption rate (%) of oilseed schemes by state.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={chartData} 
              layout="vertical"
              margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
            >
              <CartesianGrid horizontal={false} />
              <YAxis 
                dataKey="region" 
                type="category"
                tickLine={false} 
                axisLine={false}
                tickMargin={10}
                width={80}
              />
              <XAxis 
                type="number"
                tickSuffix="%"
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="dot" />}
              />
               <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="Soybean" stackId="a" fill="var(--color-Soybean)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Groundnut" stackId="a" fill="var(--color-Groundnut)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Mustard" stackId="a" fill="var(--color-Mustard)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Sunflower" stackId="a" fill="var(--color-Sunflower)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Linseed" stackId="a" fill="var(--color-Linseed)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="Sesame" stackId="a" fill="var(--color-Sesame)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
