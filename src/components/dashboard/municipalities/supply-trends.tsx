'use client';

import {
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ResponsiveContainer, Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';

const chartData = [
  { commodity: 'Lentils', current: 1800, forecast: 2200 },
  { commodity: 'Onions', current: 3000, forecast: 3000 },
  { commodity: 'Potatoes', current: 4500, forecast: 3500 },
  { commodity: 'Tomatoes', current: 1200, forecast: 2000 },
  { commodity: 'Wheat', current: 3200, forecast: 3000 },
  { commodity: 'Rice', current: 5200, forecast: 4800 },
];

const chartConfig = {
  current: {
    label: 'Current Supply',
    color: 'hsl(var(--chart-2))',
  },
  forecast: {
    label: 'Demand Forecast',
    color: 'hsl(var(--chart-4))',
  },
};

export function SupplyTrends() {
  return (
    <>
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          Supply Trends
        </CardTitle>
      </CardHeader>
      <div className="p-6 pt-0">
        <ChartContainer config={chartConfig} className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="commodity" tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
              <YAxis tickLine={false} axisLine={false} domain={[0, 6000]} />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
              />
              <Line
                dataKey="current"
                type="monotone"
                stroke="var(--color-current)"
                strokeWidth={2.5}
                dot={{ r: 5, fill: 'var(--color-current)' }}
              />
              <Line
                dataKey="forecast"
                type="monotone"
                stroke="var(--color-forecast)"
                strokeWidth={2.5}
                dot={{ r: 5, fill: 'var(--color-forecast)' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
         <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[--color-current]" style={{'--color-current': chartConfig.current.color} as React.CSSProperties} />
            <span className='text-muted-foreground'>Current Supply</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-0.5 bg-[--color-forecast]" style={{'--color-forecast': chartConfig.forecast.color} as React.CSSProperties} />
            <span className='text-muted-foreground'>Demand Forecast</span>
          </div>
        </div>
      </div>
    </>
  );
}
