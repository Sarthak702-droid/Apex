
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, ResponsiveContainer } from 'recharts';
import { Loader2 } from 'lucide-react';
import { format, parseISO } from 'date-fns';

type WeatherData = {
  time: string[];
  temperature: number[];
};

const chartConfig = {
  temperature: {
    label: 'Temperature (°C)',
    color: 'hsl(var(--chart-2))',
  },
};

export function WeatherForecast() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=20.30&longitude=85.83&hourly=temperature_2m');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const result = await response.json();
        
        const transformedData = result.hourly.time.map((t: string, index: number) => ({
          time: t, // Keep as ISO string for recharts
          temperature: result.hourly.temperature_2m[index],
        })).filter((_: any, index: number) => index % 3 === 0); // Take data every 3 hours for readability

        setData(transformedData);
      } catch (err) {
        setError('Could not load weather data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, []);

  if (loading) {
    return (
        <div className="flex items-center justify-center rounded-lg border bg-card p-8 h-96">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <p className="text-muted-foreground">Loading Weather Data...</p>
            </div>
        </div>
    );
  }

  if (error) {
    return <div className="text-destructive p-4 border border-destructive/50 rounded-lg bg-destructive/10">{error}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Hourly Temperature Forecast</CardTitle>
        <CardDescription>Next 7 days for Bhubaneswar, India</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <ResponsiveContainer>
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 20,
                left: -10,
                bottom: 60,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={(tick) => format(parseISO(tick), 'MMM d, HH:mm')}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
                interval={4}
              />
              <YAxis
                domain={['dataMin - 2', 'dataMax + 2']}
                allowDataOverflow
                unit="°C"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
                formatter={(value, name, props) => [`${value}°C`, 'Temperature']}
                labelFormatter={(label) => {
                    if(typeof label === 'string' && label.trim() !== '') {
                        try {
                            return format(parseISO(label), 'eeee, MMM d, HH:mm');
                        } catch (e) {
                            return label;
                        }
                    }
                    return label;
                 }}
              />
              <Line
                dataKey="temperature"
                type="monotone"
                stroke="var(--color-temperature)"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
