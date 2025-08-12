import MainForm from '../components/MainForm';
import styles from './Content.module.css';

const Content = () => {
    return (
        <div className={styles.content}>
            <div className={styles.leftColumn}>
                <div className={styles.block}>
                    <MainForm />
                </div>
            </div>
            <div className={styles.rightColumn}></div>
        </div>
    );
};

export default Content;
