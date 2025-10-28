
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
import { format, parseISO, addHours, startOfHour } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type WeatherData = {
  time: string;
  temperature: number;
};

type FilterPeriod = '24h' | '3d' | '7d';

const chartConfig = {
  temperature: {
    label: 'Temperature (°C)',
    color: 'hsl(var(--chart-2))',
  },
};

export function WeatherForecast() {
  const [allData, setAllData] = useState<WeatherData[]>([]);
  const [filteredData, setFilteredData] = useState<WeatherData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterPeriod, setFilterPeriod] = useState<FilterPeriod>('7d');

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=20.30&longitude=85.83&hourly=temperature_2m');
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const result = await response.json();
        
        const transformedData = result.hourly.time.map((t: string, index: number) => ({
          time: t,
          temperature: result.hourly.temperature_2m[index],
        }));

        setAllData(transformedData);
      } catch (err) {
        setError('Could not load weather data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, []);

  useEffect(() => {
    if (allData.length === 0) return;

    const now = startOfHour(new Date());
    let endTime: Date;

    switch (filterPeriod) {
        case '24h':
            endTime = addHours(now, 24);
            break;
        case '3d':
            endTime = addHours(now, 72);
            break;
        case '7d':
        default:
            endTime = addHours(now, 168);
            break;
    }

    const data = allData.filter(d => {
        const pointTime = parseISO(d.time);
        return pointTime >= now && pointTime <= endTime;
    });

    setFilteredData(data);

  }, [allData, filterPeriod]);

  const getAxisConfig = () => {
    switch (filterPeriod) {
        case '24h':
            return {
                tickFormatter: (tick: string) => format(parseISO(tick), 'HH:mm'),
                interval: 2,
            };
        case '3d':
            return {
                tickFormatter: (tick: string) => format(parseISO(tick), 'MMM d, HH:mm'),
                interval: 8,
            };
        case '7d':
        default:
            return {
                tickFormatter: (tick: string) => format(parseISO(tick), 'MMM d'),
                interval: 24,
            };
    }
  }

  const { tickFormatter, interval } = getAxisConfig();


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
      <CardHeader className='flex-row items-center justify-between'>
        <div>
          <CardTitle className="font-headline">Hourly Temperature Forecast</CardTitle>
          <CardDescription>Bhubaneswar, India</CardDescription>
        </div>
        <Select value={filterPeriod} onValueChange={(value: FilterPeriod) => setFilterPeriod(value)}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="24h">Next 24 Hours</SelectItem>
                <SelectItem value="3d">Next 3 Days</SelectItem>
                <SelectItem value="7d">Next 7 Days</SelectItem>
            </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-96 w-full">
          <ResponsiveContainer>
            <LineChart
              data={filteredData}
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
                tickFormatter={tickFormatter}
                angle={-45}
                textAnchor="end"
                height={80}
                tick={{ fontSize: 12 }}
                interval={interval}
              />
              <YAxis
                domain={['dataMin - 2', 'dataMax + 2']}
                allowDataOverflow
                unit="°C"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                content={<ChartTooltipContent indicator="dot" />}
                formatter={(value) => [`${value}°C`, 'Temperature']}
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
