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
        { id: 'cg', name: 'Chhattisgarh', top: '50%', left: '65%', value: 50, crop: 'Soybean' },
    ],
    Groundnut: [
        { id: 'od', name: 'Odisha', top: '55%', left: '75%', value: 65, crop: 'Groundnut' },
        { id: 'ts', name: 'Telangana', top: '65%', left: '50%', value: 60, crop: 'Groundnut' },
        { id: 'gj', name: 'Gujarat', top: '45%', left: '25%', value: 88, crop: 'Groundnut' },
    ],
    Mustard: [
         { id: 'jh', name: 'Jharkhand', top: '45%', left: '72%', value: 60, crop: 'Mustard' },
         { id: 'rj', name: 'Rajasthan', top: '35%', left: '35%', value: 85, crop: 'Mustard' },
         { id: 'up', name: 'Uttar Pradesh', top: '35%', left: '58%', value: 75, crop: 'Mustard' },
    ],
};

type Oilseed = keyof typeof cultivationData;

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
            </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="relative w-full aspect-[4/3] rounded-lg overflow-hidden bg-blue-200 dark:bg-blue-900/50">
            <Image 
                src="https://picsum.photos/seed/mapindia/800/600" 
                alt="Map of India" 
                fill
                className="object-cover opacity-30"
                data-ai-hint="india map"
            />
            <AnimatePresence>
                {dataPoints.map((point, index) => (
                    <motion.div
                        key={point.id}
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
                                <p className='text-muted-foreground'>
                                    <Badge variant="secondary" className='mr-1.5'>{point.crop}</Badge>
                                    {point.value}% cultivation
                                </p>
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
