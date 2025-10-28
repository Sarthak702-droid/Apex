import { StatsCard } from '@/components/dashboard/stats-card';
import {
  ShieldCheck,
  Siren,
  LineChart,
  Radar,
} from 'lucide-react';
import { SupplyTrends } from '@/components/dashboard/municipalities/supply-trends';
import { ActiveAlerts } from '@/components/dashboard/municipalities/active-alerts';
import { SupplyStatusDistribution } from '@/components/dashboard/municipalities/supply-status-distribution';

export default function MunicipalitiesCorporationDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">
        City Resilience Dashboard
      </h1>
      <p className="text-muted-foreground">
        Real-time monitoring and predictive analytics for urban food security
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Food Security Score"
          value="65/100"
          icon={<ShieldCheck className="h-5 w-5" />}
          description={<span className="text-green-600">Good</span>}
          index={0}
        />
        <StatsCard
          title="Active Alerts"
          value="2"
          icon={<Siren className="h-5 w-5 text-destructive" />}
          description="2 critical"
          index={1}
        />
        <StatsCard
          title="Avg Supply Level"
          value="3150 kg"
          icon={<LineChart className="h-5 w-5" />}
          description="Last 24h"
          index={2}
        />
        <StatsCard
          title="Monitored Zones"
          value="3"
          icon={<Radar className="h-5 w-5" />}
          description="City-wide"
          index={3}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <SupplyTrends />
          <SupplyStatusDistribution />
        </div>
        <div className="lg:col-span-1">
          <ActiveAlerts />
        </div>
      </div>
    </div>
  );
}
