import { useWeatherDetails, type City } from '@weather-app/core';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Skeleton } from '../components/ui/skeleton';
import Forecast from '../shared-ui/Forecast';
import WeatherHeader from '../shared-ui/WeatherHeader';
import WeatherStats from '../shared-ui/WeatherStats';
import { FiArrowLeft } from 'react-icons/fi';

export default function DetailPage() {
  const navigate = useNavigate();
  const { city: cityName, lat, lon, country } = useParams();
  const city = {
    name: cityName,
    coord: {
      lat: Number(lat),
      lon: Number(lon),
    },
    sys: {
      country: country,
    },
  };
  const { weather, daily, isLoading, refetch } = useWeatherDetails(city as City);

  useEffect(() => {
    refetch();
  }, [city]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Skeleton className="w-40 h-40 rounded-full" />
      </div>
    );
  }

  if (!weather) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <p className="text-lg text-gray-200">
          Failed to load weather data.
        </p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-5xl mx-auto space-y-6">
      <Button className='h-14 w-14 rounded-full fixed top-4 left-4 items-center justify-center bg-green-500/30' onClick={() => navigate(-1)}>
        <FiArrowLeft />
      </Button>
      <WeatherHeader weather={weather} />
      <WeatherStats weather={weather} />
      <Forecast daily={daily} />
    </div>
  );
}