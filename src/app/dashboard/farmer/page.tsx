'use client';

import { useState } from 'react';
import { DollarSign, FileText, Wheat, Filter, BookOpen } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import CropRecommendations from "@/components/dashboard/farmer/crop-recommendations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, Line, LineChart } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import { OilSeedComics } from '@/components/dashboard/farmer/oil-seed-comics';

const yieldData = {
  Telangana: [
    { month: "Jan", yield: 1.8, price: 4500 },
    { month: "Feb", yield: 1.9, price: 4600 },
    { month: "Mar", yield: 2.1, price: 4800 },
    { month: "Apr", yield: 2.0, price: 4750 },
    { month: "May", yield: 2.2, price: 4900 },
    { month: "Jun", yield: 2.3, price: 5100 },
  ],
  Maharashtra: [
    { month: "Jan", yield: 1.5, price: 4200 },
    { month: "Feb", yield: 1.6, price: 4300 },
    { month: "Mar", yield: 1.8, price: 4500 },
    { month: "Apr", yield: 1.7, price: 4450 },
    { month: "May", yield: 1.9, price: 4600 },
    { month: "Jun", yield: 2.0, price: 4800 },
  ],
  Odisha: [
    { month: "Jan", yield: 1.2, price: 4000 },
    { month: "Feb", yield: 1.3, price: 4100 },
    { month: "Mar", yield: 1.5, price: 4300 },
    { month: "Apr", yield: 1.4, price: 4250 },
    { month: "May", yield: 1.6, price: 4400 },
    { month: "Jun", yield: 1.7, price: 4600 },
  ],
};

const chartConfig = {
  yield: {
    label: "Yield (tons/acre)",
    color: "hsl(var(--chart-1))",
  },
  price: {
    label: "Price (₹/quintal)",
    color: "hsl(var(--chart-2))",
  },
};

export default function FarmerDashboard() {
  const [selectedState, setSelectedState] = useState<keyof typeof yieldData>('Telangana');

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-headline text-3xl font-bold">Farmer Dashboard</h1>
        <div className="flex items-center gap-2">
          <Filter className="h-5 w-5 text-muted-foreground" />
          <Select onValueChange={(value: keyof typeof yieldData) => setSelectedState(value)} defaultValue={selectedState}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a state" />
            </SelectTrigger>
            <SelectContent>
              {Object.keys(yieldData).map(state => (
                <SelectItem key={state} value={state}>{state}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Active Contracts"
          value="3"
          icon={<FileText className="h-5 w-5" />}
          description="Contracts pending delivery"
        />
        <StatsCard
          title="Recommended Crop"
          value="Soybean"
          icon={<Wheat className="h-5 w-5" />}
          description={`For ${selectedState}`}
        />
        <StatsCard
          title="Est. Earnings"
          value="₹4,52,312"
          icon={<DollarSign className="h-5 w-5" />}
          description={`Based on ${selectedState} data`}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Crop Yield Trend (tons/acre)</CardTitle>
            <CardDescription>{selectedState} - Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
              <BarChart data={yieldData[selectedState]}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Legend />
                <Bar dataKey="yield" fill="var(--color-yield)" radius={4} name="Yield" />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-headline">Market Price Trend (₹/quintal)</CardTitle>
            <CardDescription>{selectedState} - Last 6 months for Soybean</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-64 w-full">
               <LineChart data={yieldData[selectedState]}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} dot={false} name="Price" />
                </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <div>
        <CropRecommendations />
      </div>

      <Card className="mt-8 bg-card/50 border-0 shadow-none">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-2xl md:text-3xl">
            <BookOpen className="h-7 w-7 text-primary" />
            The Journey of an Oilseed Farmer
          </CardTitle>
          <CardDescription>An interactive story to guide you on your oilseed cultivation journey. Scroll to begin.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 m-0">
          <OilSeedComics />
        </CardContent>
      </Card>

    </div>
  );
}
