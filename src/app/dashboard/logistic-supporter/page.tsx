import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mountain } from "lucide-react";

export default function PlaceholderDashboard() {
  return (
    <div className="space-y-6">
      <h1 className="font-headline text-3xl font-bold">Logistic Supporter Dashboard</h1>
       <Card className="w-full text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <Mountain className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline text-3xl">
            Coming Soon!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This dashboard is under construction. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
