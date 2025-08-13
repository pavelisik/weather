import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import styles from './MainForm.module.css';
import type { Suggestion } from '../types/types';

interface CityForm {
    city: string;
}

// данные для API автокомплита
const suggestionUrl = 'https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
const suggestionToken = '038cf03c0fcdeaf71d01807fc055484d186fdf0e';

// данные для API openweather
const openweatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const openweatherKey = '0fea97d4acece8a4418f2876d03b4419';

// минимальное число вводимых символов для срабатывания автокомплита
const minInputSymbols = 2;

const MainForm = () => {
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        formState: { errors },
    } = useForm<CityForm>({
        defaultValues: {
            city: '',
        },
    });

    const [weather, setWeather] = useState<{ temp: number; description: string } | null>(null);
    const [error, setError] = useState('');

    const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);

    // запрос на поиск подсказок для автокомплита
    const fetchSuggestions = async (query: string) => {
        const trimmedQuery = query.trim();
        if (trimmedQuery.length < minInputSymbols) {
            setSuggestions([]);
            return;
        }
        try {
            const { data } = await axios.post(
                suggestionUrl,
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
            setSuggestions(data.suggestions || []);
        } catch (error) {
            console.error('Ошибка получения подсказок:', error);
        }
    };

    const fetchWeather = async (city: string) => {
        try {
            setError('');
            setWeather(null);

            const res = await axios.get(openweatherUrl, {
                params: {
                    q: `${city},RU`, // название города на кириллице + код страны
                    units: 'metric',
                    lang: 'ru',
                    appid: openweatherKey,
                },
            });

            setWeather({
                temp: res.data.main.temp,
                description: res.data.weather[0].description,
            });
        } catch (err) {
            setError('Город не найден или ошибка запроса');
        }
    };

    // изменение текста в input
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setValue('city', val);
        fetchSuggestions(val);
    };

    // выбор подсказки из автокомплита
    const handleSelect = (city: string) => {
        setValue('city', city);
        setSuggestions([]);
    };

    // фокус на input
    const handleFocus = () => {
        const currentVal = getValues('city');
        if (currentVal.trim().length >= minInputSymbols) {
            fetchSuggestions(currentVal);
        }
    };

    // закрытие автокомплита по клику вне области
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
                setSuggestions([]);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // отправка значения при нажатии на кнопку
    const onSubmit: SubmitHandler<CityForm> = async (data) => {
        console.log(`Погода для города ${data.city}`);
        fetchWeather(data.city);
        console.log(weather);
    };

    return (
        <div className={styles.mainForm}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                {/* <h2>Введите название города</h2> */}
                <div className={styles.inputWrapper} ref={wrapperRef}>
                    {/* форма для ввода города */}
                    <input
                        type="text"
                        className={styles.city}
                        {...register('city', { required: 'Введите название города' })}
                        placeholder="Введите название города"
                        onChange={handleInputChange}
                        onFocus={handleFocus}
                        aria-required="true"
                        aria-invalid={!!errors.city}
                    />
                    {/* вывод автокомплита для города */}
                    {suggestions.length > 0 && (
                        <ul className={styles.suggestions} role="listbox">
                            {suggestions.map(({ data }, index) => (
                                <li key={index} onClick={() => handleSelect(data.city)} role="option">
                                    {data.city}
                                    <span>{data.region_with_type}</span>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button type="submit">Показать погоду</button>
                {/* вывод ошибок формы */}
                {errors.city && <p className={styles.error}>{errors.city.message}</p>}
            </form>
        </div>
    );
};

export default MainForm;
