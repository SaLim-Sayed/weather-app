import { useState } from 'react';
import SearchPage from '../components/SearchPage';
import WeatherDetailsPage from '../components/DetailPage';

type City = {
    id: number;
    name: string;
    sys?: { country?: string };
    coord: { lat: number; lon: number };
};

export default function HomeScreen() {
    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const handleCitySelect = (city: City) => {
        setSelectedCity(city);
    };

    const handleBack = () => {
        setSelectedCity(null);
    };

    return (
        <>
            {selectedCity ? (
                <WeatherDetailsPage 
                    city={selectedCity} 
                    onBack={handleBack} 
                />
            ) : (
                <SearchPage 
                    onCitySelect={handleCitySelect} 
                />
            )}
        </>
    );
}