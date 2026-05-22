import Cookies from 'js-cookie';
import axios from 'axios';
import { safeLocalStorage } from './safe-local-storage';

const AUTH_ERROR_STATUSES = new Set([401, 403]);
const AUTH_STORAGE_KEYS = ['user', 'data', 'token', 'qayta_token', 'auth-storage'];

let authExpireHandled = false;
let defaultAxiosInterceptorId = null;

export const isAuthErrorStatus = (status) => AUTH_ERROR_STATUSES.has(Number(status));

export const getJwtCookieExpires = (token) => {
    if (!token) return 8;

    try {
        const base64 = token
            .split('.')[1]
            .replace(/-/g, '+')
            .replace(/_/g, '/');
        const decoded =
            typeof atob === 'function'
                ? atob(base64)
                : Buffer.from(base64, 'base64').toString('binary');
        const payload = JSON.parse(decoded);
        return payload?.exp ? new Date(payload.exp * 1000) : 8;
    } catch {
        return 8;
    }
};

export const clearAuthStorage = () => {
    AUTH_STORAGE_KEYS.forEach((key) => safeLocalStorage.removeItem(key));
    Cookies.remove('token', { path: '/' });
    Cookies.remove('token');
};

export const handleExpiredAuthSession = ({
    redirect = true,
    redirectTo = '/auth/login',
} = {}) => {
    if (typeof window === 'undefined') return;

    clearAuthStorage();

    if (authExpireHandled || !redirect) return;
    authExpireHandled = true;

    const currentPath = window.location.pathname;
    const authRoutePrefixes = ['/auth/login', '/auth/register', '/auth/reset-password', '/oauth'];
    const isAuthRoute = authRoutePrefixes.some((path) =>
        currentPath.startsWith(path)
    );

    if (!isAuthRoute) {
        window.location.href = redirectTo;
    }
};

export const attachAuthErrorInterceptor = (axiosInstance) => {
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isAuthErrorStatus(error?.response?.status)) {
                handleExpiredAuthSession();
            }

            return Promise.reject(error);
        }
    );
};

export const configureDefaultAxiosAuthHandling = () => {
    if (defaultAxiosInterceptorId !== null) return;

    defaultAxiosInterceptorId = axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (isAuthErrorStatus(error?.response?.status)) {
                handleExpiredAuthSession();
            }

            return Promise.reject(error);
        }
    );
};
