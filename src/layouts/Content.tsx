import { useState } from 'react';
import useWeather from '../hooks/useWeather';
import MainForm from '../components/MainForm';
import styles from './Content.module.css';

const Content = () => {
    const [currentCity, setCurrentCity] = useState<string | undefined>(undefined);
    const { weather, weatherLoading, weatherError } = useWeather(currentCity);

    return (
        <div className={styles.content}>
            <div className={styles.leftColumn}>
                <div className={styles.block}>
                    <MainForm onCitySelect={setCurrentCity} />
                </div>
            </div>
            <div className={styles.rightColumn}>
                {weatherLoading && <p>Загрузка...</p>}
                {weatherError && <p className={styles.error}>{weatherError}</p>}
                {weather && (
                    <div className={styles.weatherInfo}>
                        <h3>{weather.name}</h3>
                        <p>{weather.main.temp} °C</p>
                        <p>{weather.weather[0].description}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Content;
