import { useState, useEffect } from 'react';
import clsx from 'clsx';
import { GoStarFill } from 'react-icons/go';
import { IoHeartOutline } from 'react-icons/io5';

import styles from './FavoritesButton.module.css';

interface CityInStorage {
    name: string;
    lat: number;
    lon: number;
}

interface FavoritesButtonProps {
    city: string;
    latC: number;
    lonC: number;
    favoriteCities: CityInStorage[];
    setFavoriteCities: (cities: CityInStorage[]) => void;
}

const storageKey = 'favoriteCities';

const FavoritesButton = ({ city, latC, lonC, favoriteCities, setFavoriteCities }: FavoritesButtonProps) => {
    const [isFavorite, setIsFavorite] = useState(false);

    // проверяем, есть ли город в избранном при загрузке данных
    useEffect(() => {
        const exists = favoriteCities.some(({ name, lat, lon }) => name === city && lat === latC && lon === lonC);
        setIsFavorite(exists);
    }, [favoriteCities]);

    // добавление или удаление города из избранного
    const toggleFavorite = () => {
        let updated: CityInStorage[];
        if (isFavorite) {
            updated = favoriteCities.filter(({ name, lat, lon }) => name !== city || lat !== latC || lon !== lonC);
        } else {
            updated = [...favoriteCities, { name: city, lat: latC, lon: lonC }];
        }
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setFavoriteCities(updated);
        setIsFavorite(!isFavorite);
    };

    return (
        <button
            type="button"
            onClick={toggleFavorite}
            className={clsx(styles.favoriteIcon, isFavorite && styles.isFavorite)}
            title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'}
        >
            {/* <GoStarFill /> */}
            <IoHeartOutline />
        </button>
    );
};

export default FavoritesButton;
