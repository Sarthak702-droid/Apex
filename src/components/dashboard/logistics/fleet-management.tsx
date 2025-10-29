
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const fleetData = [
  { vehicleId: 'OD02AB1234', driver: 'Sanjay Kumar', status: 'In-Transit', location: 'Patia', destination: 'Mancheswar Hub', maintenance: '2024-08-15' },
  { vehicleId: 'OD02CD5678', driver: 'Manish Das', status: 'Delayed', location: 'Kalpana Square', destination: 'Old Town', maintenance: '2024-09-02' },
  { vehicleId: 'OD02EF9012', driver: 'Anil Sahoo', status: 'In-Transit', location: 'Jaydev Vihar', destination: 'Nayapalli', maintenance: '2024-08-20' },
  { vehicleId: 'OD02GH3456', driver: 'Prakash Jena', status: 'Idle', location: 'Mancheswar Hub', destination: 'N/A', maintenance: '2024-07-30' },
  { vehicleId: 'OD02IJ7890', driver: 'Sunil Behera', status: 'Maintenance', location: 'Garage', destination: 'N/A', maintenance: '2024-07-25' },
];

const statusColors: { [key: string]: string } = {
  'In-Transit': 'bg-blue-500/20 text-blue-700 dark:text-blue-400',
  'Delivered': 'bg-green-500/20 text-green-700 dark:text-green-400',
  'Delayed': 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400',
  'Idle': 'bg-gray-500/20 text-gray-700 dark:text-gray-400',
  'Maintenance': 'bg-orange-500/20 text-orange-700 dark:text-orange-400',
};

const maintenanceSchedule = [
    { vehicleId: 'OD02GH3456', service: 'Oil Change', date: '2024-07-30', priority: 'low' },
    { vehicleId: 'OD02IJ7890', service: 'Brake Repair', date: '2024-07-25', priority: 'high' },
    { vehicleId: 'OD02AB1234', service: 'Tire Rotation', date: '2024-08-15', priority: 'medium' },
];

export function FleetManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Briefcase className="h-6 w-6" />
            Fleet Management
        </CardTitle>
        <CardDescription>
          Track vehicle status, driver assignments, and maintenance schedules.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div>
            <h3 className="font-semibold mb-4">Live Fleet Status</h3>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vehicle ID</TableHead>
                            <TableHead>Driver</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Current Location</TableHead>
                            <TableHead className="text-right">Destination</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {fleetData.map((vehicle) => (
                            <TableRow key={vehicle.vehicleId}>
                                <TableCell className="font-mono">{vehicle.vehicleId}</TableCell>
                                <TableCell>{vehicle.driver}</TableCell>
                                <TableCell>
                                    <Badge variant="outline" className={cn(statusColors[vehicle.status])}>
                                        {vehicle.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{vehicle.location}</TableCell>
                                <TableCell className="text-right">{vehicle.destination}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
         <div>
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Wrench className="h-5 w-5"/>Upcoming Maintenance</h3>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Vehicle ID</TableHead>
                            <TableHead>Service Required</TableHead>
                            <TableHead>Due Date</TableHead>
                            <TableHead className="text-right">Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {maintenanceSchedule.map((item) => (
                            <TableRow key={item.vehicleId}>
                                <TableCell className="font-mono">{item.vehicleId}</TableCell>
                                <TableCell>{item.service}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell className="text-right">
                                     <Badge variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'secondary' : 'outline'} className='capitalize'>{item.priority}</Badge>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
