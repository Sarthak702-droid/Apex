
import { Users, BarChart3, GitGraph, DollarSign, Store, ArrowRight, Handshake, ShoppingCart } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FpoMemberGrowth } from '@/components/dashboard/fpo/fpo-member-growth';
import { FpoProduceDistribution } from '@/components/dashboard/fpo/fpo-produce-distribution';
import { FpoRevenueProfit } from '@/components/dashboard/fpo/fpo-revenue-profit';

export default function FPODashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">FPO Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
        <StatsCard
          title="Total Members"
          value="523"
          icon={<Users className="h-5 w-5" />}
          description="+12 this month"
          className="lg:col-span-1"
        />
        <StatsCard
          title="Aggregated Produce"
          value="1,250 Tons"
          icon={<GitGraph className="h-5 w-5" />}
          description="This season"
          className="lg:col-span-1"
        />
        <StatsCard
          title="Total Revenue"
          value="₹87,50,000"
          icon={<DollarSign className="h-5 w-5" />}
          description="+22% vs last season"
          className="lg:col-span-1"
        />
        <StatsCard
          title="Active Buyers"
          value="42"
          icon={<ShoppingCart className="h-5 w-5" />}
          description="Engaged this quarter"
          className="lg:col-span-1"
        />
        <StatsCard
          title="Market Linkages"
          value="15"
          icon={<Handshake className="h-5 w-5" />}
          description="Direct partnerships"
          className="lg:col-span-1"
        />
        <StatsCard
          title="Performance Index"
          value="8.5 / 10"
          icon={<BarChart3 className="h-5 w-5" />}
          description="Overall efficiency"
          className="lg:col-span-1"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                <CardTitle className="font-headline">Revenue vs. Profit</CardTitle>
                <CardDescription>Last 6 months financial performance.</CardDescription>
                </CardHeader>
                <CardContent>
                    <FpoRevenueProfit />
                </CardContent>
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <FpoProduceDistribution />
               <FpoMemberGrowth />
            </div>
        </div>

        <div className="space-y-8">
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

             <Card>
                <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Member Analytics
                </CardTitle>
                <CardDescription>
                    Analyze member growth and engagement over time.
                </CardDescription>
                </CardHeader>
                <CardContent>
                <p className='text-sm text-muted-foreground'>
                   Dive deeper into your member statistics.
                </p>
                <Button variant="outline" asChild className='mt-4'>
                    <Link href="/dashboard/fpo-farmer-producer-organization/member-stats">
                        View Member Stats <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

