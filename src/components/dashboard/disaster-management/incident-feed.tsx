
'use client';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Truck, CloudRain, ShieldAlert, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const incidents = [
    { type: 'logistics', severity: 'high', title: 'Road Blocked at Rasulgarh', time: new Date(Date.now() - 1000 * 60 * 5) },
    { type: 'supply', severity: 'high', title: 'Warehouse Power Outage', time: new Date(Date.now() - 1000 * 60 * 15) },
    { type: 'weather', severity: 'medium', title: 'Minor Flooding in Old Town', time: new Date(Date.now() - 1000 * 60 * 45) },
    { type: 'logistics', severity: 'high', title: 'Transport Strike at Baramunda', time: new Date(Date.now() - 1000 * 60 * 120) },
    { type: 'supply', severity: 'low', title: 'Low stock: Onions', time: new Date(Date.now() - 1000 * 60 * 180) },
];

const incidentInfo = {
    logistics: { icon: Truck, color: 'text-blue-500' },
    weather: { icon: CloudRain, color: 'text-yellow-500' },
    supply: { icon: ShieldAlert, color: 'text-red-500' },
    low: { color: 'bg-gray-500/20 text-gray-700 dark:text-gray-400' },
    medium: { color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' },
    high: { color: 'bg-red-500/20 text-red-700 dark:text-red-400' },
};

export function IncidentFeed() {
    return (
        <ScrollArea className="h-[35rem]">
            <div className="space-y-6">
                {incidents.map((incident, index) => {
                    const Icon = incidentInfo[incident.type as keyof typeof incidentInfo].icon;
                    return (
                        <div key={index} className="flex items-start gap-4">
                            <div className="flex-shrink-0">
                                <Icon className={cn("h-5 w-5 mt-1", incidentInfo[incident.type as keyof typeof incidentInfo].color)} />
                            </div>
                            <div className='w-full'>
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold text-sm">{incident.title}</p>
                                    <Badge className={cn("capitalize", incidentInfo[incident.severity as keyof typeof incidentInfo].color)}>
                                        {incident.severity}
                                    </Badge>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                    <Clock className="h-3 w-3" />
                                    <span>{formatDistanceToNow(incident.time, { addSuffix: true })}</span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </ScrollArea>
    );
}