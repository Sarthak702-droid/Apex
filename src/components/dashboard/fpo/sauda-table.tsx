
'use client';

import { useContext, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { SaudaContext, Sauda } from '@/context/SaudaContext';
import { format, parseISO, isPast } from 'date-fns';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Bot } from 'lucide-react';
import { AIQualityReportDialog } from './ai-quality-report-dialog';

export function SaudaTable() {
    const saudaContext = useContext(SaudaContext);
    const [selectedSauda, setSelectedSauda] = useState<Sauda | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    if (!saudaContext) {
        throw new Error("SaudaTable must be used within a SaudaProvider");
    }

    const { saudas } = saudaContext;

    const getStatus = (harvestDate: string) => {
        return isPast(parseISO(harvestDate)) ? 'Harvested' : 'Pending';
    };

    const handleGenerateReport = (sauda: Sauda) => {
        setSelectedSauda(sauda);
        setIsDialogOpen(true);
    };

    return (
        <>
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
                                    <TableHead>Harvest Date</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                            {saudas.length > 0 ? (
                                saudas.map((sauda, index) => {
                                    const status = getStatus(sauda.expectedHarvestDate);
                                    return (
                                    <TableRow key={index}>
                                        <TableCell className="font-medium">{sauda.crop}</TableCell>
                                        <TableCell>
                                            <div>{sauda.buyerName}</div>
                                            <div className='text-xs text-muted-foreground'>{sauda.buyerContact}</div>
                                        </TableCell>
                                        <TableCell className="text-right">{sauda.quantity}</TableCell>
                                        <TableCell>{format(parseISO(sauda.expectedHarvestDate), 'dd MMM yyyy')}</TableCell>
                                        <TableCell>
                                            <Badge variant={status === 'Harvested' ? 'default' : 'secondary'}
                                            className={status === 'Harvested' ? 'bg-green-500/20 text-green-700 dark:bg-green-500/10 dark:text-green-400' : ''}
                                            >
                                                {status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            {status === 'Harvested' && (
                                                <Button variant="outline" size="sm" onClick={() => handleGenerateReport(sauda)}>
                                                    <Bot className="mr-2 h-4 w-4" />
                                                    Report
                                                </Button>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )})
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
            {selectedSauda && (
                <AIQualityReportDialog 
                    isOpen={isDialogOpen} 
                    onOpenChange={setIsDialogOpen}
                    sauda={selectedSauda}
                />
            )}
        </>
    );
}
