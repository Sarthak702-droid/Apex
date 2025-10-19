import CropComparisonCard from '@/components/dashboard/farmer/crop-comparison-card';
import { Sprout } from 'lucide-react';

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
  },
];

export default function CompareCropsPage() {
  return (
    <div className="bg-[#fcf8e8] dark:bg-gray-900 p-8 rounded-lg">
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
          <CropComparisonCard key={index} crop={crop} />
        ))}
      </div>
    </div>
  );
}
