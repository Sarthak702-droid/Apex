
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, User, Wheat, IndianRupee, Calendar } from "lucide-react";

const dummyContracts = [
  {
    id: "CTR-001",
    buyer: "Sanjay Kumar",
    crop: "Soybean",
    quantity: 50, // in quintals
    pricePerQuintal: 4500,
    status: "Active",
    startDate: "2024-07-15",
    expectedEndDate: "2024-10-20",
  },
  {
    id: "CTR-002",
    buyer: "Radha Exports",
    crop: "Groundnut",
    quantity: 120,
    pricePerQuintal: 5800,
    status: "Completed",
    startDate: "2024-03-01",
    expectedEndDate: "2024-06-15",
  },
  {
    id: "CTR-003",
    buyer: "Kisan Connect",
    crop: "Mustard",
    quantity: 75,
    pricePerQuintal: 5450,
    status: "Pending",
    startDate: "2024-08-01",
    expectedEndDate: "2024-12-10",
  },
];

const statusStyles = {
  Active: "bg-blue-500/20 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  Completed: "bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400",
  Pending: "bg-yellow-500/20 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-400",
};

export default function ContractsPage() {
  return (
    <div className="space-y-6">
       <Card>
        <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2 text-2xl md:text-3xl">
                <FileText className="h-7 w-7 text-primary" />
                My Contracts
            </CardTitle>
            <CardDescription>
                An overview of all your active, pending, and completed contracts.
            </CardDescription>
        </CardHeader>
       </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {dummyContracts.map((contract) => (
          <Card key={contract.id} className="flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <CardTitle className="text-lg font-semibold">{contract.id}</CardTitle>
              <Badge className={statusStyles[contract.status as keyof typeof statusStyles]}>
                {contract.status}
              </Badge>
            </CardHeader>
            <CardContent className="flex-grow space-y-4">
              <div className="flex items-center gap-3">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="font-medium">{contract.buyer}</span>
              </div>
              <div className="flex items-center gap-3">
                <Wheat className="h-5 w-5 text-muted-foreground" />
                <span>{contract.quantity} quintals of <strong>{contract.crop}</strong></span>
              </div>
              <div className="flex items-center gap-3">
                <IndianRupee className="h-5 w-5 text-muted-foreground" />
                <span>₹{contract.pricePerQuintal.toLocaleString('en-IN')} / quintal</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Calendar className="h-5 w-5" />
                <span>{contract.startDate} to {contract.expectedEndDate}</span>
              </div>
            </CardContent>
            <div className="p-6 pt-0 mt-auto">
                <div className="bg-muted p-4 rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Total Value</p>
                    <p className="text-2xl font-bold text-foreground">
                        ₹{(contract.quantity * contract.pricePerQuintal).toLocaleString('en-IN')}
                    </p>
                </div>
                 <Button className="w-full mt-4">View Details</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
