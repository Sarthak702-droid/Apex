
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Siren } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function EmergencyPlanning() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Siren className="h-5 w-5 text-primary" />
          Emergency Planning
        </CardTitle>
        <CardDescription>
            Tools and insights for crisis management and response.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className='text-sm text-muted-foreground'>
            Access the AI Insights Engine to run simulations, analyze risks, and develop response strategies.
        </p>
        <Button variant="outline" asChild className='mt-4'>
            <Link href="/dashboard/municipalities-corporation/ai-insights">
                Launch AI Insights <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
