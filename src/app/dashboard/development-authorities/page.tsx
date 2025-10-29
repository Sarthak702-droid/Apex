
import { Building, Snowflake, Truck, Shield, Map, ArrowRight } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { InfrastructureDistribution } from '@/components/dashboard/development-authorities/infrastructure-distribution';
import { LogisticsNetworkDensity } from '@/components/dashboard/development-authorities/logistics-network-density';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <Map className="h-5 w-5" />
                        City Food Zoning
                    </CardTitle>
                    <CardDescription>
                        Analyze food supply vulnerability and land use across city zones.
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow flex flex-col justify-center">
                    <p className='text-sm text-muted-foreground mb-4'>
                        Access the interactive map to view the City Food Vulnerability Index, land use patterns, and detailed zonal statistics.
                    </p>
                    <Button asChild variant="outline" className="w-fit">
                        <Link href="/dashboard/development-authorities/food-zoning">
                            Open Food Zoning Analytics
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
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
