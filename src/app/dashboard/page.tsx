import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Leaf } from "lucide-react";

export default function DashboardHomePage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <Leaf className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline text-3xl">
            Welcome to Tel-Samriddhi
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Please select an option from the sidebar to get started. Your personalized dashboard experience awaits!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
