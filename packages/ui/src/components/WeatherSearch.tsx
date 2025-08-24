// packages/ui/src/components/WeatherSearch.tsx

import React, { useState, useEffect } from 'react';
import { LocationSearchResult } from '@weather-app/core';

export interface WeatherSearchProps {
  onCitySearch: (cityName: string) => void;
  onLocationRequest?: () => void;
  onLocationSelect?: (location: LocationSearchResult) => void;
  searchResults?: LocationSearchResult[];
  isLoading?: boolean;
  error?: string | null;
  hasLocationPermission?: boolean;
  className?: string;
  style?: React.CSSProperties;
  placeholder?: string;
  showLocationButton?: boolean;
  autoComplete?: boolean;
}

export const WeatherSearch: React.FC<WeatherSearchProps> = ({
  onCitySearch,
  onLocationRequest,
  onLocationSelect,
  searchResults = [],
  isLoading = false,
  error = null,
  hasLocationPermission = true,
  className = '',
  style,
  placeholder = "Search for a city...",
  showLocationButton = true,
  autoComplete = true,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onCitySearch(searchQuery.trim());
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }
  };

  const handleLocationSelect = (location: LocationSearchResult) => {
    setSearchQuery(`${location.name}, ${location.country}`);
    setShowSuggestions(false);
    setSelectedIndex(-1);
    onLocationSelect?.(location);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || searchResults.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < searchResults.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleLocationSelect(searchResults[selectedIndex]);
        } else {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setSelectedIndex(-1);
    
    if (value.trim() && autoComplete) {
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleInputFocus = () => {
    if (searchQuery.trim() && searchResults.length > 0 && autoComplete) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    // Delay hiding suggestions to allow clicking on them
    setTimeout(() => {
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, 200);
  };

  return (
    <div className={`weather-search ${className}`} style={style}>
      <form onSubmit={handleSearchSubmit} className="search-form">
        <div className="search-input-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            placeholder={placeholder}
            className={`search-input ${error ? 'error' : ''}`}
            disabled={isLoading}
          />
          
          <button
            type="submit"
            className="search-button"
            disabled={isLoading || !searchQuery.trim()}
          >
            {isLoading ? (
              <span className="loading-spinner">⟳</span>
            ) : (
              <span className="search-icon">🔍</span>
            )}
          </button>
        </div>

        {showLocationButton && (
          <button
            type="button"
            onClick={onLocationRequest}
            className={`location-button ${!hasLocationPermission ? 'permission-required' : ''}`}
            disabled={isLoading}
            title={hasLocationPermission ? "Use my location" : "Location permission required"}
          >
            <span className="location-icon">📍</span>
            <span className="location-text">Use My Location</span>
          </button>
        )}
      </form>

      {/* Search Suggestions */}
      {showSuggestions && searchResults.length > 0 && autoComplete && (
        <div className="search-suggestions">
          {searchResults.map((location, index) => (
            <div
              key={`${location.lat}-${location.lon}`}
              className={`suggestion-item ${index === selectedIndex ? 'selected' : ''}`}
              onClick={() => handleLocationSelect(location)}
            >
              <div className="suggestion-main">
                <span className="suggestion-name">{location.name}</span>
                <span className="suggestion-country">{location.country}</span>
              </div>
              {location.state && (
                <div className="suggestion-state">{location.state}</div>
              )}
              <div className="suggestion-coords">
                {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="search-error">
          <span className="error-icon">⚠️</span>
          <span className="error-message">{error}</span>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="search-loading">
          <span className="loading-spinner">⟳</span>
          <span className="loading-text">Searching...</span>
        </div>
      )}
    </div>
  );
};

export const SearchHistory: React.FC<{
  history: string[];
  onHistoryItemSelect: (city: string) => void;
  onClearHistory?: () => void;
  maxItems?: number;
}> = ({
  history,
  onHistoryItemSelect,
  onClearHistory,
  maxItems = 5,
}) => {
  const displayHistory = history.slice(0, maxItems);

  if (displayHistory.length === 0) return null;

  return (
    <div className="search-history">
      <div className="history-header">
        <span className="history-title">Recent Searches</span>
        {onClearHistory && (
          <button 
            className="clear-history-button"
            onClick={onClearHistory}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
      
      <div className="history-list">
        {displayHistory.map((city, index) => (
          <button
            key={`${city}-${index}`}
            className="history-item"
            onClick={() => onHistoryItemSelect(city)}
            type="button"
          >
            <span className="history-icon">🕐</span>
            <span className="history-city">{city}</span>
          </button>
        ))}
      </div>
    </div>
  );
};