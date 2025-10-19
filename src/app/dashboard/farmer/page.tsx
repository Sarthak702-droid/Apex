
'use client';

import { BarChart, Calendar, FileText, IndianRupee, Leaf, Plus, Scale, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { StatsCard } from "@/components/dashboard/stats-card";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DigitalSaudas } from "@/components/dashboard/farmer/digital-saudas";
import { Badge } from "@/components/ui/badge";

const quickActions = [
    { label: "Quality Check", icon: <FileText className="h-4 w-4" /> },
    { label: "Carbon Credits", icon: <Leaf className="h-4 w-4" /> },
    { label: "Crop Economics", icon: <BarChart className="h-4 w-4" /> },
];

export default function FarmerDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-headline text-3xl font-bold">Farmer Drishti</h1>
          <p className="text-muted-foreground">Welcome back, Sarthak!</p>
        </div>
        <div className="flex items-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-lg">
                <TrendingUp className="mr-2 h-4 w-4" />
                Compare Crops
            </Button>
            <Button className="bg-pink-600 hover:bg-pink-700 text-white font-bold shadow-lg">
                <Plus className="mr-2 h-4 w-4" />
                New Sauda
            </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Contracts"
          value="0"
          icon={<FileText />}
          description={<Badge variant="secondary">2 total</Badge>}
        />
        <StatsCard
          title="Total Earnings"
          value="₹0"
          icon={<IndianRupee />}
          description={<Badge variant="secondary">This season</Badge>}
        />
        <StatsCard
          title="Carbon Credits"
          value="1"
          icon={<Leaf />}
          description={<Badge variant="default" className="bg-yellow-400/20 text-yellow-600 dark:bg-yellow-500/10 dark:text-yellow-400">₹0 earned</Badge>}
        />
        <StatsCard
          title="Next Harvest"
          value="-"
          icon={<Calendar />}
          description=" "
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <DigitalSaudas />
        </div>
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                    {quickActions.map(action => (
                        <Button key={action.label} variant="outline" className="w-full justify-start gap-2">
                            {action.icon}
                            {action.label}
                        </Button>
                    ))}
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Recent Payments</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-center text-sm">No transactions yet</p>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}



