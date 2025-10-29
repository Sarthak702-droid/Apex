
'use client';

import { APIProvider, Map, AdvancedMarker, InfoWindow } from '@vis.gl/react-google-maps';
import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Truck, CloudRain, ShieldAlert, TrafficCone } from 'lucide-react';
import { cn } from '@/lib/utils';

type Incident = {
    id: string;
    type: 'logistics' | 'weather' | 'supply' | 'traffic';
    severity: 'low' | 'medium' | 'high';
    position: { lat: number; lng: number };
    title: string;
    description: string;
};

const allIncidents: Incident[] = [
    {
        id: 'roadblock-1',
        type: 'logistics',
        severity: 'high',
        position: { lat: 20.29, lng: 85.86 },
        title: 'Road Blocked at Rasulgarh',
        description: 'Major accident blocking the highway. Supply trucks are being rerouted.'
    },
    {
        id: 'flood-1',
        type: 'weather',
        severity: 'medium',
        position: { lat: 20.24, lng: 85.83 },
        title: 'Minor Flooding in Old Town',
        description: 'Heavy rainfall has caused waterlogging, slowing down last-mile delivery vehicles.'
    },
    {
        id: 'warehouse-1',
        type: 'supply',
        severity: 'high',
        position: { lat: 20.30, lng: 85.86 },
        title: 'Warehouse Power Outage',
        description: 'Power outage at Mancheswar central warehouse. Cold storage at risk.'
    },
    {
        id: 'strike-1',
        type: 'logistics',
        severity: 'high',
        position: { lat: 20.275, lng: 85.79 },
        title: 'Transport Strike at Baramunda',
        description: 'Inter-state bus terminal transport strike is affecting vegetable supply from other states.'
    },
    {
        id: 'traffic-1',
        type: 'traffic',
        severity: 'low',
        position: { lat: 20.295, lng: 85.815 },
        title: 'Heavy Traffic at Nayapalli',
        description: 'Festival procession causing traffic slowdown. Minor delays expected for deliveries.'
    },
    {
        id: 'weather-2',
        type: 'weather',
        severity: 'high',
        position: { lat: 20.35, lng: 85.82 },
        title: 'Cyclone Alert for Patia',
        description: 'Cyclone warning issued. Residents advised to stock up. Emergency supply routes activated.'
    }
];

const incidentInfo = {
    logistics: { icon: Truck, color: 'bg-blue-500 hover:bg-blue-600', borderColor: 'border-blue-700' },
    weather: { icon: CloudRain, color: 'bg-yellow-500 hover:bg-yellow-600', borderColor: 'border-yellow-700' },
    supply: { icon: ShieldAlert, color: 'bg-red-500 hover:bg-red-600', borderColor: 'border-red-700' },
    traffic: { icon: TrafficCone, color: 'bg-orange-500 hover:bg-orange-600', borderColor: 'border-orange-700' },
};

const mapStyles: google.maps.MapTypeStyle[] = [
    { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
    { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
    { featureType: 'administrative.locality', elementType: 'labels.text.fill', stylers: [{ color: '#d59563' }] },
    { featureType: 'poi', stylers: [{ visibility: 'off' }] },
    { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#38414e' }] },
    { featureType: 'road', elementType: 'geometry.stroke', stylers: [{ color: '#212a37' }] },
    { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#9ca5b3' }] },
    { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#746855' }] },
    { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#1f2835' }] },
    { featureType: 'road.highway', elementType: 'labels.text.fill', stylers: [{ color: '#f3d19c' }] },
    { featureType: 'transit', stylers: [{ visibility: 'off' }] },
    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#17263c' }] },
    { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#515c6d' }] },
    { featureType: 'water', elementType: 'labels.text.stroke', stylers: [{ color: '#17263c' }] },
];


export function DisruptionMap() {
    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);

    useEffect(() => {
        // Initial incidents
        setIncidents(allIncidents.slice(0, 4));

        const interval = setInterval(() => {
            setIncidents(prevIncidents => {
                const currentIds = new Set(prevIncidents.map(i => i.id));
                // Remove the oldest incident
                const newIncidents = prevIncidents.slice(1);
                
                // Find an incident that isn't already on the map
                let nextIncident;
                let attempts = 0;
                const newIds = new Set(newIncidents.map(i => i.id));

                do {
                    nextIncident = allIncidents[Math.floor(Math.random() * allIncidents.length)];
                    attempts++;
                } while (newIds.has(nextIncident.id) && attempts < allIncidents.length * 2);

                // Add the new incident if a unique one was found
                if (nextIncident && !newIds.has(nextIncident.id)) {
                    newIncidents.push(nextIncident);
                } else {
                    // Fallback: if we can't find a unique one, just add the first one from the main list that's not present
                    const fallback = allIncidents.find(i => !newIds.has(i.id));
                    if (fallback) newIncidents.push(fallback);
                }
                
                return newIncidents;
            });
        }, 4000); // Update incidents every 4 seconds

        return () => clearInterval(interval);
    }, []);

    if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
        return (
            <div className="flex items-center justify-center h-full bg-muted/30 p-4 text-center rounded-lg border">
                <p className='text-muted-foreground'>Google Maps API key is not configured. Please add it to your environment variables as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.</p>
            </div>
        );
    }
    
    return (
        <div className="relative w-full aspect-[16/9] bg-muted/30 rounded-lg overflow-hidden border">
            <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                <Map
                    defaultCenter={{ lat: 20.2961, lng: 85.8245 }}
                    defaultZoom={12}
                    mapId="disruption-map-id"
                    styles={mapStyles}
                    disableDefaultUI={true}
                    gestureHandling={'greedy'}
                >
                    {incidents.map(incident => {
                        const Icon = incidentInfo[incident.type].icon;
                        return (
                            <AdvancedMarker 
                                key={incident.id} 
                                position={incident.position}
                                onClick={() => setSelectedIncident(incident)}
                            >
                                <div className={cn(
                                    "h-8 w-8 rounded-full flex items-center justify-center text-white cursor-pointer border-2",
                                    incidentInfo[incident.type].color,
                                    selectedIncident?.id === incident.id ? 'border-white' : incidentInfo[incident.type].borderColor
                                )}>
                                    <Icon className="h-5 w-5" />
                                </div>
                            </AdvancedMarker>
                        )
                    })}
                    {selectedIncident && (
                        <InfoWindow
                            position={selectedIncident.position}
                            onCloseClick={() => setSelectedIncident(null)}
                        >
                            <div className='p-2 max-w-xs text-black'>
                                <h4 className='font-bold text-sm mb-1'>{selectedIncident.title}</h4>
                                <p className='text-xs text-slate-600'>{selectedIncident.description}</p>
                                <Badge variant="destructive" className='mt-2 capitalize'>{selectedIncident.severity} Severity</Badge>
                            </div>
                        </InfoWindow>
                    )}
                </Map>
            </APIProvider>
            
            <div className="absolute bottom-4 right-4 bg-background/80 p-3 rounded-md border shadow-lg">
                <h4 className="font-semibold text-xs mb-2">Incident Legend</h4>
                <div className="flex flex-col gap-2">
                    {Object.entries(incidentInfo).map(([key, { icon: Icon, color }]) => (
                        <div key={key} className="flex items-center gap-2">
                            <div className={cn("h-3 w-3 rounded-full", color.split(' ')[0])}></div>
                            <span className="text-xs capitalize">{key}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
