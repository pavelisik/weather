import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <h1>WEATHER</h1>
            <p>прогноз погоды в выбранном городе</p>
        </header>
    );
};

export default Header;
