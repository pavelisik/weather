import useGeoLocation from '@/hooks/useGeoLocation';
import useIPLocation from '@/hooks/useIPLocation';
import styles from './MyCityButtons.module.css';

interface Coords {
    lat: number;
    lon: number;
}

interface MyCityButtonsProps {
    onCitySelect: (city: string | undefined) => void;
    onCoordsSelect: (coords: Coords | null) => void;
}

const MyCityButtons = ({ onCitySelect, onCoordsSelect }: MyCityButtonsProps) => {
    const { lat, lon } = useGeoLocation();
    const { city } = useIPLocation();

    const handleGeoClick = () => {
        if (lat && lon) {
            onCitySelect(undefined);
            onCoordsSelect({ lat, lon });
        }
    };

    const handleIPClick = () => {
        if (location) {
            onCoordsSelect(null);
            onCitySelect(city);
        }
    };

    return (
        <>
            <h2>Погода в моем городе</h2>
            <div className={styles.buttons}>
                <button className="button" onClick={handleGeoClick}>
                    Определить по геолокации
                </button>
                <button className="button" onClick={handleIPClick}>
                    Определить по IP
                </button>
            </div>
        </>
    );
};

export default MyCityButtons;
