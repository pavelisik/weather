import { useState, useEffect } from 'react';
import { postSuggestions } from '@/services/api/requests';
import type { Suggestion } from '@/types/types';

const useSuggestions = (cityQuery: string) => {
    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!cityQuery.trim()) {
            setSuggestions([]);
            return;
        }

        // запрос с таймером
        const handler = setTimeout(() => {
            setLoading(true);
            setError(null);

            // сохраняем текущее значение для проверок быстрой смены запроса
            const currentQuery = cityQuery;

            postSuggestions(cityQuery)
                .then((data) => {
                    if (cityQuery === currentQuery && data) {
                        setSuggestions(data);
                    }
                })
                .catch(() => {
                    if (cityQuery === currentQuery) {
                        setError('Ошибка загрузки подсказок');
                    }
                })
                .finally(() => {
                    if (cityQuery === currentQuery) {
                        setLoading(false);
                    }
                });
        }, 300);

        // очищаем таймер при каждом новом вводе
        return () => clearTimeout(handler);
    }, [cityQuery]);

    return { suggestions, suggestionsLoading: loading, suggestionsError: error };
};

export default useSuggestions;
