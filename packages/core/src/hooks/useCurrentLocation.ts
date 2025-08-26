import { useState, useEffect } from "react";
import { useApiQuery } from "@weather-app/core/src/api/useApiQuery";
import type { City } from "@weather-app/core/src/hooks/useCitySearch";
import { API_KEY } from "../constant/constant";

export function useCurrentLocation(onSuccess: (city: City) => void) {
  const [locationCoords, setLocationCoords] = useState<{ lat: number; lon: number } | null>(null);

  const { data: currentLocationCity, isLoading } = useApiQuery<City>({
    key: locationCoords ? ["weather-by-coords", locationCoords] : [],
    url: locationCoords
      ? `/data/2.5/weather?lat=${locationCoords.lat}&lon=${locationCoords.lon}&appid=${API_KEY}&units=metric`
      : null,
    enabled: !!locationCoords,
  });

  useEffect(() => {
    if (currentLocationCity) {
      onSuccess(currentLocationCity);
      setLocationCoords(null);
    }
  }, [currentLocationCity]);

  const requestLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocationCoords({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
        });
      },
      (err) => {
        console.error("Geolocation error:", err);

        switch (err.code) {
          case err.PERMISSION_DENIED:
            alert("Permission denied. Please enable location access in your browser settings.");
            break;
          case err.POSITION_UNAVAILABLE:
            alert("Location information is unavailable. Please check your network or try again.");
            break;
          case err.TIMEOUT:
            alert("The request to get your location timed out. Please try again.");
            break;
          default:
            alert("Failed to get current location. Please try again later.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  return { requestLocation, isLoading };
}
