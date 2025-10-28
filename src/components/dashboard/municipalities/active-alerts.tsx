'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, MapPin, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

const alerts = [
  {
    title: 'Tomato Shortage Warning',
    level: 'high',
    description: 'Expected heavy rainfall may impact tomato supply in Zone A. Recommend activating emergency procurement.',
    zone: 'Zone A',
    time: 'Oct 24, 3:34 PM',
  },
  {
    title: 'Rice Price Spike Detected',
    level: 'critical',
    description: 'Rice prices increased by 15% in the past 24 hours. Supply chain disruption detected in Zone C.',
    zone: 'Zone C',
    time: 'Oct 24, 3:34 PM',
  },
  {
    title: 'Transport Route Disrupted',
    level: 'medium',
    description: 'Main distribution route blocked due to road construction. Consider alternate routes for Zone B.',
    zone: 'Zone B',
    time: 'Oct 24, 3:34 PM',
  },
];

const levelColors = {
  high: 'border-amber-500/50 bg-amber-500/10 text-amber-700 dark:text-amber-400',
  critical: 'border-red-500/50 bg-red-500/10 text-red-700 dark:text-red-400',
  medium: 'border-yellow-500/50 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400',
};
const badgeColors = {
    high: 'bg-amber-500/80',
    critical: 'bg-red-500/80',
    medium: 'bg-yellow-500/80'
}

export function ActiveAlerts() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-destructive" />
          Active Alerts
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert, index) => (
          <div key={index} className={cn("p-4 rounded-lg border", levelColors[alert.level as keyof typeof levelColors])}>
            <div className="flex justify-between items-center mb-1">
              <h4 className="font-semibold">{alert.title}</h4>
              <Badge className={cn("capitalize text-white", badgeColors[alert.level as keyof typeof badgeColors])}>
                {alert.level}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
            <div className="flex justify-between items-center text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3"/>
                    <span>{alert.zone}</span>
                </div>
                <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3"/>
                    <span>{alert.time}</span>
                </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
