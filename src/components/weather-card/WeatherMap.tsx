import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';

interface WeatherMapProps {
    lat: number;
    lon: number;
    className?: string;
}

const WeatherMap = ({ lat, lon, className }: WeatherMapProps) => (
    <div className={className}>
        <YMaps>
            <Map defaultState={{ center: [lat, lon], zoom: 10 }} width="100%" height="300px">
                <Placemark geometry={[lat, lon]} />
            </Map>
        </YMaps>
    </div>
);

export default WeatherMap;
