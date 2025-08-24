// packages/ui/src/components/ForecastCard.tsx

import React from 'react';
import { DailyWeather } from '@weather-app/core';
import {
  formatTemperature,
  getDayOfWeek,
  formatPrecipitation,
  getNext5DaysForecast,
} from '@weather-app/core';
import { WeatherIcon } from './WeatherCard';

export interface ForecastItemProps {
  daily: DailyWeather;
  isToday?: boolean;
}

export interface ForecastCardProps {
  dailyForecast: DailyWeather[];
  className?: string;
  style?: React.CSSProperties;
  showPrecipitation?: boolean;
  compact?: boolean;
}

export const ForecastItem: React.FC<ForecastItemProps> = ({ daily, isToday = false }) => {
  const primaryCondition = daily.weather[0];
  const dayName = isToday ? 'Today' : getDayOfWeek(daily.dt);

  return (
    <div className={`forecast-item ${isToday ? 'today' : ''}`}>
      <div className="forecast-day">
        {dayName}
      </div>
      
      <div className="forecast-icon">
        <WeatherIcon condition={primaryCondition} size="small" />
      </div>
      
      <div className="forecast-temps">
        <span className="forecast-high">{formatTemperature(daily.temp.max)}</span>
        <span className="forecast-low">{formatTemperature(daily.temp.min)}</span>
      </div>
      
      {daily.pop > 0 && (
        <div className="forecast-precipitation">
          <span className="precipitation-icon">💧</span>
          <span className="precipitation-value">{formatPrecipitation(daily.pop)}</span>
        </div>
      )}
    </div>
  );
};

export const ForecastCard: React.FC<ForecastCardProps> = ({
  dailyForecast,
  className = '',
  style,
  showPrecipitation = true,
  compact = false,
}) => {
  const forecast5Days = getNext5DaysForecast(dailyForecast);

  return (
    <div className={`forecast-card ${compact ? 'compact' : ''} ${className}`} style={style}>
      <div className="forecast-header">
        <h3 className="forecast-title">5-Day Forecast</h3>
      </div>
      
      <div className="forecast-list">
        {forecast5Days.map((daily, index) => (
          <ForecastItem
            key={daily.dt}
            daily={daily}
            isToday={false}
          />
        ))}
      </div>
    </div>
  );
};

export const ExtendedForecastCard: React.FC<ForecastCardProps & { 
  onDaySelect?: (daily: DailyWeather) => void;
  selectedDay?: number;
}> = ({
  dailyForecast,
  className = '',
  style,
  onDaySelect,
  selectedDay,
}) => {
  const forecast5Days = getNext5DaysForecast(dailyForecast);

  return (
    <div className={`extended-forecast-card ${className}`} style={style}>
      <div className="forecast-header">
        <h3 className="forecast-title">Extended Forecast</h3>
      </div>
      
      <div className="extended-forecast-list">
        {forecast5Days.map((daily, index) => {
          const isSelected = selectedDay === daily.dt;
          const primaryCondition = daily.weather[0];
          
          return (
            <div
              key={daily.dt}
              className={`extended-forecast-item ${isSelected ? 'selected' : ''}`}
              onClick={() => onDaySelect?.(daily)}
              style={{ cursor: onDaySelect ? 'pointer' : 'default' }}
            >
              <div className="extended-forecast-main">
                <div className="extended-forecast-day">
                  <div className="day-name">{getDayOfWeek(daily.dt)}</div>
                  <div className="day-condition">{primaryCondition.description}</div>
                </div>
                
                <div className="extended-forecast-icon">
                  <WeatherIcon condition={primaryCondition} size="medium" />
                </div>
                
                <div className="extended-forecast-temps">
                  <div className="temp-range">
                    <span className="high-temp">{formatTemperature(daily.temp.max)}</span>
                    <span className="temp-separator">/</span>
                    <span className="low-temp">{formatTemperature(daily.temp.min)}</span>
                  </div>
                  <div className="feels-like-range">
                    Feels {formatTemperature(daily.feels_like.day)}
                  </div>
                </div>
              </div>
              
              <div className="extended-forecast-details">
                <div className="forecast-detail">
                  <span className="detail-icon">💧</span>
                  <span className="detail-text">{formatPrecipitation(daily.pop)} chance</span>
                </div>
                <div className="forecast-detail">
                  <span className="detail-icon">💨</span>
                  <span className="detail-text">{Math.round(daily.wind_speed)} m/s</span>
                </div>
                <div className="forecast-detail">
                  <span className="detail-icon">💧</span>
                  <span className="detail-text">{daily.humidity}% humidity</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};