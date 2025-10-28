
import { WeatherForecast } from '@/components/dashboard/municipalities/weather-forecast';
import { CloudSun } from 'lucide-react';

export default function WeatherForecastPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-headline text-3xl font-bold flex items-center gap-2">
          <CloudSun className="h-8 w-8" />
          Weather Forecast
        </h1>
        <p className="text-muted-foreground">
          Monitor weather conditions to anticipate potential supply chain impacts.
        </p>
      </div>
      <WeatherForecast />
    </div>
  );
}
