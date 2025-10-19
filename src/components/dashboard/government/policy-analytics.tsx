'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Legend } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";

const chartData = [
  { region: "Odisha", success: 3, failed: 1 },
  { region: "Maharashtra", success: 5, failed: 2 },
  { region: "Chhattisgarh", success: 3, failed: 0 },
  { region: "Jharkhand", success: 4, failed: 1 },
  { region: "Telangana", success: 5, failed: 1 },
];

const chartConfig = {
  success: {
    label: "Successful",
    color: "hsl(var(--chart-1))",
  },
  failed: {
    label: "Failed",
    color: "hsl(var(--destructive))",
  },
};

export default function PolicyAnalytics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Policy Analytics</CardTitle>
        <CardDescription>Success and failure rates of policies by region.</CardDescription>
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
              />
              <XAxis 
                type="number"
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent indicator="dot" />}
              />
               <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="success" stackId="a" fill="var(--color-success)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="failed" stackId="a" fill="var(--color-failed)" radius={[4, 0, 0, 4]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
