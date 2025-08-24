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