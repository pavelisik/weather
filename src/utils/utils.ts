import translitRusEng from 'translit-rus-eng';

export function translitIfLatin(word: string) {
    const isLatin = /^[A-Za-z\s-]+$/.test(word);
    return isLatin ? translitRusEng(word, true) : word;
}

export function numberPlus(num: number) {
    return num >= 0 ? `+${num}` : `${num}`;
}

export function hPaConvert(hPa: number) {
    return Math.round(hPa * 0.750062);
}
