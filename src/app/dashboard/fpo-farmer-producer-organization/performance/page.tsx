
'use client';

import { useState } from 'react';
import { BarChart3, Carrot, Calendar, Star, Scale } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { StatsCard } from '@/components/dashboard/stats-card';
import { MemberSalesHistoryChart } from '@/components/dashboard/fpo/member-sales-history';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const members = [
  { id: 'sunita-devi', name: 'Sunita Devi', avatarId: 'farmer-avatar', produce: 'Soybean', totalProduce: '25 Tons', lastSale: '2023-10-15', avgQuality: '4.8/5' },
  { id: 'rajesh-kumar', name: 'Rajesh Kumar', avatarId: 'buyer-avatar', produce: 'Groundnut', totalProduce: '22 Tons', lastSale: '2023-10-12', avgQuality: '4.6/5' },
  { id: 'amit-singh', name: 'Amit Singh', avatarId: 'farmer-avatar', produce: 'Soybean', totalProduce: '20 Tons', lastSale: '2023-10-20', avgQuality: '4.7/5' },
  { id: 'meena-kumari', name: 'Meena Kumari', avatarId: 'buyer-avatar', produce: 'Rapeseed', totalProduce: '18 Tons', lastSale: '2023-10-18', avgQuality: '4.9/5' },
  { id: 'vikram-yadav', name: 'Vikram Yadav', avatarId: 'farmer-avatar', produce: 'Sunflower', totalProduce: '15 Tons', lastSale: '2023-10-11', avgQuality: '4.5/5' },
];

export default function PerformancePage() {
  const [selectedMemberId, setSelectedMemberId] = useState(members[0].id);

  const selectedMember = members.find(m => m.id === selectedMemberId);
  const avatarImage = selectedMember ? PlaceHolderImages.find(p => p.id === selectedMember.avatarId) : null;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <BarChart3 className="h-8 w-8" />
          Member Performance
        </h1>
        <p className="text-muted-foreground">
          Track and analyze the performance of individual FPO members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select a Member</CardTitle>
          <CardDescription>Choose a member to view their detailed performance stats.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            {selectedMember && (
                <Avatar className="h-12 w-12">
                    {avatarImage && <AvatarImage src={avatarImage.imageUrl} alt={selectedMember.name} />}
                    <AvatarFallback>{selectedMember.name.charAt(0)}</AvatarFallback>
                </Avatar>
            )}
            <Select onValueChange={setSelectedMemberId} defaultValue={selectedMemberId}>
              <SelectTrigger className="w-full md:w-1/3">
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                {members.map(member => (
                  <SelectItem key={member.id} value={member.id}>
                    {member.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {selectedMember && (
        <div className='space-y-8'>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    title="Primary Crop"
                    value={selectedMember.produce}
                    icon={<Carrot className="h-5 w-5" />}
                    description="Main contribution"
                    index={0}
                />
                <StatsCard
                    title="Total Produce"
                    value={selectedMember.totalProduce}
                    icon={<Scale className="h-5 w-5" />}
                    description="This season"
                    index={1}
                />
                <StatsCard
                    title="Most Recent Sale"
                    value={selectedMember.lastSale}
                    icon={<Calendar className="h-5 w-5" />}
                    description="Last transaction date"
                    index={2}
                />
                <StatsCard
                    title="Average Quality Score"
                    value={selectedMember.avgQuality}
                    icon={<Star className="h-5 w-5" />}
                    description="Based on buyer feedback"
                    index={3}
                />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline">Sales History</CardTitle>
                    <CardDescription>Last 6 months sales performance for {selectedMember.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                    <MemberSalesHistoryChart />
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  );
}
