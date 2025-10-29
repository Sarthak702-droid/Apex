
'use client';

import { useEffect, useState, useMemo } from 'react';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Truck, CloudRain, ShieldAlert, Clock, Filter, Loader2, TrafficCone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { List } from 'lucide-react';
import { getLiveIncidents, Incident } from '@/ai/flows/disaster-management-incidents';

type FeedIncident = Incident & { time: Date };

const incidentInfo = {
    logistics: { icon: Truck, color: 'text-blue-500' },
    weather: { icon: CloudRain, color: 'text-yellow-500' },
    supply: { icon: ShieldAlert, color: 'text-red-500' },
    traffic: { icon: TrafficCone, color: 'text-orange-500' },
};

const severityColors = {
    low: { color: 'bg-gray-500/20 text-gray-700 dark:text-gray-400' },
    medium: { color: 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400' },
    high: { color: 'bg-red-500/20 text-red-700 dark:text-red-400' },
};

function IncidentItem({ incident }: { incident: FeedIncident }) {
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
                    <Badge className={cn("capitalize", severityColors[incident.severity as keyof typeof severityColors].color)}>
                        {incident.severity}
                    </Badge>
                </div>
                 <p className="text-sm text-muted-foreground mt-1">{incident.description}</p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-2">
                    <Clock className="h-3 w-3" />
                    <span>{timeAgo || '...'}</span>
                    <span className="font-bold">&middot;</span>
                    <span>{incident.zone}</span>
                </div>
            </div>
        </div>
    );
}

export function IncidentFeed() {
    const [incidents, setIncidents] = useState<FeedIncident[]>([]);
    const [locationFilter, setLocationFilter] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
      async function fetchIncidents() {
        setLoading(true);
        setError(null);
        try {
            const liveIncidents = await getLiveIncidents();
            // Assign a slightly different time to each to simulate a real-time feed
            const incidentsWithTime = liveIncidents.map((inc, index) => ({
                ...inc,
                time: new Date(Date.now() - 1000 * 60 * (index * 3 + Math.random() * 5)),
            }));
            setIncidents(incidentsWithTime);
        } catch (e) {
            console.error(e);
            setError("Failed to load live incident data. Please try again later.");
        } finally {
            setLoading(false);
        }
      }

      fetchIncidents();
      const interval = setInterval(fetchIncidents, 60000); // Refresh every minute
      return () => clearInterval(interval);
    }, []);

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
                            Live Incident Feed
                        </CardTitle>
                        <CardDescription>
                            AI-generated updates on potential disruptions.
                        </CardDescription>
                    </div>
                    {loading && incidents.length === 0 ? null : (
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
                    )}
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[30rem]">
                     {loading && incidents.length === 0 && (
                        <div className="flex items-center justify-center h-full">
                            <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                <Loader2 className="h-8 w-8 animate-spin" />
                                <p>Fetching live incidents...</p>
                            </div>
                        </div>
                    )}
                    {error && (
                        <div className="text-center text-destructive py-10">{error}</div>
                    )}
                    {!loading && !error && (
                        <div className="space-y-6">
                            {filteredIncidents.length > 0 ? (
                                filteredIncidents.map((incident, index) => (
                                    <IncidentItem key={`${incident.title}-${index}`} incident={incident} />
                                ))
                            ) : (
                                <div className="text-center text-muted-foreground py-10">
                                    No incidents found for the selected zone.
                                </div>
                            )}
                        </div>
                    )}
                </ScrollArea>
            </CardContent>
        </>
    );
}
