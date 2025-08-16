import { useState } from 'react';
import { YMaps, Map } from '@iminside/react-yandex-maps';
import styles from './WeatherMap.module.css';

interface WeatherMapProps {
    lat: number;
    lon: number;
}

const WeatherMap = ({ lat, lon }: WeatherMapProps) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <>
            {!isLoaded && <span className={styles.mapSkeleton}>Загрузка карты...</span>}
            <div className={styles.mapWrapper}>
                <YMaps>
                    <Map
                        defaultState={{ center: [lat, lon], zoom: 10 }}
                        options={{
                            suppressMapOpenBlock: true,
                        }}
                        className={styles.weatherMap}
                        onLoad={() => setIsLoaded(true)}
                    />
                </YMaps>
            </div>
        </>
    );
};

export default WeatherMap;
