 export const API_URL = "https://api.openweathermap.org"; // v3.0 and geo


// App sets this at runtime (web: VITE_OPENWEATHER_API_KEY, mobile: EXPO_PUBLIC_OPENWEATHER_API_KEY)
let _OPENWEATHER_API_KEY: string | undefined;
export function setOpenWeatherApiKey(key: string) {
_OPENWEATHER_API_KEY = key;
}
export function getOpenWeatherApiKey(): string {
if (!_OPENWEATHER_API_KEY) throw new Error("OpenWeather API key not set");
return _OPENWEATHER_API_KEY;
}