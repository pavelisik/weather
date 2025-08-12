declare module '*.svg' {
    const content: string;
    export default content;
}

declare module '*.jpeg' {
    const content: string;
    export default content;
}
declare module '*.jpg' {
    const content: string;
    export default content;
}
declare module '*.png' {
    const content: string;
    export default content;
}

declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}
declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

/* Глобальные CSS и SCSS (не как модули) */
declare module '*.css';
declare module '*.scss';
