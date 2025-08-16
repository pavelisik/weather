import { useState } from 'react';

export const useIPLocation = () => {
    const [city, setCity] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const getIPLocation = async () => {
        setCity(undefined);
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('http://ip-api.com/json/?lang=ru');
            const data = await res.json();
            if (data.status === 'success') {
                setCity(data.city);
            } else {
                setError('Не удалось определить местоположение по IP');
            }
        } catch {
            setError('Ошибка при запросе к IP API');
        } finally {
            setLoading(false);
        }
    };

    return { city, loading, error, getIPLocation };
};
