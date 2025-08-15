import { useState, useEffect } from 'react';
import { getWeather } from '@/services/api/requests';
import type { Weather } from '@/types/types';

const useWeather = (city?: string, lat?: number, lon?: number) => {
    const [weather, setWeather] = useState<Weather | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!city && (lat === undefined || lon === undefined)) {
            setWeather(null);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        setWeather(null);

        getWeather(city, lat, lon)
            .then((data) => {
                if (data) setWeather(data);
            })
            .catch((err: any) => {
                setError(err.message || 'Не удалось загрузить');
            })
            .finally(() => setLoading(false));
    }, [city, lat, lon]);

    return { weather, weatherLoading: loading, weatherError: error };
};

export default useWeather;
