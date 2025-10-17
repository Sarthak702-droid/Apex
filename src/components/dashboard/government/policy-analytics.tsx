'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { region: "Odisha", implemented: 4, successRate: 85 },
  { region: "Maharashtra", implemented: 7, successRate: 78 },
  { region: "Chhattisgarh", implemented: 3, successRate: 92 },
  { region: "Jharkhand", implemented: 5, successRate: 81 },
  { region: "Telangana", implemented: 6, successRate: 88 },
];

const chartConfig = {
  implemented: {
    label: "Policies Implemented",
    color: "hsl(var(--primary))",
  },
  successRate: {
    label: "Success Rate (%)",
    color: "hsl(var(--accent))",
  },
};

export default function PolicyAnalytics() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Policy Analytics</CardTitle>
        <CardDescription>Policy implementation and success rates by region.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="region" tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" orientation="left" tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} domain={[0, 100]} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar yAxisId="left" dataKey="implemented" fill="var(--color-implemented)" radius={4} />
              <Bar yAxisId="right" dataKey="successRate" fill="var(--color-successRate)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
