// packages/ui/src/components/WeatherCard.tsx

import React from 'react';
 import {
  formatTemperature,
  formatWindSpeed,
  formatHumidity,
  getWeatherIconUrl,
  getWeatherEmoji,
  formatTime,
  getUVIndexDescription,
  getWindDirection,
  getFeelsLikeDescription,
  WeatherCondition,
  CurrentWeather,
} from '@weather-app/core';
  
export interface WeatherCardProps {
  weather: CurrentWeather;
  cityName: string;
  className?: string;
  style?: React.CSSProperties;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export interface WeatherIconProps {
  condition: WeatherCondition;
  size?: 'small' | 'medium' | 'large';
  showEmoji?: boolean;
}

export const WeatherIcon: React.FC<WeatherIconProps> = ({ 
  condition, 
  size = 'medium',
  showEmoji = false 
}) => {
  const sizeMap = {
    small: { width: 50, height: 50, iconSize: '2x' as const },
    medium: { width: 80, height: 80, iconSize: '2x' as const },
    large: { width: 120, height: 120, iconSize: '4x' as const },
  };

  const { width, height, iconSize } = sizeMap[size];

  if (showEmoji) {
    return (
      <div className="weather-emoji" style={{ fontSize: size === 'large' ? '4rem' : '2rem' }}>
        {getWeatherEmoji(condition.main)}
      </div>
    );
  }

  return (
    <img
      src={getWeatherIconUrl(condition.icon, iconSize)}
      alt={condition.description}
      style={{ width, height }}
      className="weather-icon"
    />
  );
};

export const WeatherCard: React.FC<WeatherCardProps> = ({
  weather,
  cityName,
  className = '',
  style,
  onRefresh,
  isRefreshing = false,
}) => {
  const primaryCondition = weather.weather[0];
  const uvIndex = getUVIndexDescription(weather.uvi);
  const windDirection = getWindDirection(weather.wind_deg);
  const feelsLikeDesc = getFeelsLikeDescription(weather.temp, weather.feels_like);

  return (
    <div className={`weather-card ${className}`} style={style}>
      {/* Header */}
      <div className="weather-card-header">
        <h2 className="city-name">{cityName}</h2>
        {onRefresh && (
          <button
            className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`}
            onClick={onRefresh}
            disabled={isRefreshing}
          >
            ↻
          </button>
        )}
      </div>

      {/* Main weather info */}
      <div className="weather-main">
        <div className="weather-icon-container">
          <WeatherIcon condition={primaryCondition} size="large" />
        </div>
        
        <div className="weather-temp-info">
          <div className="current-temp">
            {formatTemperature(weather.temp)}
          </div>
          <div className="weather-condition">
            {primaryCondition.description}
          </div>
          <div className="feels-like">
            Feels like {formatTemperature(weather.feels_like)}
          </div>
        </div>
      </div>

      {/* Weather details */}
      <div className="weather-details">
        <div className="weather-detail-row">
          <div className="weather-detail">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{formatHumidity(weather.humidity)}</span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Wind</span>
            <span className="detail-value">
              {formatWindSpeed(weather.wind_speed)} {windDirection}
            </span>
          </div>
        </div>

        <div className="weather-detail-row">
          <div className="weather-detail">
            <span className="detail-label">UV Index</span>
            <span className="detail-value" style={{ color: uvIndex.color }}>
              {weather.uvi} ({uvIndex.level})
            </span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Visibility</span>
            <span className="detail-value">{Math.round(weather.visibility / 1000)} km</span>
          </div>
        </div>

        <div className="weather-detail-row">
          <div className="weather-detail">
            <span className="detail-label">Pressure</span>
            <span className="detail-value">{weather.pressure} hPa</span>
          </div>
          <div className="weather-detail">
            <span className="detail-label">Clouds</span>
            <span className="detail-value">{weather.clouds}%</span>
          </div>
        </div>
      </div>

      {/* Sun times */}
      <div className="sun-times">
        <div className="sun-time">
          <span className="sun-label">🌅 Sunrise</span>
          <span className="sun-value">{formatTime(weather.sunrise)}</span>
        </div>
        <div className="sun-time">
          <span className="sun-label">🌇 Sunset</span>
          <span className="sun-value">{formatTime(weather.sunset)}</span>
        </div>
      </div>
    </div>
  );
};