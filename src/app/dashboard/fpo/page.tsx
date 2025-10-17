import { Users, BarChart3, GitGraph, DollarSign } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function FPODashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">FPO Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value="523"
          icon={<Users className="h-5 w-5" />}
          description="+12 new members this month"
        />
        <StatsCard
          title="Aggregated Produce"
          value="1,250 Tons"
          icon={<GitGraph className="h-5 w-5" />}
          description="Total this season"
        />
        <StatsCard
          title="Total Revenue"
          value="₹87,50,000"
          icon={<DollarSign className="h-5 w-5" />}
          description="+22% vs last season"
        />
        <StatsCard
          title="Performance Index"
          value="8.5 / 10"
          icon={<BarChart3 className="h-5 w-5" />}
          description="Overall FPO efficiency"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">FPO Overview</CardTitle>
          <CardDescription>More detailed analytics and management tools for your Farmer Producer Organization are coming soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This dashboard will provide insights into member statistics, aggregation data, and performance tracking to help you manage your FPO effectively.</p>
        </CardContent>
      </Card>
    </div>
  );
}
