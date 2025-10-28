import { StatsCard } from '@/components/dashboard/stats-card';
import {
  ShieldCheck,
  Siren,
  LineChart,
  Radar,
  AlertTriangle,
} from 'lucide-react';
import { ActiveAlerts } from '@/components/dashboard/municipalities/active-alerts';
import { EmergencyPlanning } from '@/components/dashboard/municipalities/emergency-planning';
import { Separator } from '@/components/ui/separator';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { SupplyTrends } from '@/components/dashboard/municipalities/supply-trends';
import { SupplyStatusDistribution } from '@/components/dashboard/municipalities/supply-status-distribution';

export default function MunicipalitiesCorporationDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">
          City Resilience Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time monitoring and predictive analytics for urban food security
        </p>
      </div>

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
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-headline text-2xl font-bold">Supply Analytics</CardTitle>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard/municipalities-corporation/supply-analytics">
                    View Details <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </CardHeader>
            <div className='p-6 pt-0 grid md:grid-cols-2 gap-6'>
                <SupplyTrends />
                <SupplyStatusDistribution />
            </div>
          </Card>
        </div>
        <div className="lg:col-span-1">
           <Card className="h-full">
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                Active Alerts
              </CardTitle>
            </CardHeader>
            <ActiveAlerts />
          </Card>
        </div>
      </div>
      
      <Separator />

      <div id="planning" className="space-y-4">
        <h2 className="font-headline text-2xl font-bold">Emergency Planning</h2>
        <EmergencyPlanning />
      </div>

    </div>
  );
}
