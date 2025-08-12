import { useForm, type SubmitHandler } from 'react-hook-form';
import styles from './MainForm.module.css';

interface CityForm {
    city: string;
}

const MainForm = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CityForm>({
        defaultValues: {
            city: '',
        },
    });

    const onSubmit: SubmitHandler<CityForm> = async (data) => {
        console.log(`Погода для города ${data.city}`);
    };

    return (
        <div className={styles.mainForm}>
            <form onSubmit={handleSubmit(onSubmit, () => {})} noValidate>
                <h2>Введите название города</h2>
                <input
                    type="text"
                    className={styles.city}
                    {...register('city', {
                        required: 'Введите название города',
                        maxLength: {
                            value: 40,
                            message: 'Имя не должно превышать 40 символов',
                        },
                    })}
                    placeholder="Город"
                    aria-required="true"
                    aria-invalid={!!errors.city}
                />

                <button type="submit">Показать погоду</button>
            </form>
        </div>
    );
};

export default MainForm;
