import axios from 'axios';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
import { attachAuthErrorInterceptor } from '~/shared/utilities/auth-session';
export const authBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authAxios = axios.create({
    baseURL: authBaseUrl,
    timeout: 30000,
});

authAxios.interceptors.request.use(
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

attachAuthErrorInterceptor(authAxios);
