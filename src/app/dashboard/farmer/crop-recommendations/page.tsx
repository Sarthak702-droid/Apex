
'use client';

import CropRecommendations from "@/components/dashboard/farmer/crop-recommendations";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wheat } from "lucide-react";

export default function CropRecommendationsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl md:text-3xl">
          <Wheat className="h-7 w-7 text-primary" />
          AI Crop Recommendations
        </CardTitle>
        <CardDescription>Get personalized, AI-driven crop recommendations for your farm.</CardDescription>
      </CardHeader>
      <CardContent>
        <CropRecommendations />
      </CardContent>
    </Card>
  );
}
