import styles from './FavoritesList.module.css';

interface CityInStorage {
    name: string;
    lat: number;
    lon: number;
}

interface Coords {
    lat: number;
    lon: number;
}

interface FavoritesListProps {
    favoriteCities: CityInStorage[];
    setFavoriteCities: (cities: CityInStorage[]) => void;
    onCitySelect: (city: string) => void;
    onCoordsSelect: (coords: Coords | null) => void;
}

const storageKey = 'favoriteCities';

const FavoritesList = ({ favoriteCities, setFavoriteCities, onCitySelect, onCoordsSelect }: FavoritesListProps) => {
    const removeFavorite = (name: string) => {
        const updated = favoriteCities.filter((city) => city.name !== name);
        localStorage.setItem(storageKey, JSON.stringify(updated));
        setFavoriteCities(updated);
    };

    const handleClick = (name: string) => {
        onCoordsSelect(null);
        onCitySelect(name);
    };

    if (favoriteCities.length === 0) return <p>Нет избранных городов</p>;

    return (
        <>
            <h2>Избранные города</h2>
            <ul className={styles.favoritesList}>
                {favoriteCities.map(({ name, lat, lon }) => (
                    <li key={`${name}`} onClick={() => handleClick(name)}>
                        {name}{' '}
                        <button
                            className={styles.close}
                            onClick={(e) => {
                                e.stopPropagation();
                                removeFavorite(name);
                            }}
                        >
                            ✕
                        </button>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default FavoritesList;
