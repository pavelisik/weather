import { useState, useEffect } from 'react';

const useIPLocation = () => {
    const [city, setCity] = useState<string | undefined>(undefined);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                setLoading(true);
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

        fetchLocation();
    }, []);

    return { city, IPloading: loading, IPerror: error };
};

export default useIPLocation;
