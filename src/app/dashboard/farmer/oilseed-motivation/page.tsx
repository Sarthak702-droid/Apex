

import { GovtSchemesSection } from "@/components/dashboard/farmer/oilseed-motivation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Landmark } from "lucide-react";

export default function OilseedMotivationPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2 text-2xl md:text-3xl">
          <Landmark className="h-7 w-7 text-primary" />
          Government Schemes for Oilseed Farming
        </CardTitle>
        <CardDescription>
          Learn how the 'Tel-Samriddhi' mission and other schemes can help you grow and prosper.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <GovtSchemesSection />
      </CardContent>
    </Card>
  );
}
