
import { InfrastructureDistribution } from '@/components/dashboard/development-authorities/infrastructure-distribution';
import { LogisticsNetworkDensity } from '@/components/dashboard/development-authorities/logistics-network-density';
import { TransportationCostAnalysis } from '@/components/dashboard/development-authorities/transportation-cost-analysis';
import { VehicleTurnaroundTime } from '@/components/dashboard/development-authorities/vehicle-turnaround-time';
import { Card, CardDescription, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Truck } from 'lucide-react';

export default function LogisticsAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Truck className="h-8 w-8" />
          Logistics Analytics
        </h1>
        <p className="text-muted-foreground">
          Detailed analysis of logistics infrastructure and network efficiency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Infrastructure by Zone</CardTitle>
                <CardDescription>Distribution of key food storage facilities.</CardDescription>
            </CardHeader>
            <CardContent>
                <InfrastructureDistribution />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Logistics Network Density</CardTitle>
                <CardDescription>Connectivity and efficiency of transport routes.</CardDescription>
            </CardHeader>
            <CardContent>
                <LogisticsNetworkDensity />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Vehicle Turnaround Time</CardTitle>
                <CardDescription>Average time spent by vehicles at logistics hubs (in hours).</CardDescription>
            </CardHeader>
            <CardContent>
                <VehicleTurnaroundTime />
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Transportation Cost Analysis</CardTitle>
                <CardDescription>Cost per Ton-Kilometer over the last 6 months.</CardDescription>
            </CardHeader>
            <CardContent>
                <TransportationCostAnalysis />
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
