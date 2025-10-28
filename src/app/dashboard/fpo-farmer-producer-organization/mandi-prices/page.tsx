
import { MandiPrices } from "@/components/dashboard/fpo/mandi-prices";
import { Store } from "lucide-react";

export default function MandiPricesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Store className="h-8 w-8" />
          Real-Time Mandi Prices
        </h1>
        <p className="text-muted-foreground">
          Track daily agricultural commodity prices from markets across India.
        </p>
      </div>
      <MandiPrices />
    </div>
  );
}
