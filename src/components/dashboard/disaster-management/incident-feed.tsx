
'use client';

import { useEffect, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Truck, CloudRain, ShieldAlert, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const initialIncidents = [
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

function IncidentItem({ incident }: { incident: (typeof initialIncidents)[0] }) {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        // This effect runs only on the client, after hydration
        setTimeAgo(formatDistanceToNow(incident.time, { addSuffix: true }));

        // Optional: Update the time every minute
        const interval = setInterval(() => {
            setTimeAgo(formatDistanceToNow(incident.time, { addSuffix: true }));
        }, 60000);

        return () => clearInterval(interval);
    }, [incident.time]);
    
    const Icon = incidentInfo[incident.type as keyof typeof incidentInfo].icon;

    return (
        <div className="flex items-start gap-4">
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
                    {/* Render placeholder on server, actual time on client */}
                    <span>{timeAgo || '...'}</span>
                </div>
            </div>
        </div>
    );
}

export function IncidentFeed() {
    // Use state to hold incidents to avoid re-calculating Date.now() on every render
    const [incidents] = useState(initialIncidents);

    return (
        <ScrollArea className="h-[35rem]">
            <div className="space-y-6">
                {incidents.map((incident, index) => (
                    <IncidentItem key={index} incident={incident} />
                ))}
            </div>
        </ScrollArea>
    );
}
