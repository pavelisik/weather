import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';

interface WeatherMapProps {
    lat: number;
    lon: number;
}

const WeatherMap = ({ lat, lon }: WeatherMapProps) => (
    <YMaps>
        <Map defaultState={{ center: [lat, lon], zoom: 10 }} width="100%" height="300px">
            <Placemark geometry={[lat, lon]} />
        </Map>
    </YMaps>
);

export default WeatherMap;
