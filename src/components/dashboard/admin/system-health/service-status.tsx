
'use client';

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, XCircle, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const services = [
  { name: 'API Gateway', status: 'Operational', uptime: '99.99%', responseTime: '80ms' },
  { name: 'Authentication Service', status: 'Operational', uptime: '100%', responseTime: '150ms' },
  { name: 'Database', status: 'Operational', uptime: '99.98%', responseTime: '45ms' },
  { name: 'AI Model Service', status: 'Degraded Performance', uptime: '99.80%', responseTime: '2500ms' },
  { name: 'Logistics API', status: 'Operational', uptime: '99.95%', responseTime: '110ms' },
  { name: 'Notification Service', status: 'Outage', uptime: '98.50%', responseTime: 'N/A' },
];

const statusInfo = {
  Operational: { icon: CheckCircle2, color: 'text-green-500' },
  'Degraded Performance': { icon: AlertTriangle, color: 'text-yellow-500' },
  Outage: { icon: XCircle, color: 'text-destructive' },
};

export function ServiceStatus() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Service Status</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {services.map((service) => {
          const InfoIcon = statusInfo[service.status as keyof typeof statusInfo].icon;
          const color = statusInfo[service.status as keyof typeof statusInfo].color;
          return (
            <div key={service.name} className="flex items-center justify-between p-2 rounded-md hover:bg-secondary/50">
              <div>
                <p className="font-semibold">{service.name}</p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{service.uptime} uptime</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{service.responseTime}</span>
                </div>
              </div>
              <div className={cn("flex items-center gap-2 font-semibold text-sm", color)}>
                <InfoIcon className="h-4 w-4" />
                <span>{service.status}</span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
