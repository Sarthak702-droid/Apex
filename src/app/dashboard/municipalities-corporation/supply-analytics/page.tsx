import { PriceVolatilityChart } from '@/components/dashboard/municipalities/price-volatility-chart';
import { SupplyStatusDistribution } from '@/components/dashboard/municipalities/supply-status-distribution';
import { SupplyTrends } from '@/components/dashboard/municipalities/supply-trends';
import { ZonalSupplyBreakdown } from '@/components/dashboard/municipalities/zonal-supply-breakdown';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function SupplyAnalyticsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold">Supply Analytics</h1>
        <p className="text-muted-foreground">
          In-depth analysis of supply trends and distribution across all city zones.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="lg:col-span-2">
            <SupplyTrends />
        </Card>
        <Card>
            <SupplyStatusDistribution />
        </Card>
        <Card>
            <PriceVolatilityChart />
        </Card>
      </div>
      <Card className="lg:col-span-2">
        <CardHeader>
            <CardTitle className="font-headline">Zonal Supply Breakdown</CardTitle>
            <CardDescription>
                Comparison of key commodity supply across different city zones.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <ZonalSupplyBreakdown />
        </CardContent>
      </Card>
    </div>
  );
}
