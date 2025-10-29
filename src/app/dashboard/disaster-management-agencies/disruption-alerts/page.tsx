
import { AlertsByType } from '@/components/dashboard/disaster-management/alerts-by-type';
import { AlertsBySeverity } from '@/components/dashboard/disaster-management/alerts-by-severity';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { ShieldAlert } from 'lucide-react';

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
