
'use client';

import { FoodVulnerabilityMap } from "@/components/dashboard/development-authorities/food-vulnerability-map";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Map as MapIcon } from "lucide-react";

export default function FoodZoningPage() {
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
                    <FoodVulnerabilityMap />
                </CardContent>
            </Card>
        </div>
    )
}
