
'use client';

import { useEffect, useState } from 'react';
import { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { List, Loader2, Truck, CloudRain, ShieldAlert, TrafficCone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

type Incident = {
  id: string;
  type: 'logistics' | 'weather' | 'supply' | 'traffic';
  severity: 'low' | 'medium' | 'high';
  title: string;
  description: string;
  zone: string;
  timestamp: Date;
};

const allIncidents: Omit<Incident, 'id' | 'timestamp'>[] = [
  {
    type: 'logistics',
    severity: 'high',
    title: 'Road Blocked at Rasulgarh',
    description: 'Major accident blocking the highway. Supply trucks are being rerouted.',
    zone: 'Rasulgarh'
  },
  {
    type: 'weather',
    severity: 'medium',
    title: 'Minor Flooding in Old Town',
    description: 'Heavy rainfall has caused waterlogging, slowing down last-mile delivery vehicles.',
    zone: 'Old Town'
  },
  {
    type: 'supply',
    severity: 'high',
    title: 'Warehouse Power Outage',
    description: 'Power outage at Mancheswar central warehouse. Cold storage at risk.',
    zone: 'Mancheswar'
  },
  {
    type: 'logistics',
    severity: 'high',
    title: 'Transport Strike at Baramunda',
    description: 'Inter-state bus terminal transport strike is affecting vegetable supply from other states.',
    zone: 'Baramunda'
  },
  {
    type: 'traffic',
    severity: 'low',
    title: 'Heavy Traffic at Nayapalli',
    description: 'Festival procession causing traffic slowdown. Minor delays expected for deliveries.',
    zone: 'Nayapalli'
  },
  {
    type: 'weather',
    severity: 'high',
    title: 'Cyclone Alert for Patia',
    description: 'Cyclone warning issued. Residents advised to stock up. Emergency supply routes activated.',
    zone: 'Patia'
  },
   {
    type: 'supply',
    severity: 'medium',
    title: 'Potato Price Spike',
    description: 'Potato prices have jumped 20% due to supply issues from West Bengal.',
    zone: 'City-wide'
  },
   {
    type: 'traffic',
    severity: 'medium',
    title: 'Vani Vihar Flyover Congestion',
    description: 'Breakdown of a heavy vehicle on the flyover is causing major traffic delays.',
    zone: 'Saheed Nagar'
  }
];

const incidentInfo = {
    logistics: { icon: Truck, color: 'text-blue-500' },
    weather: { icon: CloudRain, color: 'text-yellow-500' },
    supply: { icon: ShieldAlert, color: 'text-red-500' },
    traffic: { icon: TrafficCone, color: 'text-orange-500' },
};

const severityBadge = {
    low: 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400',
    medium: 'bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400',
    high: 'bg-red-500/20 text-red-700 dark:bg-red-500/10 dark:text-red-400',
}


export function IncidentFeed() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize with first 5 incidents
    const initialIncidents = allIncidents.slice(0, 5).map((inc, i) => ({
      ...inc,
      id: `incident-${i}`,
      timestamp: new Date(),
    }));
    setIncidents(initialIncidents);
    setLoading(false);

    let incidentCounter = 5;
    const interval = setInterval(() => {
      setIncidents(prevIncidents => {
        // Remove the oldest incident
        const newIncidents = prevIncidents.slice(1);
        
        // Add a new incident from the list
        const nextIncidentData = allIncidents[incidentCounter % allIncidents.length];
        const newIncident = {
          ...nextIncidentData,
          id: `incident-${Date.now()}`,
          timestamp: new Date(),
        };
        incidentCounter++;

        return [newIncident, ...newIncidents];
      });
    }, 5000); // Add a new incident every 5 seconds

    return () => clearInterval(interval);
  }, []);

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
                            Simulated real-time supply chain events.
                        </CardDescription>
                    </div>
                    {loading && <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />}
                </div>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[30rem]">
                {loading && (
                    <div className="flex items-center justify-center h-full">
                    <div className="flex flex-col items-center gap-2 text-muted-foreground">
                        <Loader2 className="h-8 w-8 animate-spin" />
                        <p>Initializing incident feed...</p>
                    </div>
                    </div>
                )}
                <div className="space-y-4">
                    {incidents.map((incident) => {
                      const Icon = incidentInfo[incident.type].icon;
                      const color = incidentInfo[incident.type].color;
                      return (
                        <div key={incident.id} className="flex items-start gap-4 p-2 rounded-md hover:bg-secondary/50">
                            <div className="flex-shrink-0 w-8 h-8 bg-secondary rounded-lg flex items-center justify-center mt-1">
                                <Icon className={cn("h-5 w-5", color)} />
                            </div>
                            <div className='w-full'>
                                <div className='flex items-center justify-between'>
                                    <p className="font-semibold text-sm">{incident.title}</p>
                                    <Badge variant="outline" className={cn('text-xs', severityBadge[incident.severity])}>{incident.severity}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">{incident.description}</p>
                                <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
                                <span>{incident.zone}</span>
                                <span>{formatDistanceToNow(incident.timestamp, { addSuffix: true })}</span>
                                </div>
                            </div>
                        </div>
                      )
                    })}
                </div>
                </ScrollArea>
            </CardContent>
        </>
  );
}
