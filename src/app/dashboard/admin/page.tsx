import { Users, BarChart3, Shield, Activity } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { UserManagement } from '@/components/dashboard/admin/user-management';
import { PlatformAnalytics } from '@/components/dashboard/admin/platform-analytics';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Admin Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Users"
          value="12,405"
          icon={<Users className="h-5 w-5" />}
          description="+150 in the last 7 days"
        />
        <StatsCard
          title="Platform Health"
          value="99.9% Uptime"
          icon={<Shield className="h-5 w-5" />}
          description="All systems operational"
        />
        <StatsCard
          title="Active Sessions"
          value="1,203"
          icon={<Activity className="h-5 w-5" />}
          description="Users currently online"
        />
        <StatsCard
          title="Reports Generated"
          value="582"
          icon={<BarChart3 className="h-5 w-5" />}
          description="AI reports created today"
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UserManagement />
        <PlatformAnalytics />
      </div>
    </div>
  );
}
