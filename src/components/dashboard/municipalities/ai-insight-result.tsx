
'use client';

import { AIInsightOutput } from '@/ai/flows/municipalities-dashboard-insights';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ArrowDown, ArrowUp, BarChart2, CheckCircle, PieChart, TrendingUp, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Pie,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Cell,
  Tooltip,
} from 'recharts';

type AIInsightResultProps = {
  result: AIInsightOutput;
};

const getChangeIcon = (change?: string) => {
  if (!change) return null;
  if (change.startsWith('+')) {
    return <ArrowUp className="h-4 w-4 text-green-500" />;
  }
  if (change.startsWith('-')) {
    return <ArrowDown className="h-4 w-4 text-red-500" />;
  }
  return null;
};

const ChartComponent = ({ chart }: { chart: AIInsightOutput['charts'][0] }) => {
    const chartConfig = {
        value: {
            label: "Value",
            color: "hsl(var(--chart-1))",
        },
    };

    if (chart.type === 'bar') {
        return (
            <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart.data} margin={{ top: 20, right: 20, bottom: 5, left: 0 }}>
                    <CartesianGrid vertical={false} />
                    <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="value" fill="var(--color-value)" radius={4} />
                </BarChart>
                </ResponsiveContainer>
            </ChartContainer>
        );
    }

    if (chart.type === 'pie') {
        const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
        return (
            <ChartContainer config={chartConfig} className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie data={chart.data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                            {chart.data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<ChartTooltipContent hideLabel />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        );
    }
    
    return <div>Chart type not supported.</div>;
};


export function AIInsightResult({ result }: AIInsightResultProps) {
  return (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
    >
        <Card className="shadow-lg">
            <CardHeader>
                <CardTitle className="font-headline text-2xl">{result.title}</CardTitle>
                <CardDescription>{result.summary}</CardDescription>
            </CardHeader>
            
            {result.keyMetrics && result.keyMetrics.length > 0 && (
                <CardContent>
                    <Separator className="my-4" />
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><TrendingUp className="h-5 w-5" /> Key Metrics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {result.keyMetrics.map((metric, index) => (
                        <Card key={index} className="p-4">
                            <p className="text-sm text-muted-foreground">{metric.label}</p>
                            <p className="text-2xl font-bold">{metric.value}</p>
                            {metric.change && <p className="text-sm flex items-center gap-1">{getChangeIcon(metric.change)} {metric.change}</p>}
                        </Card>
                    ))}
                    </div>
                </CardContent>
            )}

            {result.charts && result.charts.length > 0 && (
                 <CardContent>
                    <Separator className="my-4" />
                    <div className="space-y-6">
                        {result.charts.map((chart, index) => (
                            <div key={index}>
                                <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                                    {chart.type === 'bar' && <BarChart2 className="h-5 w-5" />}
                                    {chart.type === 'pie' && <PieChart className="h-5 w-5" />}
                                    {chart.title}
                                </h3>
                                <ChartComponent chart={chart} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}

            {result.recommendations && result.recommendations.length > 0 && (
                <CardContent>
                    <Separator className="my-4" />
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2"><CheckCircle className="h-5 w-5" /> Recommendations</h3>
                    <ul className="space-y-2">
                        {result.recommendations.map((rec, index) => (
                        <li key={index} className="flex items-start gap-3 p-2 bg-secondary/50 rounded-md">
                            <AlertTriangle className="h-5 w-5 text-amber-500 mt-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{rec}</span>
                        </li>
                        ))}
                    </ul>
                </CardContent>
            )}
        </Card>
    </motion.div>
  );
}
