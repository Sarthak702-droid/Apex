
import {
  Sun,
  Cloud,
  CloudSun,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  CloudDrizzle,
  CloudHail,
  Tornado,
  Cloudy,
  LucideProps,
} from 'lucide-react';
import React from 'react';

type WeatherInfo = {
  description: string;
  icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
};

export function getWeatherInfo(weatherCode: number): WeatherInfo {
  switch (weatherCode) {
    case 0:
      return { description: 'Clear sky', icon: Sun };
    case 1:
      return { description: 'Mainly clear', icon: Sun };
    case 2:
      return { description: 'Partly cloudy', icon: CloudSun };
    case 3:
      return { description: 'Overcast', icon: Cloud };
    case 45:
      return { description: 'Fog', icon: CloudFog };
    case 48:
      return { description: 'Depositing rime fog', icon: CloudFog };
    case 51:
      return { description: 'Light drizzle', icon: CloudDrizzle };
    case 53:
      return { description: 'Moderate drizzle', icon: CloudDrizzle };
    case 55:
      return { description: 'Dense drizzle', icon: CloudDrizzle };
    case 56:
      return { description: 'Light freezing drizzle', icon: CloudDrizzle };
    case 57:
      return { description: 'Dense freezing drizzle', icon: CloudDrizzle };
    case 61:
      return { description: 'Slight rain', icon: CloudRain };
    case 63:
      return { description: 'Moderate rain', icon: CloudRain };
    case 65:
      return { description: 'Heavy rain', icon: CloudRain };
    case 66:
      return { description: 'Light freezing rain', icon: CloudRain };
    case 67:
      return { description: 'Heavy freezing rain', icon: CloudRain };
    case 71:
      return { description: 'Slight snow fall', icon: CloudSnow };
    case 73:
      return { description: 'Moderate snow fall', icon: CloudSnow };
    case 75:
      return { description: 'Heavy snow fall', icon: CloudSnow };
    case 77:
      return { description: 'Snow grains', icon: CloudSnow };
    case 80:
      return { description: 'Slight rain showers', icon: CloudRain };
    case 81:
      return { description: 'Moderate rain showers', icon: CloudRain };
    case 82:
      return { description: 'Violent rain showers', icon: CloudRain };
    case 85:
      return { description: 'Slight snow showers', icon: CloudSnow };
    case 86:
      return { description: 'Heavy snow showers', icon: CloudSnow };
    case 95:
      return { description: 'Thunderstorm', icon: CloudLightning };
    case 96:
      return { description: 'Thunderstorm with slight hail', icon: CloudHail };
    case 99:
      return { description: 'Thunderstorm with heavy hail', icon: CloudHail };
    default:
      return { description: 'Unknown', icon: Cloudy };
  }
}
