
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", members: 12 },
  { month: "Feb", members: 15 },
  { month: "Mar", members: 8 },
  { month: "Apr", members: 22 },
  { month: "May", members: 18 },
  { month: "Jun", members: 12 },
];

const chartConfig = {
  members: {
    label: "New Members",
    color: "hsl(var(--chart-1))",
  },
};

export function FpoMemberGrowth() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Member Growth</CardTitle>
        <CardDescription>New member sign-ups over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <Tooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="members" fill="var(--color-members)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

