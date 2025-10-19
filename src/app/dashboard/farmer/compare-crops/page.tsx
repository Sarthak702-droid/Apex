'use client';

import { useState } from 'react';
import CropComparisonCard from '@/components/dashboard/farmer/crop-comparison-card';
import CropDetailsModal from '@/components/dashboard/farmer/crop-details-modal';
import { AnimatePresence } from 'framer-motion';

const cropsData = [
  {
    name: 'Groundnut',
    variety: 'TMV-2',
    type: 'OILSEED',
    roi: 98.9,
    profit: 34600,
    duration: 120,
    risk: 'MEDIUM',
    score: 85,
    yield: '12 qtl/acre',
    cost: 35000,
    marketPrice: 5800,
    msp: 5550,
  },
  {
    name: 'Sunflower',
    variety: 'KBSH-44',
    type: 'OILSEED',
    roi: 77.1,
    profit: 21600,
    duration: 90,
    risk: 'LOW',
    score: 90,
    yield: '8 qtl/acre',
    cost: 28000,
    marketPrice: 6200,
    msp: 6015,
  },
  {
    name: 'Soybean',
    variety: 'JS-335',
    type: 'OILSEED',
    roi: 40.6,
    profit: 13000,
    duration: 100,
    risk: 'MEDIUM',
    score: 88,
    yield: '10 qtl/acre',
    cost: 32000,
    marketPrice: 4300,
    msp: 4300,
  },
  {
    name: 'Mustard',
    variety: 'Pusa Bold',
    type: 'OILSEED',
    roi: 51.2,
    profit: 12800,
    duration: 130,
    risk: 'LOW',
    score: 92,
    yield: '9 qtl/acre',
    cost: 25000,
    marketPrice: 5450,
    msp: 5450,
  },
  {
    name: 'Sesame',
    variety: 'RT-346',
    type: 'OILSEED',
    roi: 51.1,
    profit: 11250,
    duration: 85,
    risk: 'LOW',
    score: 95,
    yield: '5 qtl/acre',
    cost: 22000,
    marketPrice: 7830,
    msp: 7830,
  },
  {
    name: 'Rice',
    variety: 'IR-64',
    type: 'CEREAL',
    roi: 16.7,
    profit: 7500,
    duration: 140,
    risk: 'HIGH',
    score: 60,
    yield: '25 qtl/acre',
    cost: 45000,
    marketPrice: 2040,
    msp: 2040,
  },
];

export type Crop = (typeof cropsData)[0];

export default function CompareCropsPage() {
  const [selectedCrop, setSelectedCrop] = useState<Crop | null>(null);

  return (
    <div className="bg-[#fcf8e8] dark:bg-gray-900 p-8 rounded-lg relative">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold font-headline tracking-wider text-black dark:text-white">
          CROP ECONOMICS COMPARISON
        </h1>
        <p className="text-muted-foreground mt-2">
          Make informed decisions with data-driven insights
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {cropsData.map((crop, index) => (
          <CropComparisonCard
            key={index}
            crop={crop}
            onCardClick={() => setSelectedCrop(crop)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedCrop && (
          <CropDetailsModal
            crop={selectedCrop}
            onClose={() => setSelectedCrop(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
