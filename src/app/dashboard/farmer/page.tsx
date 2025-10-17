import { DollarSign, FileText, Wheat } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import CropRecommendations from "@/components/dashboard/farmer/crop-recommendations";

export default function FarmerDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Farmer Dashboard</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatsCard
          title="Active Contracts"
          value="3"
          icon={<FileText className="h-5 w-5" />}
          description="Contracts pending delivery"
        />
        <StatsCard
          title="Recommended Crop"
          value="Soybean"
          icon={<Wheat className="h-5 w-5" />}
          description="Highest potential profit"
        />
        <StatsCard
          title="Estimated Earnings"
          value="₹4,52,312"
          icon={<DollarSign className="h-5 w-5" />}
          description="+12.5% from last season"
        />
      </div>
      <div>
        <CropRecommendations />
      </div>
    </div>
  );
}
