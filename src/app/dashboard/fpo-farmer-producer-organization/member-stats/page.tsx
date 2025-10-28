
import { FpoMemberGrowth } from "@/components/dashboard/fpo/fpo-member-growth";
import { Users, Activity, Target, GitMerge } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";
import { MemberEngagement } from "@/components/dashboard/fpo/member-engagement";
import { TopMembers } from "@/components/dashboard/fpo/top-members";

export default function MemberStatsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <Users className="h-8 w-8" />
          Member Statistics
        </h1>
        <p className="text-muted-foreground">
          Analyze member growth, engagement, and performance over time.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Members"
          value="523"
          icon={<Users className="h-5 w-5" />}
          description="+12 this month"
          index={0}
        />
        <StatsCard
          title="Active Members"
          value="480"
          icon={<Activity className="h-5 w-5" />}
          description="92% active this quarter"
          index={1}
        />
        <StatsCard
          title="Retention Rate"
          value="98%"
          icon={<Target className="h-5 w-5" />}
          description="Year-over-year"
          index={2}
        />
        <StatsCard
          title="Avg. Produce/Member"
          value="2.4 Tons"
          icon={<GitMerge className="h-5 w-5" />}
          description="This season"
          index={3}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <TopMembers />
        </div>
        <div className="space-y-8">
            <FpoMemberGrowth />
            <MemberEngagement />
        </div>
      </div>
    </div>
  );
}
