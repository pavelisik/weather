import axios from 'axios';
import type { Weather, Suggestion } from '../../types/types';

const weatherKey = '0fea97d4acece8a4418f2876d03b4419';
const suggestionToken = '038cf03c0fcdeaf71d01807fc055484d186fdf0e';

const weatherAPI = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/weather',
});
const suggestionAPI = axios.create({
    baseURL: 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address',
});

const handleAxiosError = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        if (error.response) {
            const status = error.response.status;
            console.error('Ошибка API:', error.response.data.message);

            switch (status) {
                case 400:
                    return `Неверный запрос`;
                case 401:
                    return `Ошибка авторизации`;
                case 404:
                    return `Город не найден`;
                case 429:
                    return `Слишком много запросов`;
                case 500:
                    return `Внутренняя ошибка сервера`;
                default:
                    return `Ошибка ${status}`;
            }
        } else {
            console.error('Ошибка API:', error.message);
            return error.message;
        }
    } else if (error instanceof Error) {
        console.error('Неожиданная ошибка:', error.message);
        return error.message;
    } else {
        console.error('Произошла неизвестная ошибка.');
        return 'Произошла неизвестная ошибка.';
    }
};

/**
 * Получаем данные о погоде по названию города или по координатам
 * @param city — название города (можно на кириллице)
 * @param lat — широта
 * @param lon — долгота
 */
export const getWeather = async (city?: string, lat?: number, lon?: number): Promise<Weather | undefined> => {
    if (!city && (lat === undefined || lon === undefined)) {
        console.error('Входные параметры отсутствуют');
        return;
    }
    try {
        const params: Record<string, string | number> = {
            units: 'metric',
            lang: 'ru',
            appid: weatherKey,
        };
        if (city) {
            params.q = `${city}`;
        } else if (lat !== undefined && lon !== undefined) {
            params.lat = lat;
            params.lon = lon;
        }
        const res = await weatherAPI.get<Weather>('', { params });
        return res.data;
    } catch (error) {
        throw new Error(handleAxiosError(error));
    }
};

/**
 * Получаем список городов (подсказок автокомплита) по передаваемой строке
 * @param query — вводимая строка
 */
export const postSuggestions = async (query: string): Promise<Suggestion[] | undefined> => {
    try {
        const res = await suggestionAPI.post<{ suggestions: Suggestion[] }>(
            '',
            {
                query,
                count: 5,
                from_bound: { value: 'city' },
                to_bound: { value: 'city' },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Token ${suggestionToken}`,
                },
            }
        );
        return res.data.suggestions || [];
    } catch (error) {
        handleAxiosError(error);
        return [];
    }
};
