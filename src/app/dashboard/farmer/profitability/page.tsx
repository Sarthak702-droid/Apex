'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Construction, BarChart2, LineChart, BrainCircuit } from "lucide-react";

const upcomingFeatures = [
    {
        icon: <BarChart2 className="h-5 w-5" />,
        title: "Crop-wise Profit Breakdown",
        description: "Analyze earnings, costs, and net profit for each crop you cultivate."
    },
    {
        icon: <LineChart className="h-5 w-5" />,
        title: "Market Price Fluctuation",
        description: "Track historical and predicted market prices to sell at the right time."
    },
    {
        icon: <BrainCircuit className="h-5 w-5" />,
        title: "AI-Driven Cost-Saving Tips",
        description: "Get personalized recommendations on reducing input costs and improving efficiency."
    }
]

export default function ProfitabilityPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline text-3xl">
            Profitability Analysis: Coming Soon!
          </CardTitle>
          <CardDescription className="max-w-md mx-auto">
            We're building a powerful tool to help you understand and maximize your farm's profitability. Get ready for detailed insights and AI-powered recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div>
                <h3 className="mb-4 font-semibold text-lg">What to Expect:</h3>
                <ul className="space-y-4 text-left">
                    {upcomingFeatures.map(feature => (
                        <li key={feature.title} className="flex items-start gap-4 p-4 bg-muted/50 rounded-lg">
                            <div className="text-primary mt-1">
                                {feature.icon}
                            </div>
                            <div>
                                <p className="font-semibold">{feature.title}</p>
                                <p className="text-sm text-muted-foreground">{feature.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
