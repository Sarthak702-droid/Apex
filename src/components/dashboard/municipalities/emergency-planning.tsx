'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, PlayCircle } from 'lucide-react';

export function EmergencyPlanning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Emergency Response & Simulation</CardTitle>
        <CardDescription>
          Prepare for potential disruptions by simulating scenarios and accessing predefined response plans.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid md:grid-cols-2 gap-6">
        <div className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg text-center">
            <PlayCircle className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Run Disruption Simulation</h3>
            <p className="text-sm text-muted-foreground mb-4">
                Test the city's resilience against scenarios like floods or transport strikes.
            </p>
            <Button disabled>Coming Soon</Button>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-secondary/50 rounded-lg text-center">
            <FileText className="h-10 w-10 text-primary mb-4" />
            <h3 className="font-semibold mb-2">Access Response Plans</h3>
            <p className="text-sm text-muted-foreground mb-4">
                View and activate emergency protocols for various disruption types.
            </p>
            <Button disabled>Coming Soon</Button>
        </div>
      </CardContent>
    </Card>
  );
}
