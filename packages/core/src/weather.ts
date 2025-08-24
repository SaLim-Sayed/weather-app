
import axios from "axios";
import { useEffect, useState } from "react";

export function useWeatherAxios(city: string) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        async function fetchWeather() {
            try {
                setLoading(true);
                const res = await axios.get(
                    `https://samples.openweathermap.org/data/2.5/weather?q=${city}&appid=b6907d289e10d714a6e88b30761fae22`
                );
                setData(res.data);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        }

        if (city) fetchWeather();
    }, [city]);

    return { data, loading, error };
}
