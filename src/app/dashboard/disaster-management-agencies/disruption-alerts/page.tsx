
import { AlertsByType } from '@/components/dashboard/disaster-management/alerts-by-type';
import { AlertsBySeverity } from '@/components/dashboard/disaster-management/alerts-by-severity';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldAlert, AlertTriangle, MapPin, TrendingUp } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { AlertsOverTime } from '@/components/dashboard/disaster-management/alerts-over-time';
import { AlertsByZone } from '@/components/dashboard/disaster-management/alerts-by-zone';

export default function DisruptionAlertsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <ShieldAlert className="h-8 w-8" />
          Disruption Alert Analytics
        </h1>
        <p className="text-muted-foreground">
          Detailed breakdown of all active and historical alerts.
        </p>
      </div>

       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Active Alerts"
          value="7"
          icon={<AlertTriangle className="h-5 w-5" />}
          description="Across all categories"
          index={0}
        />
        <StatsCard
          title="High-Severity Alerts"
          value="4"
          icon={<AlertTriangle className="h-5 w-5 text-destructive" />}
          description="Requiring immediate attention"
          index={1}
        />
        <StatsCard
          title="Most Affected Zone"
          value="Rasulgarh"
          icon={<MapPin className="h-5 w-5" />}
          description="Highest number of incidents"
          index={2}
        />
        <StatsCard
          title="7-Day Trend"
          value="+15%"
          icon={<TrendingUp className="h-5 w-5" />}
          description="Increase in alerts vs. last week"
          index={3}
        />
      </div>


      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Alerts Over Time</CardTitle>
                <CardDescription>Number of new alerts over the last 7 days.</CardDescription>
            </CardHeader>
            <CardContent>
                <AlertsOverTime />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Alerts by Zone</CardTitle>
                <CardDescription>Distribution of alerts across city zones.</CardDescription>
            </CardHeader>
            <CardContent>
                <AlertsByZone />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Alerts by Type</CardTitle>
                <CardDescription>Distribution of alerts based on cause.</CardDescription>
            </CardHeader>
            <CardContent>
                <AlertsByType />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Alerts by Severity</CardTitle>
                <CardDescription>Breakdown of alerts by severity level.</CardDescription>
            </CardHeader>
            <CardContent>
                <AlertsBySeverity />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
