
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Area, AreaChart, CartesianGrid, XAxis, ResponsiveContainer, YAxis } from 'recharts';
import { format, subHours, addMinutes } from 'date-fns';

const generateErrorData = () => {
    const data = [];
    const now = new Date();
    for (let i = 24 * 4; i >= 0; i--) { // every 15 minutes
        const time = addMinutes(subHours(now, 24), i * 15);
        let errorRate = Math.random() * 0.1; // base rate below 0.1%

        // Simulate a small spike
        if (time.getHours() === 15) {
            errorRate += Math.random() * 0.2;
        }

        data.push({ time: format(time, 'HH:mm'), errorRate: parseFloat(errorRate.toFixed(3)) });
    }
    return data;
}

const chartData = generateErrorData();

const chartConfig = {
  errorRate: {
    label: 'Error Rate (%)',
    color: 'hsl(var(--destructive))',
  },
};

export function ErrorRateChart() {
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
            <linearGradient id="fillErrorRate" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-errorRate)" stopOpacity={0.8} />
              <stop offset="95%" stopColor="var(--color-errorRate)" stopOpacity={0.1} />
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
            unit="%"
            domain={[0, 'dataMax + 0.1']}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="dot" />}
          />
          <Area
            dataKey="errorRate"
            type="monotone"
            fill="url(#fillErrorRate)"
            stroke="var(--color-errorRate)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
