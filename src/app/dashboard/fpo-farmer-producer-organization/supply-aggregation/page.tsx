
import { SaudaForm } from "@/components/dashboard/fpo/sauda-form";
import { SaudaTable } from "@/components/dashboard/fpo/sauda-table";
import { GitGraph } from "lucide-react";

export default function SupplyAggregationPage() {
  return (
    <div className="space-y-8">
       <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <GitGraph className="h-8 w-8" />
          Supply Aggregation (Sauda)
        </h1>
        <p className="text-muted-foreground">
          Log and track your forward-sell agreements with FPO members.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
            <SaudaForm />
        </div>
        <div className="lg:col-span-2">
            <SaudaTable />
        </div>
      </div>
    </div>
  );
}
