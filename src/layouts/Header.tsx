import styles from './Header.module.css';

const Header = () => {
    return (
        <header className={styles.header}>
            <a href="/">
                <h1>WEATHER REPORT</h1>
            </a>
            <p>прогноз погоды в выбранном городе</p>
        </header>
    );
};

export default Header;
