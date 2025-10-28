
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function EmergencyPlanning() {
  return (
    <Card className="transition-all hover:shadow-lg hover:-translate-y-1">
      <CardHeader>
        <div className="flex items-center gap-3">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center">
                <Bot className="w-7 h-7" />
            </div>
            <div>
                <CardTitle className="font-headline">AI Insights Engine</CardTitle>
                <CardDescription>
                Ask questions, run simulations, and get predictive insights.
                </CardDescription>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <Button asChild className="w-full">
          <Link href="/dashboard/municipalities-corporation/ai-insights">
            Launch AI Engine <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
