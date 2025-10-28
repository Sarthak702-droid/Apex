
import { PriceVolatilityChart } from '@/components/dashboard/municipalities/price-volatility-chart';
import { SupplyStatusDistribution } from '@/components/dashboard/municipalities/supply-status-distribution';
import { SupplyTrends } from '@/components/dashboard/municipalities/supply-trends';
import { WastageChart } from '@/components/dashboard/municipalities/wastage-chart';
import { Card } from '@/components/ui/card';
import { ZonalSupplyBreakdown } from '@/components/dashboard/municipalities/zonal-supply-breakdown';

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
            <PriceVolatilityChart />
        </Card>
        <Card>
            <WastageChart />
        </Card>
      </div>
    </div>
  );
}
