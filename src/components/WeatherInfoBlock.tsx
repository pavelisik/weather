import translitRusEng from 'translit-rus-eng';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import style from './WeatherInfoBlock.module.css';
import type { Weather } from '../types/types';

interface WeatherInfoBlockProps {
    weather: Weather | null;
    loading: boolean;
    error: string | null;
}

function translitIfLatin(word: string) {
    const isLatin = /^[A-Za-z\s-]+$/.test(word);
    return isLatin ? translitRusEng(word, true) : word;
}

function formatNumberWithSign(num: number) {
    return num >= 0 ? `+${num}` : `${num}`;
}

function hPaToMmHg(hPa: number) {
    return Math.round(hPa * 0.750062);
}

const WeatherInfoBlock = ({ weather, loading, error }: WeatherInfoBlockProps) => {
    const iconUrl = 'https://openweathermap.org/img/wn/';

    // дата и время на момент получения данных
    const formattedDateTime = weather ? format(new Date(weather.dt * 1000), 'd MMMM, HH:mm', { locale: ru }) : null;

    return (
        <>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {weather && (
                <div className={style.weatherInfo}>
                    <h3>Погода в городе {translitIfLatin(weather.name)} сейчас</h3>
                    <p>Дата и время расчета данных: {formattedDateTime}</p>
                    <p>Температура: {formatNumberWithSign(Math.round(weather.main.temp))} °C</p>
                    <p>Температура по ощущению: {formatNumberWithSign(Math.round(weather.main.feels_like))} °C</p>
                    <p>Ветер: {Math.round(weather.wind.speed * 10) / 10} м/с</p>
                    <p>Давление: {hPaToMmHg(weather.main.pressure)} мм рт. ст.</p>
                    <p>Влажность: {weather.main.humidity} %</p>
                    <p>Описание: {weather.weather[0].description}</p>
                    <div className={style.iconWrapper}>
                        <img src={`${iconUrl}${weather.weather['0'].icon}@2x.png`} />
                    </div>
                    {weather.rain && <p>Осадки: {weather.rain['1h']} мм/ч</p>}
                    {weather.snow && <p>Снег: {weather.snow['1h']} мм/ч</p>}

                    <div style={{ width: '100%', height: '300px' }}>
                        <iframe
                            title="Яндекс.Карта"
                            src={`https://yandex.ru/map-widget/v1/?ll=${weather.coord.lon},${weather.coord.lat}&z=10&source=constructor`}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                        ></iframe>
                    </div>

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

export default WeatherInfoBlock;
