import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { addSeconds } from 'date-fns';
import { ru } from 'date-fns/locale';
import FavoritesButton from '@/components/favorites/FavoritesButton';
import WeatherIcon from './WeatherIcon';
import { showWarning } from '@/utils/toast';
import { translitIfLatin, numberPlus, hPaConvert } from '@/utils/utils';
import styles from './WeatherCard.module.css';
import type { Weather } from '@/types/types';

interface CityInStorage {
    name: string;
    lat: number;
    lon: number;
}

interface WeatherInfoBlockProps {
    weather: Weather | null;
    loading: boolean;
    error: string | null;
    favoriteCities: CityInStorage[];
    setFavoriteCities: (cities: CityInStorage[]) => void;
}

// определяем текущее время в городе
function getCityTime(timezone: number): string {
    const nowUTC = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60000);
    const cityTime = addSeconds(nowUTC, timezone);
    return format(cityTime, 'EEEE, d MMMM, HH:mm', { locale: ru });
}

// меняем первую букву на заглавную
function capFirstLetter(str: string) {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const WeatherCard = ({ weather, loading, error, favoriteCities, setFavoriteCities }: WeatherInfoBlockProps) => {
    const [showSkeleton, setShowSkeleton] = useState(false);

    // задержка для скелетона
    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (loading) {
            timeout = setTimeout(() => setShowSkeleton(true), 300);
        } else {
            setShowSkeleton(false);
        }
        return () => clearTimeout(timeout);
    }, [loading]);

    // показ уведомления об ошибке
    useEffect(() => {
        if (error) {
            showWarning(error);
        }
    }, [error]);

    return (
        <>
            {loading && showSkeleton ? (
                <div className={styles.weatherInfoSkeleton}>Загрузка данных...</div>
            ) : error ? (
                <p>{error}</p>
            ) : (
                weather && (
                    <div className={styles.weatherInfo}>
                        <WeatherIcon
                            id={weather.weather['0'].id}
                            icon={weather.weather['0'].icon}
                            alt={weather.weather[0].description}
                        />
                        <FavoritesButton
                            city={translitIfLatin(weather.name)}
                            latC={weather.coord.lat}
                            lonC={weather.coord.lon}
                            favoriteCities={favoriteCities}
                            setFavoriteCities={setFavoriteCities}
                        />
                        <div className={styles.time}>{capFirstLetter(getCityTime(weather.timezone))}</div>
                        <div className={styles.temp}>{numberPlus(Math.round(weather.main.temp))}°</div>
                        <div className={styles.tempFeels}>
                            Ощущается как {numberPlus(Math.round(weather.main.feels_like))}°
                        </div>
                        <div className={styles.desc}>{capFirstLetter(weather.weather[0].description)}</div>
                        <div className={styles.bottomParams}>
                            <div className={styles.wind}>
                                <div className={styles.text}>Ветер</div>
                                <div className={styles.group}>
                                    <div className={styles.value}>{Math.round(weather.wind.speed * 10) / 10}</div>
                                    <div className={styles.units}>м/с</div>
                                </div>
                            </div>
                            <div className={styles.humidity}>
                                <div className={styles.text}>Влажность</div>
                                <div className={styles.group}>
                                    <div className={styles.value}>{weather.main.humidity}</div>
                                    <div className={styles.units}>%</div>
                                </div>
                            </div>
                            <div className={styles.pressure}>
                                <div className={styles.text}>Давление</div>
                                <div className={styles.group}>
                                    <div className={styles.value}>{hPaConvert(weather.main.pressure)}</div>
                                    <div className={styles.units}>мм рт. ст.</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            )}
        </>
    );
};

export default WeatherCard;
