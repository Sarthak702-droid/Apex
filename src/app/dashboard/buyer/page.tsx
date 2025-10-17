import { FileText, ShoppingBasket, Truck } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import AIQualityReport from "@/components/dashboard/buyer/ai-quality-report";

export default function BuyerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Buyer Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Active Contracts"
          value="12"
          icon={<FileText className="h-5 w-5" />}
          description="Awaiting fulfillment"
        />
        <StatsCard
          title="Pending Deliveries"
          value="5"
          icon={<Truck className="h-5 w-5" />}
          description="In transit to your location"
        />
        <StatsCard
          title="Total Purchases (Month)"
          value="₹12,45,000"
          icon={<ShoppingBasket className="h-5 w-5" />}
          description="+8% from last month"
        />
      </div>
      <div>
        <AIQualityReport />
      </div>
    </div>
  );
}
