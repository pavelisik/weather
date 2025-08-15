import { useState, useEffect } from 'react';
import clsx from 'clsx';
import useWeather from '@/hooks/useWeather';
import MyCityButtons from '@/components/MyCityButtons';
import MainForm from '@/components/main-form/MainForm';
import FavoritesList from '@/components/favorites/FavoritesList';
import WeatherCard from '@/components/weather-card/WeatherCard';
import WeatherMap from '@/components/weather-card/WeatherMap';
import { translitIfLatin } from '@/utils/utils';
import styles from './Content.module.css';

interface CityInStorage {
    name: string;
    lat: number;
    lon: number;
}

interface Coords {
    lat: number;
    lon: number;
}

const storageKey = 'favoriteCities';
const defaultCity = 'Севастополь';

const Content = () => {
    const [currentCity, setCurrentCity] = useState<string | undefined>(defaultCity);
    const [currentCoords, setCurrentCoords] = useState<Coords | null>(null);
    const [favoriteCities, setFavoriteCities] = useState<CityInStorage[]>([]);
    const { weather, weatherLoading, weatherError } = useWeather(
        currentCoords ? undefined : currentCity,
        currentCoords?.lat,
        currentCoords?.lon
    );

    const isNight = weather ? weather.dt < weather.sys.sunrise || weather.dt > weather.sys.sunset : false;

    // загружаем избранное из localStorage при монтировании
    useEffect(() => {
        const storedCities: CityInStorage[] = JSON.parse(localStorage.getItem(storageKey) || '[]');
        setFavoriteCities(storedCities);
    }, []);

    return (
        <div className={styles.content}>
            <div className={styles.leftColumn}>
                <div className={styles.block}>
                    <MainForm onCitySelect={setCurrentCity} onCoordsSelect={setCurrentCoords} />
                    <MyCityButtons onCitySelect={setCurrentCity} onCoordsSelect={setCurrentCoords} />
                </div>
                <div className={styles.block}>
                    <FavoritesList
                        favoriteCities={favoriteCities}
                        setFavoriteCities={setFavoriteCities}
                        onCitySelect={setCurrentCity}
                        onCoordsSelect={setCurrentCoords}
                    />
                </div>
            </div>
            <div className={styles.rightColumn}>
                {weather && <h1>Погода в городе {translitIfLatin(weather.name)} сейчас</h1>}
                <div className={clsx(styles.block, styles.fixed, isNight && 'night')}>
                    <WeatherCard
                        weather={weather}
                        loading={weatherLoading}
                        error={weatherError}
                        favoriteCities={favoriteCities}
                        setFavoriteCities={setFavoriteCities}
                    />
                    {weather && <WeatherMap lat={weather.coord.lat} lon={weather.coord.lon} />}
                </div>
            </div>
        </div>
    );
};

export default Content;
