
'use client'

import React, { useContext } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"
import { SaudaContext } from '@/context/SaudaContext';
import { Badge } from '@/components/ui/badge';

export function DigitalSaudas() {
    const context = useContext(SaudaContext);

    if (!context) {
        return null; // Or some fallback UI
    }

    const { saudas } = context;

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline">My Digital Saudas</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {saudas.length === 0 ? (
                    <div className="text-center text-muted-foreground py-12">
                        <FileText className="mx-auto h-12 w-12" />
                        <p className="mt-4">No active saudas at the moment.</p>
                        <p className="text-sm">Click "New Sauda" to create one.</p>
                    </div>
                ) : (
                    <ul className="space-y-4">
                        {saudas.map((sauda, index) => (
                           <li key={index} className="border p-4 rounded-lg flex items-center justify-between gap-4 hover:bg-muted/50">
                                <div className="flex items-center gap-4 flex-1">
                                   <div className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 p-3 rounded-md">
                                        <FileText className="h-6 w-6"/>
                                   </div>
                                    <div>
                                        <h3 className="font-bold">{sauda.crop}</h3>
                                        <p className="text-sm text-muted-foreground">
                                            {sauda.quantity} Quintals at ₹{sauda.pricePerQuintal.toLocaleString('en-IN')}/quintal
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg">
                                        ₹{(sauda.quantity * sauda.pricePerQuintal).toLocaleString('en-IN')}
                                    </p>
                                    <Badge variant="secondary">Pending</Badge>
                                </div>
                           </li>
                        ))}
                    </ul>
                )}
            </CardContent>
        </Card>
    )
}
