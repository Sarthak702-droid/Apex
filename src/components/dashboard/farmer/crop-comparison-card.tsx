'use client';

import { Sprout, Diamond, Droplets } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Crop } from '@/app/dashboard/farmer/compare-crops/page';

type CropComparisonCardProps = {
  crop: Crop;
  onCardClick: () => void;
};

const roiColor = (roi: number) => {
  if (roi > 75) return 'text-green-500';
  if (roi > 40) return 'text-yellow-500';
  return 'text-red-500';
};

const riskStyles = {
  LOW: {
    badge: 'bg-green-500 hover:bg-green-600 border-green-700',
    icon: <Diamond className="h-4 w-4" />,
  },
  MEDIUM: {
    badge: 'bg-yellow-500 hover:bg-yellow-600 border-yellow-700 text-black',
    icon: <Diamond className="h-4 w-4" />,
  },
  HIGH: {
    badge: 'bg-red-500 hover:bg-red-600 border-red-700',
    icon: <Diamond className="h-4 w-4" />,
  },
};

const CropComparisonCard = ({ crop, onCardClick }: CropComparisonCardProps) => {
  const risk = riskStyles[crop.risk as keyof typeof riskStyles];

  return (
    <button
      onClick={onCardClick}
      className="bg-white dark:bg-gray-800 p-4 rounded-lg border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] transition-transform hover:translate-x-[-2px] hover:translate-y-[-2px] text-left w-full"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white p-2 rounded-md border-2 border-black">
            <Sprout className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{crop.name}</h3>
            <p className="text-sm text-muted-foreground">{crop.variety}</p>
          </div>
        </div>
        <div
          className={cn(
            'text-xs font-bold px-3 py-1 rounded-full border-2 border-black',
            crop.type === 'OILSEED' ? 'bg-green-400' : 'bg-yellow-400'
          )}
        >
          {crop.type}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <p className="text-sm font-medium text-muted-foreground">ROI</p>
          <p className={cn('text-3xl font-bold', roiColor(crop.roi))}>
            {crop.roi.toFixed(1)}%
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-sm font-medium text-muted-foreground">PROFIT/ACRE</p>
          <p className="text-xl font-bold">
            ₹{crop.profit.toLocaleString('en-IN')}
          </p>
        </div>
        <div className="flex justify-between items-baseline">
          <p className="text-sm font-medium text-muted-foreground">DURATION</p>
          <p className="text-xl font-bold">{crop.duration} days</p>
        </div>
      </div>

      <div className="flex justify-between items-center mt-6">
        <div
          className={cn(
            'flex items-center gap-1.5 text-white text-sm font-bold px-4 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
            risk.badge
          )}
        >
          {risk.icon}
          {crop.risk} RISK
        </div>
        <div className="flex items-center gap-1.5 text-white text-sm font-bold px-4 py-1.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-blue-600 border-blue-800">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.22 9.6L12.01 16.03L7.78 12.38L9.21 10.97L11.99 13.2L14.79 8.21L16.22 9.6Z" fill="white"/></svg>
          SCORE: {crop.score}/100
        </div>
      </div>
    </button>
  );
};

export default CropComparisonCard;
