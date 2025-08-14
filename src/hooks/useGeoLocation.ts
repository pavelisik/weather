import { useState, useEffect } from 'react';

const useGeoLocation = () => {
    const [lat, setLat] = useState<number | null>(null);
    const [lon, setLon] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!navigator.geolocation) {
            setError('Геолокация не поддерживается вашим браузером');
            setLoading(false);
            return;
        }

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
    }, []);

    return { lat, lon, geoLoading: loading, geoError: error };
};

export default useGeoLocation;
