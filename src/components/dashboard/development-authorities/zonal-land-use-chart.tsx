
'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Pie, PieChart, Cell, ResponsiveContainer, Legend } from 'recharts';

type LandUse = {
    name: string;
    value: number;
    fill: string;
};

type ZonalLandUseChartProps = {
    landUse?: LandUse[];
}

export function ZonalLandUseChart({ landUse }: ZonalLandUseChartProps) {

    if (!landUse || landUse.length === 0) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground">
                No land use data available.
            </div>
        );
    }
  
    return (
        <ChartContainer config={{}} className="h-64 w-full">
            <ResponsiveContainer>
                <PieChart>
                    <Pie data={landUse} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={80} label>
                        {landUse.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Legend />
                    <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                </PieChart>
            </ResponsiveContainer>
        </ChartContainer>
    );
}
