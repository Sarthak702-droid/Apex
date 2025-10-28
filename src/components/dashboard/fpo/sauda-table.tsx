
'use client';

import { useContext } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SaudaContext } from '@/context/SaudaContext';
import { format, parseISO, isPast } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';

export function SaudaTable() {
    const saudaContext = useContext(SaudaContext);

    if (!saudaContext) {
        throw new Error("SaudaTable must be used within a SaudaProvider");
    }

    const { saudas } = saudaContext;

    const getStatus = (harvestDate: string) => {
        return isPast(parseISO(harvestDate)) ? 'Harvested' : 'Pending';
    };

    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="font-headline">Active Saudas</CardTitle>
                <CardDescription>A list of all ongoing supply agreements.</CardDescription>
            </CardHeader>
            <CardContent>
                <ScrollArea className="h-[70vh]">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Crop</TableHead>
                                <TableHead>Buyer</TableHead>
                                <TableHead className="text-right">Quantity (Q)</TableHead>
                                <TableHead className="text-right">Price (₹/Q)</TableHead>
                                <TableHead>Harvest Date</TableHead>
                                <TableHead>Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {saudas.length > 0 ? (
                            saudas.map((sauda, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{sauda.crop}</TableCell>
                                    <TableCell>
                                        <div>{sauda.buyerName}</div>
                                        <div className='text-xs text-muted-foreground'>{sauda.buyerContact}</div>
                                    </TableCell>
                                    <TableCell className="text-right">{sauda.quantity}</TableCell>
                                    <TableCell className="text-right font-semibold">₹{sauda.pricePerQuintal}</TableCell>
                                    <TableCell>{format(parseISO(sauda.expectedHarvestDate), 'dd MMM yyyy')}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatus(sauda.expectedHarvestDate) === 'Harvested' ? 'default' : 'secondary'}
                                          className={getStatus(sauda.expectedHarvestDate) === 'Harvested' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400' : ''}
                                        >
                                            {getStatus(sauda.expectedHarvestDate)}
                                        </Badge>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={6} className="text-center h-24">
                                No active saudas found. Create one to get started.
                                </TableCell>
                            </TableRow>
                        )}
                        </TableBody>
                    </Table>
                </ScrollArea>
            </CardContent>
        </Card>
    );
}
