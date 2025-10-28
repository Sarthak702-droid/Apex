import { FpoMemberGrowth } from "@/components/dashboard/fpo/fpo-member-growth";
import { Users } from "lucide-react";

export default function MemberStatsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8" />
          Member Statistics
        </h1>
        <p className="text-muted-foreground">
          Analyze member growth and engagement over time.
        </p>
      </div>
      <FpoMemberGrowth />
    </div>
  );
}
