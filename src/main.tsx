// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './assets/styles/style.css';
import './assets/styles/fonts.css';
import App from './App';

createRoot(document.getElementById('root')!).render(
    // <StrictMode>
    <App />
    // </StrictMode>
);
