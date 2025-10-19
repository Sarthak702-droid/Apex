
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function ContractsPage() {
  return (
    <div className="flex items-center justify-center h-full">
      <Card className="w-full max-w-lg text-center">
        <CardHeader>
          <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
            <Construction className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="mt-4 font-headline text-3xl">
            Coming Soon
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            This page is under construction. Contract management features will be available here shortly.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
