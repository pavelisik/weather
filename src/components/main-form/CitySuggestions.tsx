import styles from './CitySuggestions.module.css';
import type { Suggestion } from '@/types/types';

interface CitySuggestionsProps {
    suggestions: Suggestion[];
    onSelect: (city: string) => void;
}

const CitySuggestions = ({ suggestions, onSelect }: CitySuggestionsProps) => (
    <ul className={styles.suggestions} role="listbox">
        {suggestions.map(({ data }, index) => (
            <li key={index} onClick={() => onSelect(data.city)} role="option">
                {data.city}
                <span>{data.region_with_type}</span>
            </li>
        ))}
    </ul>
);

export default CitySuggestions;
