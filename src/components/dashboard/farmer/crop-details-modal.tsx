'use client';

import { motion } from 'framer-motion';
import { X, TrendingUp, IndianRupee, Diamond } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { Crop } from '@/app/dashboard/farmer/compare-crops/page';

type CropDetailsModalProps = {
  crop: Crop;
  onClose: () => void;
};

const riskStyles = {
  LOW: {
    badge: 'bg-green-500 text-white',
  },
  MEDIUM: {
    badge: 'bg-yellow-500 text-black',
  },
  HIGH: {
    badge: 'bg-red-500 text-white',
  },
};

const CropDetailsModal = ({ crop, onClose }: CropDetailsModalProps) => {
    const risk = riskStyles[crop.risk as keyof typeof riskStyles];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="bg-white dark:bg-gray-800 w-full max-w-sm rounded-lg border-4 border-black p-4 relative text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          size="icon"
          onClick={onClose}
          className="absolute top-2 right-2 w-8 h-8 bg-pink-500 hover:bg-pink-600 text-white rounded-md border-2 border-black"
        >
          <X className="w-5 h-5" />
        </Button>

        <h2 className="font-bold text-4xl mb-4 font-headline">{crop.name}</h2>

        <div className="space-y-3">
          <div className="bg-yellow-400 border-2 border-black rounded-md p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-bold flex items-center gap-1">
              <TrendingUp className="w-4 h-4" />
              ROI
            </div>
            <div className="text-4xl font-bold">{crop.roi.toFixed(1)}%</div>
          </div>
          <div className="bg-green-400 border-2 border-black rounded-md p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="text-sm font-bold flex items-center gap-1">
              <IndianRupee className="w-4 h-4" />
              NET PROFIT
            </div>
            <div className="text-3xl font-bold">
              ₹{crop.profit.toLocaleString('en-IN')}/acre
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-2 text-base">
          <div className="flex justify-between">
            <span className="font-medium">Yield:</span>
            <span className="font-bold">{crop.yield}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Cost:</span>
            <span className="font-bold">₹{crop.cost.toLocaleString('en-IN')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Market Price:</span>
            <span className="font-bold">₹{crop.marketPrice.toLocaleString('en-IN')}/qtl</span>
          </div>
           <div className="flex justify-between">
            <span className="font-medium">MSP:</span>
            <span className="font-bold">₹{crop.msp.toLocaleString('en-IN')}/qtl</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium">Duration:</span>
            <span className="font-bold">{crop.duration} days</span>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 gap-2">
            <div
            className={cn(
                'flex items-center justify-center w-full gap-1.5 text-sm font-bold px-4 py-2.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]',
                risk.badge
            )}
            >
            <Diamond className="h-4 h-4" />
            {crop.risk}
            </div>
            <div className="flex items-center justify-center w-full gap-1.5 text-white text-sm font-bold px-4 py-2.5 rounded-full border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] bg-blue-600 border-blue-800">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-4 w-4"><path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.22 9.6L12.01 16.03L7.78 12.38L9.21 10.97L11.99 13.2L14.79 8.21L16.22 9.6Z" fill="white"/></svg>
                {crop.score}/100
            </div>
        </div>

      </motion.div>
    </motion.div>
  );
};

export default CropDetailsModal;
