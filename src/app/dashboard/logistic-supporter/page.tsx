
import { StatsCard } from '@/components/dashboard/stats-card';
import { Truck, Timer, Percent, Container, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Warehouse, Map } from 'lucide-react';


export default function LogisticSupporterDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Truck className="h-8 w-8" />
          Logistics Dashboard
        </h1>
        <p className="text-muted-foreground">
          Real-time overview of shipments, routes, and fleet status.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Active Shipments"
          value="142"
          icon={<Container className="h-5 w-5" />}
          description="Across all routes"
          index={0}
        />
        <StatsCard
          title="On-Time Delivery"
          value="98.2%"
          icon={<Percent className="h-5 w-5" />}
          description="+1.5% from last week"
          index={1}
        />
        <StatsCard
          title="Avg. Transit Time"
          value="6.4 hours"
          icon={<Timer className="h-5 w-5" />}
          description="-0.2h from last week"
          index={2}
        />
        <StatsCard
          title="Fleet Utilization"
          value="85%"
          icon={<Truck className="h-5 w-5" />}
          description="25 of 30 vehicles active"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Warehouse className="h-5 w-5" />
                    Hub Management
                </CardTitle>
                <CardDescription>
                    Live overview of warehouse capacity and shipment statuses.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
                <p className='text-sm text-muted-foreground mb-4'>
                    View detailed stats on warehouse capacity, turnaround times, and shipment statuses.
                </p>
                <Button asChild variant="outline" className="w-fit">
                    <Link href="/dashboard/logistic-supporter/hub-management">
                        Open Hub Management
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Map className="h-5 w-5" />
                    Route Optimization
                </CardTitle>
                <CardDescription>
                    Live map of optimized delivery routes and potential delays.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
                <p className='text-sm text-muted-foreground mb-4'>
                    Analyze active delivery routes, track vehicles, and view real-time delay alerts.
                </p>
                <Button asChild variant="outline" className="w-fit">
                    <Link href="/dashboard/logistic-supporter/route-optimization">
                        Open Route Map
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
        <Card className="flex flex-col">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <Briefcase className="h-5 w-5" />
                    Fleet Management
                </CardTitle>
                <CardDescription>
                    Track vehicle status, driver assignments, and maintenance.
                </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow flex flex-col justify-center">
                <p className='text-sm text-muted-foreground mb-4'>
                    Access live fleet status and view upcoming maintenance schedules for all vehicles.
                </p>
                <Button asChild variant="outline" className="w-fit">
                    <Link href="/dashboard/logistic-supporter/fleet-management">
                        Open Fleet Details
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
