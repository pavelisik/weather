import { useState, useEffect } from 'react';
import useWeather from '../hooks/useWeather';
import MyCityButtons from '../components/MyCityButtons';
import MainForm from '../components/MainForm';
import FavoritesList from '../components/FavoritesList';
import WeatherInfoBlock from '../components/WeatherInfoBlock';
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
    const { weather, weatherLoading, weatherError } = useWeather(currentCoords ? undefined : currentCity, currentCoords?.lat, currentCoords?.lon);

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
                </div>
                <div className={styles.block}>
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
                <div className={styles.block}>
                    <WeatherInfoBlock
                        weather={weather}
                        loading={weatherLoading}
                        error={weatherError}
                        favoriteCities={favoriteCities}
                        setFavoriteCities={setFavoriteCities}
                    />
                </div>
            </div>
        </div>
    );
};

export default Content;
