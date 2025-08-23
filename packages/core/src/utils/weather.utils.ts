// packages/core/src/utils/weather.utils.ts

import { WeatherCondition, DailyWeather } from '../types/weather.types';

/**
 * Format temperature with unit
 */
export const formatTemperature = (temp: number, unit: 'C' | 'F' = 'C'): string => {
  return `${Math.round(temp)}°${unit}`;
};

/**
 * Format wind speed
 */
export const formatWindSpeed = (speed: number, unit: 'metric' | 'imperial' = 'metric'): string => {
  const unitLabel = unit === 'metric' ? 'm/s' : 'mph';
  return `${Math.round(speed * 10) / 10} ${unitLabel}`;
};

/**
 * Format humidity percentage
 */
export const formatHumidity = (humidity: number): string => {
  return `${humidity}%`;
};

/**
 * Get weather icon URL from OpenWeatherMap
 */
export const getWeatherIconUrl = (iconCode: string, size: '2x' | '4x' = '2x'): string => {
  return `https://openweathermap.org/img/wn/${iconCode}@${size}.png`;
};

/**
 * Get weather condition emoji
 */
export const getWeatherEmoji = (condition: string): string => {
  const weatherEmojis: Record<string, string> = {
    'Clear': '☀️',
    'Clouds': '☁️',
    'Rain': '🌧️',
    'Drizzle': '🌦️',
    'Thunderstorm': '⛈️',
    'Snow': '❄️',
    'Mist': '🌫️',
    'Fog': '🌫️',
    'Haze': '🌫️',
    'Dust': '🌪️',
    'Sand': '🌪️',
    'Ash': '🌋',
    'Squall': '💨',
    'Tornado': '🌪️',
  };

  return weatherEmojis[condition] || '🌤️';
};

/**
 * Convert timestamp to readable date
 */
export const formatDate = (timestamp: number, options?: Intl.DateTimeFormatOptions): string => {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(timestamp * 1000).toLocaleDateString('en-US', options || defaultOptions);
};

/**
 * Convert timestamp to time
 */
export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Get day of week from timestamp
 */
export const getDayOfWeek = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString('en-US', {
    weekday: 'short',
  });
};

/**
 * Check if timestamp is today
 */
export const isToday = (timestamp: number): boolean => {
  const today = new Date();
  const date = new Date(timestamp * 1000);
  return (
    today.getDate() === date.getDate() &&
    today.getMonth() === date.getMonth() &&
    today.getFullYear() === date.getFullYear()
  );
};

/**
 * Get UV index description
 */
export const getUVIndexDescription = (uvi: number): { level: string; color: string } => {
  if (uvi <= 2) return { level: 'Low', color: '#289500' };
  if (uvi <= 5) return { level: 'Moderate', color: '#F7D708' };
  if (uvi <= 7) return { level: 'High', color: '#F85532' };
  if (uvi <= 10) return { level: 'Very High', color: '#D8001D' };
  return { level: 'Extreme', color: '#6B49C8' };
};

/**
 * Get wind direction from degrees
 */
export const getWindDirection = (degrees: number): string => {
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
};

/**
 * Get next 5 days forecast from daily array
 */
export const getNext5DaysForecast = (daily: DailyWeather[]): DailyWeather[] => {
  // Skip today (index 0) and get next 5 days
  return daily.slice(1, 6);
};

/**
 * Calculate feels like description
 */
export const getFeelsLikeDescription = (temp: number, feelsLike: number): string => {
  const difference = Math.abs(temp - feelsLike);
  
  if (difference <= 2) return 'Similar to actual temperature';
  
  if (feelsLike > temp) {
    if (difference <= 5) return 'Feels slightly warmer';
    return 'Feels much warmer due to humidity';
  } else {
    if (difference <= 5) return 'Feels slightly cooler';
    return 'Feels much cooler due to wind';
  }
};

/**
 * Get weather condition color theme
 */
export const getWeatherTheme = (condition: string): { primary: string; secondary: string } => {
  const themes: Record<string, { primary: string; secondary: string }> = {
    'Clear': { primary: '#FFA500', secondary: '#FFE4B5' },
    'Clouds': { primary: '#708090', secondary: '#F0F8FF' },
    'Rain': { primary: '#4682B4', secondary: '#E6F3FF' },
    'Drizzle': { primary: '#87CEEB', secondary: '#F0F8FF' },
    'Thunderstorm': { primary: '#2F4F4F', secondary: '#E6E6FA' },
    'Snow': { primary: '#B0E0E6', secondary: '#F8F8FF' },
    'Mist': { primary: '#D3D3D3', secondary: '#F5F5F5' },
    'Fog': { primary: '#D3D3D3', secondary: '#F5F5F5' },
  };

  return themes[condition] || { primary: '#87CEEB', secondary: '#F0F8FF' };
};

/**
 * Validate coordinates
 */
export const isValidCoordinates = (lat: number, lon: number): boolean => {
  return lat >= -90 && lat <= 90 && lon >= -180 && lon <= 180;
};

/**
 * Format precipitation probability
 */
export const formatPrecipitation = (pop: number): string => {
  return `${Math.round(pop * 100)}%`;
};