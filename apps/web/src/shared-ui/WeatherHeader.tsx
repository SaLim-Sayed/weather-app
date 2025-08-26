import type { TCurrentWeather } from '@weather-app/core';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

const WeatherHeader = ({ weather }: { weather: TCurrentWeather }) => {
    return (
        <Card className="shadow-lg border-0 bg-white/0">
            <CardHeader>
                <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white text-center md:text-left">
                    {weather.name}, {weather.sys?.country}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
                <img
                    src={`https://openweathermap.org/img/wn/${weather.weather?.[0]?.icon}@4x.png`}
                    alt={weather.weather?.[0]?.description || "Weather icon"}
                    className="w-28 h-28 sm:w-32 sm:h-32"
                />
                <div className="flex flex-col items-center md:items-start space-y-2">
                    <p className="text-4xl sm:text-5xl md:text-2xl text-white font-bold">
                        {Math.round(weather.temp)}°C
                    </p>
                    <p className="capitalize text-gray-200 text-lg sm:text-xl">
                        {weather.weather?.[0]?.description}
                    </p>
                </div>
            </CardContent>
        </Card>
    );
};

export default WeatherHeader;