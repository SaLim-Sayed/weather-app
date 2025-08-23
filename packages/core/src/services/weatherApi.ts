/* eslint-disable no-useless-catch */
// packages/core/src/services/weatherApi.ts

import axios from 'axios';
import {
  WeatherResponse,
  LocationSearchResult,
  Coordinates,
  WeatherError,
} from '../types/weather.types';

const API_KEY = process.env.OPENWEATHER_API_KEY || 'your-api-key-here';
const BASE_URL = 'https://api.openweathermap.org';

class WeatherApiService {
  private axiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
    });

    // Request interceptor to add API key
    this.axiosInstance.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        appid: API_KEY,
      };
      return config;
    });

    // Response interceptor for error handling
    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        const weatherError: WeatherError = {
          message: 'An error occurred while fetching weather data',
          code: error.response?.status?.toString(),
        };

        if (error.response?.status === 404) {
          weatherError.message = 'City not found';
        } else if (error.response?.status === 401) {
          weatherError.message = 'Invalid API key';
        } else if (error.code === 'ECONNABORTED') {
          weatherError.message = 'Request timeout - please check your connection';
        } else if (!error.response) {
          weatherError.message = 'Network error - please check your connection';
        }

        return Promise.reject(weatherError);
      }
    );
  }

  /**
   * Search for locations by city name
   */
  async searchLocations(cityName: string, limit = 5): Promise<LocationSearchResult[]> {
    try {
      const response = await this.axiosInstance.get('/geo/1.0/direct', {
        params: {
          q: cityName,
          limit,
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get weather data by coordinates
   */
  async getWeatherByCoordinates(
    lat: number,
    lon: number,
    units = 'metric'
  ): Promise<WeatherResponse> {
    try {
      const response = await this.axiosInstance.get('/data/3.0/onecall', {
        params: {
          lat,
          lon,
          units,
          exclude: 'minutely,hourly,alerts',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get weather data by city name
   */
  async getWeatherByCity(cityName: string, units = 'metric'): Promise<WeatherResponse> {
    try {
      // First, get coordinates for the city
      const locations = await this.searchLocations(cityName, 1);
      
      if (locations.length === 0) {
        throw {
          message: `City "${cityName}" not found`,
          code: '404',
        } as WeatherError;
      }

      const { lat, lon } = locations[0];
      
      // Then get weather data
      return await this.getWeatherByCoordinates(lat, lon, units);
    } catch (error) {
      throw error;
    }
  }

  /**
   * Get reverse geocoding (location name from coordinates)
   */
  async reverseGeocode(lat: number, lon: number): Promise<LocationSearchResult> {
    try {
      const response = await this.axiosInstance.get('/geo/1.0/reverse', {
        params: {
          lat,
          lon,
          limit: 1,
        },
      });

      if (response.data.length === 0) {
        throw {
          message: 'Location not found',
          code: '404',
        } as WeatherError;
      }

      return response.data[0];
    } catch (error) {
      throw error;
    }
  }
}

export const weatherApiService = new WeatherApiService();