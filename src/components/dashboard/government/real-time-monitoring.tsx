'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Circle } from "lucide-react";

const alerts = [
  { region: "Odisha", type: "Drought", severity: "High", timestamp: "2024-07-29 10:45 AM" },
  { region: "Maharashtra", type: "Pest Outbreak", severity: "Medium", timestamp: "2024-07-29 10:30 AM" },
  { region: "Chhattisgarh", type: "Market Price Drop", severity: "Low", timestamp: "2024-07-29 09:15 AM" },
  { region: "Jharkhand", type: "Low Rainfall", severity: "Medium", timestamp: "2024-07-29 08:00 AM" },
  { region: "Telangana", type: "Supply Chain Delay", severity: "High", timestamp: "2024-07-28 11:00 PM" },
];

const severityColors = {
    High: "bg-red-500",
    Medium: "bg-yellow-500",
    Low: "bg-green-500"
}

export default function RealTimeMonitoring() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Real-time Monitoring</CardTitle>
        <CardDescription>Live alerts and critical events across regions.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]"></TableHead>
              <TableHead>Region</TableHead>
              <TableHead>Alert Type</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead className="text-right">Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.timestamp}>
                <TableCell>
                    <div className="flex items-center gap-2">
                        <Circle className={`h-3 w-3 ${severityColors[alert.severity as keyof typeof severityColors]} rounded-full animate-pulse`} />
                        <span className="sr-only">{alert.severity}</span>
                    </div>
                </TableCell>
                <TableCell className="font-medium">{alert.region}</TableCell>
                <TableCell>{alert.type}</TableCell>
                <TableCell>
                  <Badge variant={alert.severity === 'High' ? 'destructive' : alert.severity === 'Medium' ? 'secondary' : 'default'}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">{alert.timestamp}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
