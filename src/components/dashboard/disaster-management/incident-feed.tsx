
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Truck, CloudRain, ShieldAlert, Clock, Filter } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { List } from 'lucide-react';

const initialIncidents = [
    { type: 'logistics', severity: 'high', title: 'Road Blocked at Rasulgarh', zone: 'Rasulgarh', time: new Date(Date.now() - 1000 * 60 * 5) },
    { type: 'supply', severity: 'high', title: 'Warehouse Power Outage', zone: 'Mancheswar', time: new Date(Date.now() - 1000 * 60 * 15) },
    { type: 'weather', severity: 'medium', title: 'Minor Flooding in Old Town', zone: 'Old Town', time: new Date(Date.now() - 1000 * 60 * 45) },
    { type: 'logistics', severity: 'high', title: 'Transport Strike at Baramunda', zone: 'Baramunda', time: new Date(Date.now() - 1000 * 60 * 120) },
    { type: 'supply', severity: 'low', title: 'Low stock: Onions', zone: 'Unit 1 Market', time: new Date(Date.now() - 1000 * 60 * 180) },
    { type: 'traffic', severity: 'low', title: 'Heavy Traffic at Nayapalli', zone: 'Nayapalli', time: new Date(Date.now() - 1000 * 60 * 200) },
    { type: 'weather', severity: 'high', title: 'Cyclone Alert for Patia', zone: 'Patia', time: new Date(Date.now() - 1000 * 60 * 240) },
];

const incidentInfo = {
    logistics: { icon: Truck, color: 'text-blue-500' },
    weather: { icon: CloudRain, color: 'text-yellow-500' },
    supply: { icon: ShieldAlert, color: 'text-red-500' },
    traffic: { icon: ShieldAlert, color: 'text-orange-500' },
    low: { color: 'bg-gray-500/20 text-gray-700 dark:text-gray-400' },
    medium: { color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' },
    high: { color: 'bg-red-500/20 text-red-700 dark:text-red-400' },
};

function IncidentItem({ incident }: { incident: (typeof initialIncidents)[0] }) {
    const [timeAgo, setTimeAgo] = useState('');

    useEffect(() => {
        const update = () => setTimeAgo(formatDistanceToNow(incident.time, { addSuffix: true }));
        update();
        const interval = setInterval(update, 60000);
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
                    <span>{timeAgo || '...'}</span>
                </div>
            </div>
        </div>
    );
}

export function IncidentFeed() {
    const [incidents] = useState(initialIncidents);
    const [locationFilter, setLocationFilter] = useState('all');

    const locations = useMemo(() => {
        return ['all', ...Array.from(new Set(incidents.map(i => i.zone)))];
    }, [incidents]);

    const filteredIncidents = useMemo(() => {
        if (locationFilter === 'all') {
            return incidents;
        }
        return incidents.filter(i => i.zone === locationFilter);
    }, [incidents, locationFilter]);

    return (
        <>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle className="font-headline flex items-center gap-2">
                            <List className="h-5 w-5" />
                            Incident Feed
                        </CardTitle>
                        <CardDescription>
                            Live updates on all reported disruptions.
                        </CardDescription>
                    </div>
                    <Select value={locationFilter} onValueChange={setLocationFilter}>
                        <SelectTrigger className="w-[150px]">
                             <div className='flex items-center gap-2'>
                                <Filter className="h-4 w-4" />
                                <SelectValue placeholder="Filter by zone" />
                            </div>
                        </SelectTrigger>
                        <SelectContent>
                            {locations.map(loc => (
                                <SelectItem key={loc} value={loc}>
                                    {loc === 'all' ? 'All Zones' : loc}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[30rem]">
                    <div className="space-y-6">
                        {filteredIncidents.length > 0 ? (
                             filteredIncidents.map((incident, index) => (
                                <IncidentItem key={index} incident={incident} />
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground py-10">
                                No incidents found for the selected zone.
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </CardContent>
        </>
    );
}
