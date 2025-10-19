'use client';

import { Landmark, Leaf, BarChart3, FileSpreadsheet } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import PolicyAnalytics from '@/components/dashboard/government/policy-analytics';
import SustainabilityData from '@/components/dashboard/government/sustainability-data';
import RealTimeMonitoring from '@/components/dashboard/government/real-time-monitoring';

export default function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Government Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Policies Implemented"
          value="25"
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
          title="Real-time Alerts"
          value="15"
          icon={<BarChart3 className="h-5 w-5" />}
          description="Critical alerts today"
        />
         <StatsCard
          title="Data Reports"
          value="1,200+"
          icon={<FileSpreadsheet className="h-5 w-5" />}
          description="Total reports available"
        />
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 scroll-mt-20">
        <div id="policy-analytics" className="xl:col-span-2">
          <PolicyAnalytics />
        </div>
        <div id="sustainability-data" className="scroll-mt-20">
          <SustainabilityData />
        </div>
      </div>
      <div id="real-time-monitoring" className="scroll-mt-20">
        <RealTimeMonitoring />
      </div>
    </div>
  );
}
