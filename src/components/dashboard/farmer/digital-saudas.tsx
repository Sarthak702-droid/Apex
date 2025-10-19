
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const saudas = [
    {
        crop: "Sesame",
        id: "TEL-1760837454062",
        quantity: "1200 qtl",
        harvest: "06 Nov",
        price: "₹6000/qtl",
        value: "₹72,00,000",
        status: "Pending"
    },
    {
        crop: "Sunflower",
        id: "TEL-1760689186633",
        quantity: "50 qtl",
        harvest: "31 Oct",
        price: "₹62000/qtl",
        value: "₹31,00,000",
        status: "Pending"
    }
]

export function DigitalSaudas() {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="font-headline">My Digital Saudas</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
            </CardHeader>
            <CardContent className="space-y-4">
                {saudas.map((sauda) => (
                    <Card key={sauda.id} className="p-4 flex flex-col sm:flex-row items-start gap-4">
                        <div className="flex items-center gap-4 flex-1">
                           <div className="bg-blue-500/10 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400 p-3 rounded-md">
                                <FileText className="h-6 w-6"/>
                           </div>
                            <div>
                                <h3 className="font-bold">{sauda.crop}</h3>
                                <p className="text-xs text-muted-foreground">{sauda.id}</p>
                            </div>
                        </div>
                        <div className="flex-1 grid grid-cols-2 gap-4 text-sm w-full">
                            <div>
                                <p className="text-muted-foreground text-xs">QUANTITY</p>
                                <p className="font-semibold">{sauda.quantity}</p>
                            </div>
                             <div>
                                <p className="text-muted-foreground text-xs">PRICE</p>
                                <p className="font-semibold">{sauda.price}</p>
                            </div>
                             <div>
                                <p className="text-muted-foreground text-xs">HARVEST</p>
                                <p className="font-semibold">{sauda.harvest}</p>
                            </div>
                             <div>
                                <p className="text-muted-foreground text-xs">VALUE</p>
                                <p className="font-semibold text-pink-500">{sauda.value}</p>
                            </div>
                        </div>
                         <Badge variant="outline" className="border-yellow-400 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400">{sauda.status}</Badge>
                    </Card>
                ))}
            </CardContent>
        </Card>
    )
}
