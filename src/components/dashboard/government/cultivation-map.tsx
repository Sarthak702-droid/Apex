
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

const cultivationData = {
    all: [
        { id: 'od', name: 'Odisha', top: '55%', left: '75%', value: 65, crop: 'Groundnut' },
        { id: 'mh', name: 'Maharashtra', top: '58%', left: '40%', value: 80, crop: 'Soybean' },
        { id: 'cg', name: 'Chhattisgarh', top: '50%', left: '65%', value: 70, crop: 'Linseed' },
        { id: 'jh', name: 'Jharkhand', top: '45%', left: '72%', value: 60, crop: 'Mustard' },
        { id: 'ts', name: 'Telangana', top: '65%', left: '50%', value: 75, crop: 'Sunflower' },
        { id: 'rj', name: 'Rajasthan', top: '35%', left: '35%', value: 85, crop: 'Mustard' },
        { id: 'mp', name: 'Madhya Pradesh', top: '45%', left: '50%', value: 90, crop: 'Soybean' },
    ],
    Soybean: [
        { id: 'mh', name: 'Maharashtra', top: '58%', left: '40%', value: 80, crop: 'Soybean' },
        { id: 'mp', name: 'Madhya Pradesh', top: '45%', left: '50%', value: 90, crop: 'Soybean' },
        { id: 'rj', name: 'Rajasthan', top: '35%', left: '35%', value: 40, crop: 'Soybean' },
    ],
    Groundnut: [
        { id: 'od', name: 'Odisha', top: '55%', left: '75%', value: 65, crop: 'Groundnut' },
        { id: 'ts', name: 'Telangana', top: '65%', left: '50%', value: 60, crop: 'Groundnut' },
        { id: 'gj', name: 'Gujarat', top: '45%', left: '25%', value: 88, crop: 'Groundnut' },
        { id: 'ap', name: 'Andhra Pradesh', top: '70%', left: '52%', value: 70, crop: 'Groundnut' },
    ],
    Mustard: [
         { id: 'jh', name: 'Jharkhand', top: '45%', left: '72%', value: 60, crop: 'Mustard' },
         { id: 'rj', name: 'Rajasthan', top: '35%', left: '35%', value: 85, crop: 'Mustard' },
         { id: 'up', name: 'Uttar Pradesh', top: '35%', left: '58%', value: 75, crop: 'Mustard' },
         { id: 'hr', name: 'Haryana', top: '28%', left: '45%', value: 70, crop: 'Mustard' },
    ],
    Sunflower: [
        { id: 'ts', name: 'Telangana', top: '65%', left: '50%', value: 75, crop: 'Sunflower' },
        { id: 'ka', name: 'Karnataka', top: '72%', left: '45%', value: 68, crop: 'Sunflower' },
        { id: 'mh', name: 'Maharashtra', top: '58%', left: '40%', value: 62, crop: 'Sunflower' },
    ],
    Linseed: [
        { id: 'cg', name: 'Chhattisgarh', top: '50%', left: '65%', value: 70, crop: 'Linseed' },
        { id: 'mp', name: 'Madhya Pradesh', top: '45%', left: '50%', value: 55, crop: 'Linseed' },
        { id: 'jh', name: 'Jharkhand', top: '45%', left: '72%', value: 45, crop: 'Linseed' },
    ],
    Sesame: [
        { id: 'wb', name: 'West Bengal', top: '47%', left: '80%', value: 78, crop: 'Sesame' },
        { id: 'mp', name: 'Madhya Pradesh', top: '45%', left: '50%', value: 65, crop: 'Sesame' },
        { id: 'rj', name: 'Rajasthan', top: '35%', left: '35%', value: 60, crop: 'Sesame' },
    ],
    Safflower: [
        { id: 'mh', name: 'Maharashtra', top: '58%', left: '40%', value: 72, crop: 'Safflower' },
        { id: 'ka', name: 'Karnataka', top: '72%', left: '45%', value: 65, crop: 'Safflower' },
    ]
};

type Oilseed = keyof typeof cultivationData;

const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const mapUrl = googleMapsApiKey 
    ? `https://maps.googleapis.com/maps/api/staticmap?center=22.5937,78.9629&zoom=4&size=800x600&maptype=roadmap&style=feature:all|element:labels|visibility:off&style=feature:administrative|element:geometry|visibility:on&style=feature:administrative.country|element:geometry.stroke|color:0x000000|weight:1.5&style=feature:administrative.province|element:geometry.stroke|color:0x000000|weight:0.5&style=feature:landscape|color:0xf2f2f2&style=feature:water|color:0xaad5e2&key=${googleMapsApiKey}`
    : "https://picsum.photos/seed/mapindia/800/600";


export default function CultivationMap() {
    const [selectedCrop, setSelectedCrop] = useState<Oilseed>('all');
    const dataPoints = cultivationData[selectedCrop];

  return (
    <Card className="h-full">
      <CardHeader className='flex-row items-center justify-between'>
        <div>
            <CardTitle className="font-headline">Oilseed Cultivation Map</CardTitle>
            <CardDescription>Percentage of land under oilseed cultivation by state.</CardDescription>
        </div>
        <Select onValueChange={(v) => setSelectedCrop(v as Oilseed)} defaultValue='all'>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by oilseed" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="all">All Oilseeds</SelectItem>
                <SelectItem value="Soybean">Soybean</SelectItem>
                <SelectItem value="Groundnut">Groundnut</SelectItem>
                <SelectItem value="Mustard">Mustard</SelectItem>
                <SelectItem value="Sunflower">Sunflower</SelectItem>
                <SelectItem value="Linseed">Linseed</SelectItem>
                <SelectItem value="Sesame">Sesame</SelectItem>
                <SelectItem value="Safflower">Safflower</SelectItem>
            </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-blue-200 dark:bg-blue-900/50">
            <Image 
                src={mapUrl}
                alt="Map of India" 
                fill
                className="object-cover opacity-80"
                data-ai-hint="india map"
            />
            <AnimatePresence>
                {dataPoints.map((point, index) => (
                    <motion.div
                        key={point.id + selectedCrop}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ delay: index * 0.05, type: 'spring', stiffness: 300, damping: 20 }}
                        className="absolute group"
                        style={{ top: point.top, left: point.left }}
                    >
                        <div className="w-4 h-4 rounded-full bg-primary border-2 border-background shadow-lg animate-pulse" />
                        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <div className='bg-background p-2 rounded-md shadow-lg border text-sm'>
                                <p className='font-bold'>{point.name}</p>
                                <div className='text-muted-foreground'>
                                    <Badge variant="secondary" className='mr-1.5'>{point.crop}</Badge>
                                    {point.value}% cultivation
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
