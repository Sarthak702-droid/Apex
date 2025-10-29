
import { Shield, Clock, AlertTriangle, Cpu } from 'lucide-react';
import { StatsCard } from '@/components/dashboard/stats-card';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ServiceStatus } from '@/components/dashboard/admin/system-health/service-status';
import { ApiResponseTime } from '@/components/dashboard/admin/system-health/api-response-time';
import { ErrorRateChart } from '@/components/dashboard/admin/system-health/error-rate-chart';

export default function SystemHealthPage() {
    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
                    <Shield className="h-8 w-8" />
                    System Health
                </h1>
                <p className="text-muted-foreground">
                    Real-time monitoring of platform services and performance.
                </p>
            </div>
            
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Overall Uptime"
                    value="99.98%"
                    icon={<Shield className="h-5 w-5 text-green-500" />}
                    description="Last 30 days"
                    index={0}
                />
                <StatsCard
                    title="Avg. API Response"
                    value="120ms"
                    icon={<Clock className="h-5 w-5" />}
                    description="Last 24 hours"
                    index={1}
                />
                <StatsCard
                    title="Error Rate"
                    value="0.05%"
                    icon={<AlertTriangle className="h-5 w-5 text-yellow-500" />}
                    description="Last 24 hours"
                    index={2}
                />
                <StatsCard
                    title="CPU Utilization"
                    value="35%"
                    icon={<Cpu className="h-5 w-5" />}
                    description="Normal load"
                    index={3}
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">API Response Time (ms)</CardTitle>
                            <CardDescription>Average response time over the last 24 hours.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ApiResponseTime />
                        </CardContent>
                    </Card>
                </div>
                <ServiceStatus />
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">API Error Rate (%)</CardTitle>
                    <CardDescription>Percentage of failed API requests over the last 24 hours.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ErrorRateChart />
                </CardContent>
            </Card>
        </div>
    );
}
