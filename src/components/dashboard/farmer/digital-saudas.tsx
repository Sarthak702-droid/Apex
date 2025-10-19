
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText } from "lucide-react"

export function DigitalSaudas() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline">My Digital Saudas</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center text-muted-foreground py-12">
                    <FileText className="mx-auto h-12 w-12" />
                    <p className="mt-4">No active saudas at the moment.</p>
                    <p className="text-sm">Click "New Sauda" to create one.</p>
                </div>
            </CardContent>
        </Card>
    )
}
