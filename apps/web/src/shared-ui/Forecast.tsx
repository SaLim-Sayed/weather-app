import type { TDailyWeather } from '@weather-app/core';
import { Card,  CardHeader, CardTitle } from '../components/ui/card';
import { ScrollArea, ScrollBar } from '../components/ui/scroll-area';

const Forecast = ({ daily }: { daily: TDailyWeather[] }) => {
    return (
        <Card className="shadow-md border-0 bg-white/0">
            <CardHeader>
                <CardTitle className="text-lg sm:text-xl md:text-2xl font-bold text-white text-center md:text-left">
                    5-Day Forecast
                </CardTitle>
            </CardHeader>
            <ScrollArea className="w-80 sm:w-full overflow-hidden rounded-md   whitespace-nowrap">
                <div className="flex w-max space-x-4 p-4">
                    {daily.slice(0, 5).map((item: TDailyWeather, index: number) => (
                        <div key={index} className="p-4 bg-white/10 rounded-lg text-center">
                            <p className="font-semibold text-white">
                                {new Date(item.dt * 1000).toLocaleDateString("en-US", { weekday: "short" })}
                            </p>
                            <img
                                src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                                alt={item.weather[0].description}
                                className="w-10 h-10 sm:w-12 sm:h-12 mx-auto"
                            />
                            <p className="font-bold text-gray-300">
                                {Math.round(item.temp.max)}° / {Math.round(item.temp.min)}°
                            </p>
                        </div>
                    ))}
                </div>
                <ScrollBar orientation="horizontal" />

            </ScrollArea>
        </Card>
    );
};

export default Forecast;