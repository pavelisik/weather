import { YMaps, Map } from '@iminside/react-yandex-maps';
import styles from './WeatherMap.module.css';

interface WeatherMapProps {
    lat: number;
    lon: number;
}

const WeatherMap = ({ lat, lon }: WeatherMapProps) => {
    return (
        <div className={styles.mapWrapper}>
            <YMaps>
                <Map
                    defaultState={{ center: [lat, lon], zoom: 10 }}
                    options={{
                        suppressMapOpenBlock: true,
                    }}
                    className={styles.weatherMap}
                />
            </YMaps>
        </div>
    );
};

export default WeatherMap;
