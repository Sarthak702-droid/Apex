import { Landmark, Leaf, BarChart3, FileSpreadsheet } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Government Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Policies Implemented"
          value="25"
          icon={<Landmark className="h-5 w-5" />}
          description="Across all regions"
        />
        <StatsCard
          title="Sustainability Index"
          value="78%"
          icon={<Leaf className="h-5 w-5" />}
          description="Improvement in sustainable practices"
        />
        <StatsCard
          title="Real-time Alerts"
          value="15"
          icon={<BarChart3 className="h-5 w-5" />}
          description="Critical alerts today"
        />
         <StatsCard
          title="Data Reports"
          value="1,200+"
          icon={<FileSpreadsheet className="h-5 w-5" />}
          description="Total reports available"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">Policy & Data Hub</CardTitle>
          <CardDescription>Comprehensive analytics for informed decision-making coming soon.</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">This dashboard will feature advanced tools for policy analytics, sustainability data visualization, and real-time monitoring of the agricultural sector.</p>
        </CardContent>
      </Card>
    </div>
  );
}
