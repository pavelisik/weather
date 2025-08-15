import { weatherIconMap } from '@/utils/weatherIconMap';
import styles from './WeatherIcon.module.css';

interface WeatherIconProps {
    id: number;
    icon: string;
    alt: string;
}

export function getWeatherIcon(id: number, iconCode: string) {
    const isNight = iconCode.includes('n');
    const entry = weatherIconMap[id];
    if (!entry) return 'not-available.svg';
    return isNight ? entry.night : entry.day;
}

const WeatherIcon = ({ id, icon, alt }: WeatherIconProps) => {
    const iconFile = getWeatherIcon(id, icon);
    const iconSrc = `/icons/${iconFile}`;

    return (
        <div className={styles.iconWrapper}>
            <img src={iconSrc} alt={alt} loading="lazy" />
        </div>
    );
};

export default WeatherIcon;
