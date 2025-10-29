import { Users, BarChart3, Shield, Activity, ArrowRight } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

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
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    User Management
                </CardTitle>
                <CardDescription>
                    Add, edit, or remove users from the platform.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground mb-4'>
                    Access the user management panel to oversee all user accounts.
                </p>
                 <Button asChild variant="outline">
                    <Link href="/dashboard/admin/user-management">
                        Open User Management
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <BarChart3 className="h-5 w-5" />
                    Platform Analytics
                </CardTitle>
                <CardDescription>
                    View detailed analytics on user growth and platform engagement.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p className='text-sm text-muted-foreground mb-4'>
                    Explore charts on user registrations and role distributions.
                </p>
                 <Button asChild variant="outline">
                    <Link href="/dashboard/admin/analytics">
                        Open Analytics
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
