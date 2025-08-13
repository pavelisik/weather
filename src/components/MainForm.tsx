import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState, useRef } from 'react';
import useSuggestions from '../hooks/useSuggestions';
import useClickOutside from '../hooks/useClickOutside';
import CitySuggestions from './CitySuggestions';
import styles from './MainForm.module.css';

interface CityForm {
    city: string;
}

interface MainFormProps {
    onCitySelect: (city: string) => void;
}

const MainForm = ({ onCitySelect }: MainFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<CityForm>({
        defaultValues: {
            city: '',
        },
        mode: 'onSubmit',
    });

    // следим за вводом названия города
    const cityQuery = watch('city');
    // и формируем автокомплит
    const { suggestions } = useSuggestions(cityQuery);

    // управление видимостью автокомплита
    const [isOpen, setIsOpen] = useState(false);

    // закрытие автокомплита по клику вне области блока
    const wrapperRef = useRef<HTMLDivElement>(null);
    useClickOutside(wrapperRef, () => {
        setIsOpen(false);
    });

    // при повторном фокусе на input снова отображаем автокомплит
    const handleFocus = () => {
        setIsOpen(true);
    };

    // выбор подсказки из автокомплита
    const handleSelect = (city: string) => {
        setValue('city', city);
        setIsOpen(false);
    };

    // отправка значения при нажатии на кнопку и сброс формы
    const onSubmit: SubmitHandler<CityForm> = (data) => {
        onCitySelect(data.city);
        reset();
    };

    return (
        <div className={styles.mainForm}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                {/* <h2>Введите название города</h2> */}
                <div className={styles.inputWrapper} ref={wrapperRef}>
                    <input
                        type="text"
                        className={styles.city}
                        {...register('city', { required: 'Введите название города' })}
                        placeholder="Введите название города"
                        onFocus={handleFocus}
                        onChange={(e) => {
                            setValue('city', e.target.value, { shouldValidate: false });
                            clearErrors('city');
                        }}
                        aria-required="true"
                        aria-invalid={!!errors.city}
                    />
                    {/* вывод автокомплита */}
                    {isOpen && suggestions.length > 0 && (
                        <CitySuggestions suggestions={suggestions} onSelect={handleSelect} />
                    )}
                </div>
                <button type="submit">Показать погоду</button>
                {/* вывод ошибок формы (потом переделаю на всплывающие окошки) */}
                {errors.city && <p className={styles.error}>{errors.city.message}</p>}
            </form>
        </div>
    );
};

export default MainForm;
