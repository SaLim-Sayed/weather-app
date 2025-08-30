import type { City } from '@weather-app/core/src/hooks/useAppCitySearch';
import { FiMapPin } from "react-icons/fi";
import {
    Card,
    CardDescription,
    CardTitle
} from "../components/ui/card";
const CityCard = ({ city, onClick }: {
    city: City;
    onClick?: () => void;
    onDelete?: () => void;
}) => (
    <Card contentEditable={false} onClick={onClick} className="bg-white/10 backdrop-blur-sm rounded-2xl max-w-xl  min-w-80  cursor-pointer p-4 mb-3 border border-white/20">
        <div className="flex items-center gap-3 flex-1">
            <FiMapPin size={24} className="text-white" />
            <div className="flex-1 flex items-center justify-between">
                <CardTitle className="text-white text-lg font-bold">{city.name}</CardTitle>
                <CardDescription className="text-gray-300 text-sm">
                    {city.sys?.country}
                </CardDescription>
            </div>
        </div>

        <CardDescription className="flex items-center justify-between">
            {city.weather?.[0]?.description && (
                <CardDescription className="text-gray-300 text-sm capitalize">
                    {city.weather[0].description}
                </CardDescription>
            )}
            {city.main?.temp && (
                <div className="flex items-center gap-2">
                    {city.weather?.[0]?.icon && (
                        <img
                            src={`https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png`}
                            alt="weather icon"
                            className="w-12 h-12"
                        />
                    )}
                    <span className="text-white text-xl font-bold">
                        {Math.round(city.main.temp)}°C
                    </span>
                </div>
            )}

        </CardDescription>

    </Card>
);

export default CityCard;