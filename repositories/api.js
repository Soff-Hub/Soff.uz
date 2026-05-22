import axios from 'axios';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import { attachAuthErrorInterceptor } from '~/shared/utilities/auth-session';
export const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`;
export const baseURLFreelance = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/`;

export const api = axios.create({
    baseURL: baseURL,
    timeout: 30000,
});

export const apiForFreelance = axios.create({
    baseURL: baseURLFreelance,
    timeout: 30000,
});

api.interceptors.request.use(
    (config) => {
        const storedToken = safeLocalStorage.getItem('user');
        if (storedToken && JSON.parse(storedToken).access) {
            const token = JSON.parse(storedToken).access;
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

attachAuthErrorInterceptor(api);
attachAuthErrorInterceptor(apiForFreelance);
