
'use client';

import { useState } from 'react';
import { FoodVulnerabilityMap, Zone } from "@/components/dashboard/development-authorities/food-vulnerability-map";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Map as MapIcon, Users, Warehouse, Store, Donut } from "lucide-react";
import { StatsCard } from '@/components/dashboard/stats-card';
import { ZonalLandUseChart } from '@/components/dashboard/development-authorities/zonal-land-use-chart';

export default function FoodZoningPage() {
    const [selectedZone, setSelectedZone] = useState<Zone | null>(null);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
                    <MapIcon className="h-8 w-8" />
                    Food Zoning Analytics
                </h1>
                <p className="text-muted-foreground">
                    Interactive vulnerability map and zonal analysis for strategic planning.
                </p>
            </div>
            <Card>
                 <CardHeader>
                    <CardTitle className="font-headline flex items-center gap-2">
                        <MapIcon className="h-5 w-5" />
                        City Food Vulnerability Index
                    </CardTitle>
                    <CardDescription>
                        Click on a zone to see detailed information about its food supply vulnerability.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <FoodVulnerabilityMap selectedZone={selectedZone} onSelectZone={setSelectedZone} />
                </CardContent>
            </Card>

            {selectedZone && (
                 <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="font-headline">
                                Detailed Analysis for: {selectedZone.name}
                            </CardTitle>
                            <CardDescription>
                                Key metrics and land use breakdown for the selected zone.
                            </CardDescription>
                        </CardHeader>
                    </Card>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className='space-y-8'>
                            <div className="grid gap-4 sm:grid-cols-3">
                                <StatsCard
                                    title="Population"
                                    value={selectedZone.stats?.population ?? 'N/A'}
                                    icon={<Users className="h-5 w-5" />}
                                    description="Estimated"
                                />
                                <StatsCard
                                    title="Warehouses"
                                    value={selectedZone.stats?.warehouses ?? 'N/A'}
                                    icon={<Warehouse className="h-5 w-5" />}
                                    description="Storage Facilities"
                                />
                                <StatsCard
                                    title="Retail Stores"
                                    value={selectedZone.stats?.retailStores ?? 'N/A'}
                                    icon={<Store className="h-5 w-5" />}
                                    description="Food Outlets"
                                />
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle className="font-headline text-lg">Zone Summary</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className='text-sm text-muted-foreground'>{selectedZone.description}</p>
                                </CardContent>
                            </Card>
                        </div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="font-headline text-lg flex items-center gap-2">
                                    <Donut className="h-5 w-5" />
                                    Land Use Distribution
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ZonalLandUseChart landUse={selectedZone.stats?.landUse} />
                            </CardContent>
                        </Card>
                    </div>
                </div>
            )}
        </div>
    )
}
