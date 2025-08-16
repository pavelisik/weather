import { useState } from 'react';

export const useGeoLocation = () => {
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getGeoLocation = () => {
        if (!navigator.geolocation) {
            setError('Геолокация не поддерживается вашим браузером');
            return;
        }

        setLoading(true);
        setError(null);
        setLat(null);
        setLon(null);

        navigator.geolocation.getCurrentPosition(
            (position) => {
                setLat(position.coords.latitude);
                setLon(position.coords.longitude);
                setLoading(false);
            },
            (err) => {
                setError('Не удалось определить местоположение');
                setLoading(false);
                console.error(err);
            }
        );
    };

    return { lat, lon, loading, error, getGeoLocation };
};
