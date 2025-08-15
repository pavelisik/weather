import { format } from 'date-fns';
import { addSeconds } from 'date-fns';
import { ru } from 'date-fns/locale';
import FavoritesButton from '@/components/favorites/FavoritesButton';
import WeatherMap from './WeatherMap';
import WeatherIcon from './WeatherIcon';
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

const WeatherCard = ({ weather, loading, error, favoriteCities, setFavoriteCities }: WeatherInfoBlockProps) => {
    return (
        <>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {weather && (
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
                    <div className={styles.time}>{getCityTime(weather.timezone)}</div>
                    <div className={styles.temp}>{numberPlus(Math.round(weather.main.temp))}°</div>
                    <div className={styles.tempFeels}>
                        По ощущению: {numberPlus(Math.round(weather.main.feels_like))}°
                    </div>

                    {/* <p>{weather.weather[0].description}</p> */}

                    {/* <p>Ветер: {Math.round(weather.wind.speed * 10) / 10} м/с</p>
                    <p>Давление: {hPaConvert(weather.main.pressure)} мм рт. ст.</p>
                    <p>Влажность: {weather.main.humidity} %</p> */}

                    {/* {weather.rain && <p>Осадки: {weather.rain['1h']} мм/ч</p>}
                    {weather.snow && <p>Снег: {weather.snow['1h']} мм/ч</p>} */}

                    {weather && <WeatherMap className={styles.map} lat={weather.coord.lat} lon={weather.coord.lon} />}

                    {/* <p>Идентификатор погодных условий: {weather.weather['0'].id}</p>
                    <p>Группа погодных параметров (Дождь, Снег, Облачность и т. д.): {weather.weather['0'].main}</p>
                    <p>Описание погодных условий: {weather.weather['0'].description}</p>
                    <p>id иконки погодных условий: {weather.weather['0'].icon}</p>
                    <br />
                    <p>Температура: {weather.main.temp}</p>
                    <p>Температура по ощущению: {weather.main.feels_like}</p>
                    <p>Минимальная температура: {weather.main.temp_min}</p>
                    <p>Максимальная температура: {weather.main.temp_max}</p>
                    <p>Атмосферное давление на уровне моря, гПа: {weather.main.pressure}</p>
                    <p>Влажность, %: {weather.main.humidity}</p>
                    <p>Атмосферное давление на уровне моря, гПа: {weather.main.sea_level}</p>
                    <p>Атмосферное давление на уровне земли, гПа: {weather.main.grnd_level}</p>
                    <br />
                    <p>Видимость, метр. Максимальное значение видимости — 10 км.: {weather.visibility}</p>
                    <br />
                    <p>Скорость ветра, м/сек: {weather.wind.speed}</p>
                    <p>Направление ветра, градусы (метеорологические): {weather.wind.deg}</p>
                    <p>Порывы ветра. м/сек: {weather.wind.gust}</p>
                    <br />
                    <p>Облачность %: {weather.clouds.all}</p>
                    <br />
                    <p>Время расчета данных, unix, UTC: {weather.dt}</p>
                    <br />
                    <p>Код страны (GB, JP и т. д.): {weather.sys.country}</p>
                    <p>Время восхода солнца, Unix, UTC: {weather.sys.sunrise}</p>
                    <p>Время заката, Unix, UTC: {weather.sys.sunset}</p>
                    <br />
                    <p>Сдвиг в секундах от UTC: {weather.timezone}</p>
                    <p>Идентификатор города: {weather.id}</p>
                    <p>Название города: {weather.name}</p>
                    <p>Код статуса запроса: {weather.cod}</p>
                    <br /> */}
                </div>
            )}
        </>
    );
};

export default WeatherCard;
