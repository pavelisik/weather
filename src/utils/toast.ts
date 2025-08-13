import { toast, type ToastOptions } from 'react-toastify';
import './toast.module.css';

const commonOptions: ToastOptions = {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: 'light',
};

export const showSuccess = (message: string) => {
    toast.success(message, commonOptions);
};

export const showWarning = (message: string) => {
    toast.warn(message, commonOptions);
};
