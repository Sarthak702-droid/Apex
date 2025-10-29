import { PlatformAnalytics } from '@/components/dashboard/admin/platform-analytics';
import { UserRegistrationChart } from '@/components/dashboard/admin/user-registration-chart';
import { UserRoleDistribution } from '@/components/dashboard/admin/user-role-distribution';

export default function AnalyticsPage() {
    return (
        <div className="space-y-8">
            <h1 className="font-headline text-3xl font-bold">Platform Analytics</h1>
            <PlatformAnalytics />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <UserRoleDistribution />
                <UserRegistrationChart />
            </div>
        </div>
    );
}
