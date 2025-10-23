
'use client';

import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Wheat, IndianRupee, ShoppingBag, User } from "lucide-react";
import { SaudaContext } from '@/context/SaudaContext';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function AvailableProduce() {
    const context = useContext(SaudaContext);

    if (!context) {
        return null; // Or some fallback UI
    }

    const { saudas } = context;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                    Available Produce Marketplace
                </CardTitle>
                <CardDescription>
                    Browse digital saudas created by farmers.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {saudas.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                        <Wheat className="mx-auto h-12 w-12" />
                        <p className="mt-4">No produce is currently listed by farmers.</p>
                        <p className="text-sm">Check back later or create a contract directly.</p>
                    </div>
                ) : (
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Farmer</TableHead>
                                <TableHead>Crop</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Price/Quintal</TableHead>
                                <TableHead>Total Value</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {saudas.map((sauda, index) => (
                               <TableRow key={index}>
                                   <TableCell className="font-medium">{sauda.farmerName}</TableCell>
                                   <TableCell>
                                        <div className='flex items-center gap-2'>
                                            <Wheat className='h-4 w-4 text-muted-foreground'/>
                                            {sauda.crop}
                                        </div>
                                    </TableCell>
                                   <TableCell>{sauda.quantity} quintals</TableCell>
                                   <TableCell>₹{sauda.pricePerQuintal.toLocaleString('en-IN')}</TableCell>
                                   <TableCell className='font-semibold'>₹{(sauda.quantity * sauda.pricePerQuintal).toLocaleString('en-IN')}</TableCell>
                                   <TableCell className="text-right">
                                       <Button>Make Offer</Button>
                                   </TableCell>
                               </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </CardContent>
        </Card>
    )
}
