
import { Building, Snowflake, Truck, Shield, Map } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FoodVulnerabilityMap } from '@/components/dashboard/development-authorities/food-vulnerability-map';
import { InfrastructureDistribution } from '@/components/dashboard/development-authorities/infrastructure-distribution';
import { LogisticsNetworkDensity } from '@/components/dashboard/development-authorities/logistics-network-density';

export default function DevelopmentAuthoritiesDashboard() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Building className="h-8 w-8" />
          Infrastructure & Planning Dashboard
        </h1>
        <p className="text-muted-foreground">
          Monitor and plan urban food supply infrastructure.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Warehouses"
          value="128"
          icon={<Building className="h-5 w-5" />}
          description="+5 added this quarter"
        />
        <StatsCard
          title="Cold Storage Capacity"
          value="75,000 MT"
          icon={<Snowflake className="h-5 w-5" />}
          description="Operating at 85% capacity"
        />
        <StatsCard
          title="Logistics Hubs"
          value="24"
          icon={<Truck className="h-5 w-5" />}
          description="Covering all major zones"
        />
        <StatsCard
          title="Infrastructure Score"
          value="82/100"
          icon={<Shield className="h-5 w-5" />}
          description="Overall resilience rating"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
            <Card className="h-full">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        City Food Vulnerability Index
                    </CardTitle>
                    <CardDescription>
                        Color-coded map showing zones most at risk of food shortages.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FoodVulnerabilityMap />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
            <InfrastructureDistribution />
            <LogisticsNetworkDensity />
        </div>
      </div>
    </div>
  );
}
