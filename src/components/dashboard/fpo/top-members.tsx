
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Award } from "lucide-react";

const members = [
  { name: 'Sunita Devi', avatarId: 'farmer-avatar', produce: 'Soybean', quantity: 25, rank: 1, change: '+5%' },
  { name: 'Rajesh Kumar', avatarId: 'buyer-avatar', produce: 'Groundnut', quantity: 22, rank: 2, change: '+2%' },
  { name: 'Amit Singh', avatarId: 'farmer-avatar', produce: 'Soybean', quantity: 20, rank: 3, change: '-1%' },
  { name: 'Meena Kumari', avatarId: 'buyer-avatar', produce: 'Rapeseed', quantity: 18, rank: 4, change: '+8%' },
  { name: 'Vikram Yadav', avatarId: 'farmer-avatar', produce: 'Sunflower', quantity: 15, rank: 5, change: '+3%' },
];

const getRankColor = (rank: number) => {
    if (rank === 1) return "text-amber-500";
    if (rank === 2) return "text-slate-400";
    if (rank === 3) return "text-amber-700";
    return "text-muted-foreground";
}

export function TopMembers() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="font-headline">Top Performing Members</CardTitle>
        <CardDescription>Based on aggregated produce quantity this season.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Rank</TableHead>
              <TableHead>Member</TableHead>
              <TableHead>Primary Crop</TableHead>
              <TableHead className="text-right">Quantity (Tons)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {members.map(member => {
              const avatarImage = PlaceHolderImages.find(p => p.id === member.avatarId);
              return (
                <TableRow key={member.name}>
                  <TableCell className="font-bold text-lg text-center">
                    <Award className={getRankColor(member.rank)} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={member.name} />}
                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="font-medium">{member.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{member.produce}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="font-semibold">{member.quantity}</div>
                    <div className={`text-xs ${member.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{member.change} MoM</div>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
