
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, YAxis } from 'recharts';
import { format, subHours, addMinutes } from 'date-fns';

// Generate more realistic data for the last 24 hours
const generateData = () => {
    const data = [];
    const now = new Date();
    for (let i = 24 * 4; i >= 0; i--) { // every 15 minutes
        const time = addMinutes(subHours(now, 24), i * 15);
        let responseTime = 80 + Math.random() * 40; // base around 100ms
        
        // Spike between 2-4 PM
        if (time.getHours() >= 14 && time.getHours() <= 16) {
            responseTime += 50 + Math.random() * 50;
        }
        // Dip in early morning
        if (time.getHours() >= 2 && time.getHours() <= 5) {
             responseTime -= 20 + Math.random() * 20;
        }

        data.push({ time: format(time, 'HH:mm'), responseTime: Math.round(responseTime) });
    }
    return data;
}

const chartData = generateData();


const chartConfig = {
  responseTime: {
    label: 'Response Time (ms)',
    color: 'hsl(var(--chart-1))',
  },
};

export function ApiResponseTime() {
  return (
    <ChartContainer config={chartConfig} className="h-80 w-full">
      <ResponsiveContainer>
        <AreaChart
          data={chartData}
          margin={{
            top: 5,
            right: 10,
            left: -10,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="fillResponseTime" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-responseTime)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-responseTime)" stopOpacity={0.1} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value, index) => {
                if(index % 16 === 0) return value; // Show label every 4 hours (16*15min)
                return '';
            }}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            unit="ms"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="responseTime"
            type="monotone"
            fill="url(#fillResponseTime)"
            stroke="var(--color-responseTime)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
