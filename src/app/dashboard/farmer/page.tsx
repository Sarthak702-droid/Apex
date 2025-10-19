'use client';

import { useState } from 'react';
import { DollarSign, FileText, Wheat, Filter } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import CropRecommendations from "@/components/dashboard/farmer/crop-recommendations";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { ChartTooltip, ChartTooltipContent, ChartContainer } from "@/components/ui/chart";
import { OilseedMotivation } from '@/components/dashboard/farmer/oilseed-motivation';
import { BookOpen } from 'lucide-react';

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

const profitabilityData = {
  Telangana: [
    { name: 'Soybean', profit: 35000 },
    { name: 'Cotton', profit: 32000 },
    { name: 'Maize', profit: 28000 },
    { name: 'Paddy', profit: 25000 },
  ],
  Maharashtra: [
    { name: 'Soybean', profit: 33000 },
    { name: 'Cotton', profit: 36000 },
    { name: 'Sugarcane', profit: 45000 },
    { name: 'Onion', profit: 40000 },
  ],
  Odisha: [
    { name: 'Paddy', profit: 28000 },
    { name: 'Pulses', profit: 25000 },
    { name: 'Groundnut', profit: 32000 },
    { name: 'Jute', profit: 30000 },
  ]
};

const profitChartConfig = {
  profit: { label: 'Profit (₹/acre)', color: 'hsl(var(--primary))' },
};

const trendChartConfig = {
  price: { label: "Price (₹/quintal)", color: "hsl(var(--chart-2))" },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="font-headline">Crop Profitability Analysis (₹/acre)</CardTitle>
            <CardDescription>Estimated profit for top crops in {selectedState}</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={profitChartConfig} className="h-64 w-full">
              <BarChart data={profitabilityData[selectedState]} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis tickFormatter={(value) => `₹${Number(value) / 1000}k`} />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dot" />}
                />
                <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
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
            <ChartContainer config={trendChartConfig} className="h-64 w-full">
               <LineChart data={yieldData[selectedState]}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} domain={['dataMin - 100', 'dataMax + 100']} />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" />}
                  />
                  <Line type="monotone" dataKey="price" stroke="var(--color-price)" strokeWidth={2} dot={false} name="Price" />
                </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-2xl md:text-3xl">
            <Wheat className="h-7 w-7 text-primary" />
            AI Crop Recommendations
          </CardTitle>
          <CardDescription>Get personalized, AI-driven crop recommendations for your farm.</CardDescription>
        </CardHeader>
        <CardContent>
          <CropRecommendations />
        </CardContent>
      </Card>


      <Card className="mt-8 bg-card/50 border-0 shadow-none">
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2 text-2xl md:text-3xl">
            <BookOpen className="h-7 w-7 text-primary" />
            The Path to Prosperity with Oilseeds
          </CardTitle>
          <CardDescription>An interactive journey showcasing the benefits of oilseed farming.</CardDescription>
        </CardHeader>
        <CardContent>
          <OilseedMotivation />
        </CardContent>
      </Card>

    </div>
  );
}
