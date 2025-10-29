
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';
import { Warehouse } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const warehouseData = [
  { name: 'Mancheswar Hub', capacity: 90, turnaround: '4.5h', live: 75, temp: '4°C' },
  { name: 'Patia Cold Storage', capacity: 82, turnaround: '3.2h', live: 65, temp: '2°C' },
  { name: 'Khandagiri Hub', capacity: 65, turnaround: '5.1h', live: 50, temp: '5°C' },
  { name: 'Baramunda Transit', capacity: 95, turnaround: '2.8h', live: 90, temp: 'N/A' },
];

const shipmentStatusData = [
    { name: 'In-Transit', value: 85, fill: 'hsl(var(--chart-2))' },
    { name: 'Delivered', value: 42, fill: 'hsl(var(--chart-1))' },
    { name: 'Delayed', value: 8, fill: 'hsl(var(--destructive))' },
    { name: 'Pending', value: 15, fill: 'hsl(var(--chart-4))' },
];

export function HubManagement() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
            <Warehouse className="h-6 w-6" />
            Hub Management
        </CardTitle>
        <CardDescription>
          Live overview of warehouse capacity and shipment statuses.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <h3 className="font-semibold mb-4">Warehouse Capacity & Status</h3>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Warehouse</TableHead>
                            <TableHead>Live Capacity</TableHead>
                            <TableHead className="text-center">Avg. Turnaround</TableHead>
                            <TableHead className="text-right">Cold Storage</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {warehouseData.map((warehouse) => (
                            <TableRow key={warehouse.name}>
                                <TableCell className="font-medium">{warehouse.name}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Progress value={warehouse.capacity} className="w-24 h-2" />
                                        <span className="text-xs text-muted-foreground">{warehouse.capacity}%</span>
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">{warehouse.turnaround}</TableCell>
                                <TableCell className="text-right">{warehouse.temp}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-4 text-center">Shipment Status</h3>
             <ChartContainer config={{}} className="h-64 w-full">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={shipmentStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} labelLine={false} label>
                            {shipmentStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                        </Pie>
                        <Legend />
                        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
}
