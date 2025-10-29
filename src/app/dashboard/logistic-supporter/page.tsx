
import { StatsCard } from '@/components/dashboard/stats-card';
import { Truck, Timer, Percent, Container } from 'lucide-react';
import { HubManagement } from '@/components/dashboard/logistics/hub-management';
import { RouteOptimization } from '@/components/dashboard/logistics/route-optimization';
import { FleetManagement } from '@/components/dashboard/logistics/fleet-management';

export default function LogisticSupporterDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Truck className="h-8 w-8" />
          Logistics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time overview of shipments, routes, and fleet status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Shipments"
          value="142"
          icon={<Container className="h-5 w-5" />}
          description="Across all routes"
          index={0}
        />
        <StatsCard
          title="On-Time Delivery"
          value="98.2%"
          icon={<Percent className="h-5 w-5" />}
          description="+1.5% from last week"
          index={1}
        />
        <StatsCard
          title="Avg. Transit Time"
          value="6.4 hours"
          icon={<Timer className="h-5 w-5" />}
          description="-0.2h from last week"
          index={2}
        />
        <StatsCard
          title="Fleet Utilization"
          value="85%"
          icon={<Truck className="h-5 w-5" />}
          description="25 of 30 vehicles active"
          index={3}
        />
      </div>

      <div id="hub" className="scroll-mt-20">
        <HubManagement />
      </div>

      <div id="routes" className="scroll-mt-20">
        <RouteOptimization />
      </div>

      <div id="fleet" className="scroll-mt-20">
        <FleetManagement />
      </div>
    </div>
  );
}
