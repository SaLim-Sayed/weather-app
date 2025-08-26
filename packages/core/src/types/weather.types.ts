export type DailyForecast = {
  date: string; 
  temp: number; 
  condition: string; 
  icon: string; 
  };
  
  
  export type WeatherData = {
  city: string;
  lat: number;
  lon: number;
  temp: number;
  feels_like: number;
  humidity: number;
  wind_speed: number;
  condition: string;
  icon: string;
  forecast: DailyForecast[]; 
  };

  export type TWeatherDescription = {
    id: number;
    main: string;
    description: string;
    icon: string;
  };
  
  export type TWeatherData = {
    dt: number;
    sunrise?: number;
    sunset?: number;
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
    wind_gust?: number;
    weather: TWeatherDescription[];
    pop?: number;
  };
  
    export type TDailyTemperature = {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  
  export type TFeelsLikeTemperature = {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  
  export type TDailyData = {
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    temp: TDailyTemperature;
    feels_like: TFeelsLikeTemperature;
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust: number;
    weather: TWeatherDescription[];
    clouds: number;
    pop: number;
    uvi: number;
  };
  
  export type TWeatherResponse = {
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
    current: TWeatherData;
    hourly: TWeatherData[];
    daily: TDailyData[];
  };

  
  // الطقس الأساسي
export type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

 export type TCurrentWeather = {
  dt: number;
  sunrise?: number;
  sunset?: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
   name?: string;
  sys?: { country?: string };
};

 export type TDailyTemp = {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
};

 export type TDailyWeather = {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: TDailyTemp;
  pressure: number;
  humidity: number;
  wind_speed: number;
  wind_deg: number;
  weather: Weather[];
  clouds: number;
  pop: number; 
  uvi: number;
};

 export type WeatherDetailsResponse = {
  current: TCurrentWeather;
  daily: TDailyWeather[];
};
