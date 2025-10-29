
import { ShieldAlert, Map, List, Users, Package, Truck } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { DisruptionMap } from '@/components/dashboard/disaster-management/disruption-map';
import { IncidentFeed } from '@/components/dashboard/disaster-management/incident-feed';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

export default function DisasterManagementDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
            <ShieldAlert className="h-8 w-8" />
            Crisis Management Center
        </h1>
        <p className="text-muted-foreground">
          Real-time monitoring of food supply chain disruptions and incidents.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Incidents"
          value="3"
          icon={<ShieldAlert className="h-5 w-5 text-destructive" />}
          description="2 high-severity"
          index={0}
        />
        <StatsCard
          title="Affected Zones"
          value="4"
          icon={<Map className="h-5 w-5" />}
          description="Patia, Old Town, Baramunda..."
          index={1}
        />
        <StatsCard
          title="Emergency Stockpiles"
          value="72%"
          icon={<Package className="h-5 w-5" />}
          description="Capacity utilization"
          index={2}
        />
        <StatsCard
          title="Response Teams"
          value="8 / 12"
          icon={<Users className="h-5 w-5" />}
          description="Teams deployed"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card className='h-full'>
                 <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        Live Disruption Map
                    </CardTitle>
                    <CardDescription>
                        Real-time visualization of supply chain incidents across the city.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <DisruptionMap />
                </CardContent>
            </Card>
        </div>
        <div>
          <Card>
            <IncidentFeed />
          </Card>
        </div>
      </div>
    </div>
  );
}
