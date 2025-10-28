import { Users, BarChart3, GitGraph, DollarSign, Store, ArrowRight } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FpoMemberGrowth } from '@/components/dashboard/fpo/fpo-member-growth';
import { FpoProduceDistribution } from '@/components/dashboard/fpo/fpo-produce-distribution';

export default function FPODashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">FPO Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value="523"
          icon={<Users className="h-5 w-5" />}
          description="+12 new members this month"
        />
        <StatsCard
          title="Aggregated Produce"
          value="1,250 Tons"
          icon={<GitGraph className="h-5 w-5" />}
          description="Total this season"
        />
        <StatsCard
          title="Total Revenue"
          value="₹87,50,000"
          icon={<DollarSign className="h-5 w-5" />}
          description="+22% vs last season"
        />
        <StatsCard
          title="Performance Index"
          value="8.5 / 10"
          icon={<BarChart3 className="h-5 w-5" />}
          description="Overall FPO efficiency"
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-headline flex items-center gap-2">
            <Store className="h-5 w-5 text-primary" />
            Mandi Price Tracker
          </CardTitle>
          <CardDescription>
            Access real-time commodity prices from markets across the country.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className='text-sm text-muted-foreground'>
            Use this tool to make informed decisions about where and when to sell your produce.
          </p>
          <Button variant="outline" asChild className='mt-4'>
              <Link href="/dashboard/fpo-farmer-producer-organization/mandi-prices">
                  View Mandi Prices <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <FpoMemberGrowth />
        <FpoProduceDistribution />
      </div>
    </div>
  );
}
