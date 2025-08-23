// packages/core/src/types/weather.types.ts

export interface Coordinates {
    lat: number;
    lon: number;
  }
  
  export interface WeatherCondition {
    id: number;
    main: string;
    description: string;
    icon: string;
  }
  
  export interface CurrentWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    weather: WeatherCondition[];
  }
  
  export interface DailyWeather {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: WeatherCondition[];
    clouds: number;
    pop: number;
    rain?: number;
    uvi: number;
  }
  
  export interface WeatherResponse {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: CurrentWeather;
    daily: DailyWeather[];
  }
  
  export interface LocationSearchResult {
    name: string;
    local_names?: Record<string, string>;
    lat: number;
    lon: number;
    country: string;
    state?: string;
  }
  
  export interface WeatherError {
    message: string;
    code?: string;
  }
  
  export interface WeatherState {
    currentWeather: WeatherResponse | null;
    loading: boolean;
    error: WeatherError | null;
    lastSearchedCity: string | null;
    coordinates: Coordinates | null;
  }
  
  export interface LocationPermission {
    granted: boolean;
    canAskAgain?: boolean;
  }