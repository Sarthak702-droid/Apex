import { SOPs } from "@/components/dashboard/disaster-management/sops";
import { Briefcase } from "lucide-react";

export default function ResponsePlansPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Briefcase className="h-8 w-8" />
          Response Plans
        </h1>
        <p className="text-muted-foreground">
          Standard Operating Procedures for various crisis scenarios.
        </p>
      </div>
      <SOPs />
    </div>
  );
}
