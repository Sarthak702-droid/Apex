
'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Map as MapIcon, AlertTriangle, Truck, Warehouse } from "lucide-react";
import { APIProvider, Map, AdvancedMarker, InfoWindow, useMap } from '@vis.gl/react-google-maps';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const routes = [
    {
        id: 'route-1',
        origin: { name: "Mancheswar Hub", lat: 20.30, lng: 85.86 },
        destination: { name: "Patia Market", lat: 20.35, lng: 85.82 },
        waypoints: [{lat: 20.32, lng: 85.85}],
        status: 'on-time',
        vehicleId: 'OD02AB1234',
        eta: '45 mins',
        driver: 'Sanjay Kumar',
        cargo: 'Onions'
    },
    {
        id: 'route-2',
        origin: { name: "Baramunda Terminal", lat: 20.275, lng: 85.79 },
        destination: { name: "Old Town Godown", lat: 20.24, lng: 85.83 },
        waypoints: [],
        status: 'delayed',
        vehicleId: 'OD02CD5678',
        eta: '1.2 hours',
        delayReason: 'Heavy traffic near Kalpana Square',
        driver: 'Manish Das',
        cargo: 'Tomatoes'
    },
    {
        id: 'route-3',
        origin: { name: "Khandagiri Cold Storage", lat: 20.26, lng: 85.78 },
        destination: { name: "Nayapalli Retail", lat: 20.295, lng: 85.815 },
        waypoints: [{lat: 20.28, lng: 85.80}],
        status: 'on-time',
        vehicleId: 'OD02EF9012',
        eta: '25 mins',
        driver: 'Anil Sahoo',
        cargo: 'Potatoes'
    },
];

const routeStatusColors = {
    'on-time': 'hsl(var(--chart-2))',
    'delayed': 'hsl(var(--destructive))',
}

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

const PolylineComponent = (props: google.maps.PolylineOptions & { onClick?: () => void }) => {
    const map = useMap();
    const [polyline, setPolyline] = useState<google.maps.Polyline | null>(null);

    useEffect(() => {
        if (!map) return;
        if (!polyline) {
            const newPolyline = new google.maps.Polyline({ ...props, map });
            if (props.onClick) {
                newPolyline.addListener('click', props.onClick);
            }
            setPolyline(newPolyline);
        }
    }, [map, polyline, props]);

    useEffect(() => {
        if (polyline) {
            polyline.setOptions(props);
        }
    }, [polyline, props]);
    
    useEffect(() => {
        return () => {
            if (polyline) {
                polyline.setMap(null);
            }
        };
    }, [polyline]);

    return null;
}

export function RouteOptimization() {
  const [selectedRoute, setSelectedRoute] = useState(routes[0]);
  
  if (!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <MapIcon className="h-6 w-6" />
                    Route Optimization
                </CardTitle>
                <CardDescription>
                Live map of optimized delivery routes and potential delays.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex items-center justify-center h-full bg-muted/30 p-4 text-center rounded-lg border aspect-[16/9]">
                    <p className='text-muted-foreground'>Google Maps API key is not configured. Please add it to your environment variables as NEXT_PUBLIC_GOOGLE_MAPS_API_KEY.</p>
                </div>
            </CardContent>
        </Card>
    );
  }

  return (
    <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
                <MapIcon className="h-6 w-6" />
                Route Optimization
            </CardTitle>
            <CardDescription>
            Live map of optimized delivery routes and potential delays.
            </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className='md:col-span-1 space-y-2'>
                <h4 className='font-semibold'>Active Deliveries</h4>
                {routes.map(route => (
                    <Button key={route.id} variant={selectedRoute?.id === route.id ? 'secondary' : 'ghost'} className='w-full justify-between h-auto py-2' onClick={() => setSelectedRoute(route)}>
                        <div className='text-left'>
                            <p className='font-bold'>{route.vehicleId}</p>
                             <p className="text-xs text-muted-foreground">{route.driver} - {route.cargo}</p>
                            <p className='text-xs'>ETA: {route.eta}</p>
                        </div>
                         <Badge className={cn('capitalize text-white', route.status === 'delayed' ? 'bg-destructive' : 'bg-green-500')}>{route.status}</Badge>
                    </Button>
                ))}
            </div>
            <div className="relative w-full aspect-[16/9] bg-muted/30 rounded-lg overflow-hidden border md:col-span-3">
                 <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
                    <Map
                        defaultCenter={{ lat: 20.2961, lng: 85.8245 }}
                        defaultZoom={12}
                        mapId="route-optimization-map"
                        styles={mapStyles}
                        disableDefaultUI={true}
                        gestureHandling={'greedy'}
                    >
                        {routes.map(route => (
                            <React.Fragment key={route.id}>
                                <PolylineComponent
                                    path={[route.origin, ...route.waypoints, route.destination]}
                                    strokeColor={routeStatusColors[route.status as keyof typeof routeStatusColors]}
                                    strokeOpacity={selectedRoute?.id === route.id ? 1 : 0.5}
                                    strokeWeight={selectedRoute?.id === route.id ? 6 : 4}
                                    clickable={true}
                                    onClick={() => setSelectedRoute(route)}
                                />
                                <AdvancedMarker position={route.origin}>
                                     <div className="p-2 bg-background/80 rounded-full shadow-md">
                                        <Truck className="h-5 w-5 text-primary" />
                                    </div>
                                </AdvancedMarker>
                                <AdvancedMarker position={route.destination}>
                                    <div className="p-2 bg-background/80 rounded-full shadow-md">
                                        <Warehouse className="h-5 w-5 text-primary" />
                                    </div>
                                </AdvancedMarker>
                            </React.Fragment>
                        ))}
                         {selectedRoute && (
                            <InfoWindow position={{lat: selectedRoute.destination.lat + 0.01, lng: selectedRoute.destination.lng}}>
                                <div className='p-1 text-black max-w-xs'>
                                    <h4 className='font-bold text-sm'>{selectedRoute.vehicleId} ({selectedRoute.driver})</h4>
                                    <p className='text-xs'>Cargo: {selectedRoute.cargo}</p>
                                    <p className='text-xs'>From: {selectedRoute.origin.name}</p>
                                    <p className='text-xs'>To: {selectedRoute.destination.name}</p>
                                    <p className='text-xs'>ETA: {selectedRoute.eta}</p>
                                    {selectedRoute.status === 'delayed' && (
                                        <div className='flex items-center gap-2 mt-2 text-red-600'>
                                            <AlertTriangle className='h-4 w-4' />
                                            <p className='text-xs font-semibold'>{selectedRoute.delayReason}</p>
                                        </div>
                                    )}
                                </div>
                            </InfoWindow>
                        )}
                    </Map>
                 </APIProvider>
            </div>
        </CardContent>
    </Card>
  );
}
