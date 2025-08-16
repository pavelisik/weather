import { useEffect, useState } from 'react';
import clsx from 'clsx';
import { RiComputerLine } from 'react-icons/ri';
import { PiGpsFix } from 'react-icons/pi';
import { useGeoLocation } from '@/hooks/useGeoLocation';
import { useIPLocation } from '@/hooks/useIPLocation';
import { showWarning } from '@/utils/toast';
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
    const { lat, lon, loading: geoLoading, error: geoError, getGeoLocation } = useGeoLocation();
    const { city, loading: ipLoading, error: ipError, getIPLocation } = useIPLocation();

    // локальные состояния загрузки данных по геолокации и по IP
    const [localGeoLoading, setLocalGeoLoading] = useState(false);
    const [localIPLoading, setLocalIPLoading] = useState(false);

    // при определении данных меняем их в родителе для нового запроса
    useEffect(() => {
        if (lat && lon) {
            onCoordsSelect({ lat, lon });
            onCitySelect(undefined);
        }
    }, [lat, lon]);
    useEffect(() => {
        if (city) {
            onCoordsSelect(null);
            onCitySelect(city);
        }
    }, [city]);

    // показ ошибок
    useEffect(() => {
        if (geoError) {
            showWarning('Ошибка определения геолокации');
        }
    }, [geoError]);
    useEffect(() => {
        if (ipError) {
            showWarning('Ошибка определения локации по IP');
        }
    }, [ipError]);

    // определение геолокации и локации по IP с небольшой задержкой
    const handleGeoClick = () => {
        setLocalGeoLoading(true);
        setTimeout(() => {
            getGeoLocation();
        }, 600);
    };
    const handleIPClick = () => {
        setLocalIPLoading(true);
        setTimeout(() => {
            getIPLocation();
        }, 600);
    };

    // синхронизация состояния загрузки данных
    useEffect(() => {
        if (!geoLoading) {
            setLocalGeoLoading(false);
        }
    }, [geoLoading]);
    useEffect(() => {
        if (!ipLoading) {
            setLocalIPLoading(false);
        }
    }, [ipLoading]);

    return (
        <div className={styles.buttons}>
            <button
                className={clsx('button', styles.geoButton)}
                onClick={handleGeoClick}
                disabled={geoLoading || localGeoLoading}
            >
                <PiGpsFix />
                {geoLoading || localGeoLoading ? 'Определяется...' : 'Определить по геолокации'}
            </button>
            <button
                className={clsx('button', styles.ipButton)}
                onClick={handleIPClick}
                disabled={ipLoading || localIPLoading}
            >
                <RiComputerLine />
                {ipLoading || localIPLoading ? 'Определяется...' : 'Определить по IP'}
            </button>
        </div>
    );
};

export default MyCityButtons;
