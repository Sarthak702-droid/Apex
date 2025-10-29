
import { InfrastructureDistribution } from '@/components/dashboard/development-authorities/infrastructure-distribution';
import { LogisticsNetworkDensity } from '@/components/dashboard/development-authorities/logistics-network-density';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
            <InfrastructureDistribution />
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline">Logistics Network Density</CardTitle>
                <CardDescription>Connectivity and efficiency of transport routes.</CardDescription>
            </CardHeader>
            <LogisticsNetworkDensity />
        </Card>
      </div>
    </div>
  );
}
