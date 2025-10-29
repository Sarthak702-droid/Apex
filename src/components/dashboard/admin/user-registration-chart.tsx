
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";

const chartData = [
  { month: "Jan", users: 186 },
  { month: "Feb", users: 305 },
  { month: "Mar", users: 237 },
  { month: "Apr", users: 73 },
  { month: "May", users: 209 },
  { month: "Jun", users: 214 },
];

const chartConfig = {
  users: {
    label: "New Users",
    color: "hsl(var(--chart-2))",
  },
};

export function UserRegistrationChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Monthly Registrations</CardTitle>
        <CardDescription>New user sign-ups over the last 6 months.</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
              <CartesianGrid vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis tickLine={false} axisLine={false} />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Bar dataKey="users" fill="var(--color-users)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
