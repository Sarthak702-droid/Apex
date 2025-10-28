
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { getWeatherInfo } from '@/lib/weather-utils';
import { format, parseISO } from 'date-fns';

type DailyData = {
    time: string;
    weather_code: number;
    temperature_2m_max: number;
    temperature_2m_min: number;
}

type DailyWeatherCardProps = {
    day: DailyData;
};

export function DailyWeatherCard({ day }: DailyWeatherCardProps) {
    const { icon: WeatherIcon, description } = getWeatherInfo(day.weather_code);
    const date = parseISO(day.time);

    return (
        <Card className="w-40 flex-shrink-0">
            <CardHeader className="p-4 text-center">
                <CardTitle className="text-lg">{format(date, 'eee')}</CardTitle>
                <CardDescription>{format(date, 'MMM d')}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 flex flex-col items-center gap-2">
                <WeatherIcon className="h-10 w-10 text-primary" />
                <div className="font-bold text-xl">{Math.round(day.temperature_2m_max)}°</div>
                <div className="text-sm text-muted-foreground">{Math.round(day.temperature_2m_min)}°</div>
                <p className="text-xs text-center text-muted-foreground mt-2">{description}</p>
            </CardContent>
        </Card>
    );
}
