import clsx from 'clsx';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState, useRef } from 'react';
import useSuggestions from '@/hooks/useSuggestions';
import useClickOutside from '@/hooks/useClickOutside';
import CitySuggestions from './CitySuggestions';
import { showWarning } from '@/utils/toast';
import styles from './MainForm.module.css';

interface CityForm {
    city: string;
}

interface Coords {
    lat: number;
    lon: number;
}

interface MainFormProps {
    onCitySelect: (city: string) => void;
    onCoordsSelect: (coords: Coords | null) => void;
}

const MainForm = ({ onCitySelect, onCoordsSelect }: MainFormProps) => {
    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        clearErrors,
        formState: { errors },
    } = useForm<CityForm>({
        defaultValues: { city: '' },
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
        onCoordsSelect(null);
        onCitySelect(data.city);
        reset();
        setIsOpen(false);
    };

    // вывод ошибок обработки формы
    const onError = (formErrors: typeof errors) => {
        if (formErrors.city) {
            showWarning(formErrors.city.message || 'Ошибка');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit, onError)} noValidate autoComplete="off">
                <div className={styles.inputWrapper} ref={wrapperRef}>
                    <input
                        type="text"
                        className={clsx(styles.city, isOpen && suggestions.length > 0 && styles.withSuggestions)}
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
                {isOpen && <div className={styles.searchOverlay}></div>}
                <button type="submit" className={clsx('button', styles.mainButton)}>
                    Показать погоду
                </button>
            </form>
        </div>
    );
};

export default MainForm;
