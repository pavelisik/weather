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
    // показ прогноза погоды при нажатии на город
    const handleClick = (name: string) => {
        onCoordsSelect(null);
        onCitySelect(name);
    };

    // удаление из избранного одного города
    const removeFavorite = (name: string) => {
        const updatedFavoriteCities = favoriteCities.filter((city) => city.name !== name);
        localStorage.setItem(storageKey, JSON.stringify(updatedFavoriteCities));
        setFavoriteCities(updatedFavoriteCities);
    };

    // полная очистка избранного
    const clearFavorites = () => {
        localStorage.removeItem(storageKey);
        setFavoriteCities([]);
    };

    // if (favoriteCities.length === 0) return <p>Нет избранных городов</p>;

    return (
        <>
            <h2>Избранные города</h2>
            {favoriteCities && favoriteCities.length > 0 ? (
                <>
                    <ul className={styles.favoritesList}>
                        {favoriteCities.map(({ name, lat, lon }) => (
                            <li key={`${name}`} onClick={() => handleClick(name)}>
                                {name}{' '}
                                <button
                                    className={styles.closeButton}
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
                    <button className="button" onClick={clearFavorites}>
                        Очистить избранное
                    </button>
                </>
            ) : (
                <p>Нет избранных городов</p>
            )}
        </>
    );
};

export default FavoritesList;
