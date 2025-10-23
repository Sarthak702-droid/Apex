'use client';

import { Landmark, Leaf, BarChart3, Map, Plus } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import PolicyAnalytics from '@/components/dashboard/government/policy-analytics';
import SustainabilityData from '@/components/dashboard/government/sustainability-data';
import RealTimeMonitoring from '@/components/dashboard/government/real-time-monitoring';
import CultivationMap from '@/components/dashboard/government/cultivation-map';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="font-headline text-3xl font-bold">Government Dashboard</h1>
         <Button asChild>
          <Link href="/dashboard/government/new-scheme">
            <Plus className="mr-2 h-4 w-4" />
            Create New Scheme
          </Link>
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Schemes"
          value="42"
          icon={<Landmark className="h-5 w-5" />}
          description="Across all regions"
        />
        <StatsCard
          title="Sustainability Index"
          value="78%"
          icon={<Leaf className="h-5 w-5" />}
          description="Improvement in sustainable practices"
        />
        <StatsCard
          title="Farmer Adoption"
          value="62%"
          icon={<BarChart3 className="h-5 w-5" />}
          description="Of promoted oilseed schemes"
        />
         <StatsCard
          title="Regional Coverage"
          value="15 States"
          icon={<Map className="h-5 w-5" />}
          description="Under Tel-Samriddhi Mission"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
           <CultivationMap />
        </div>
        <div className="lg:col-span-2">
            <PolicyAnalytics />
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 scroll-mt-20">
        <div id="real-time-monitoring" className="xl:col-span-2 scroll-mt-20">
            <RealTimeMonitoring />
        </div>
        <div id="sustainability-data" className="scroll-mt-20">
          <SustainabilityData />
        </div>
      </div>
    </div>
  );
}
