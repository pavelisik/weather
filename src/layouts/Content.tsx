import { useState } from 'react';
import useWeather from '../hooks/useWeather';
import MainForm from '../components/MainForm';
import WeatherInfoBlock from '../components/WeatherInfoBlock';
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
                <div className={styles.block}>
                    <WeatherInfoBlock weather={weather} loading={weatherLoading} error={weatherError} />
                </div>
            </div>
        </div>
    );
};

export default Content;
