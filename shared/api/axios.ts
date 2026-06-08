import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { safeLocalStorage } from '../utilities/safe-local-storage';
import { handleExpiredAuthSession, isAuthErrorStatus, isRateLimitStatus } from '../utilities/auth-session';
import { API_BASE_URL } from './config';

/**
 * Interface for the stored user object in localStorage.
 * Adjust this based on your actual user object structure.
 */
interface StoredUser {
    access?: string;
    refresh?: string;
    // Add other user fields as needed
}

/**
 * Standard API error response structure.
 */
export interface ApiErrorResponse {
    message?: string;
    errors?: Record<string, string[]>;
    status?: number;
}

/**
 * Creates and configures a base Axios instance.
 */
const createApiInstance = (): AxiosInstance => {
    const instance = axios.create({
        baseURL: API_BASE_URL,
        timeout: 30000, // 30 seconds timeout
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
    });

    // Request Interceptor
    instance.interceptors.request.use(
        (config: InternalAxiosRequestConfig) => {
            const storedUserRaw = safeLocalStorage.getItem('user');

            if (storedUserRaw) {
                try {
                    const storedUser: StoredUser = JSON.parse(storedUserRaw);
                    const token = storedUser.access;

                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }
                } catch (error) {
                    console.error('Failed to parse user from localStorage:', error);
                }
            }

            // Add common headers like Language
            // For now, defaulting to 'uz'. You can dynamically get this from a hook or context.
            config.headers['Accept-Language'] = 'uz';

            return config;
        },
        (error: AxiosError) => {
            return Promise.reject(error);
        }
    );

    // Response Interceptor
    instance.interceptors.response.use(
        (response) => {
            // Return only data if needed, or the full response.
            // Usually, it's better to return the full response or a structured response.
            return response;
        },
        async (error: AxiosError<ApiErrorResponse>) => {
            const status = error.response?.status;

            if (isAuthErrorStatus(status)) {
                handleExpiredAuthSession();
            } else if (isRateLimitStatus(status)) {
                const detail = (error.response?.data as any)?.detail || error.response?.data?.message;
                if (detail && typeof window !== 'undefined') {
                    const { default: antd } = await import('antd');
                    antd.message.error(detail);
                }
            }

            // Handle other common errors
            if (status === 500) {
                console.error('Internal Server Error (500).');
            }

            // Modern error logging
            if (process.env.NODE_ENV === 'development') {
                console.group('API Error');
                console.error('URL:', error.config?.url);
                console.error('Status:', status);
                console.error('Message:', error.response?.data?.message || error.message);
                console.groupEnd();
            }

            return Promise.reject(error);
        }
    );

    return instance;
};

/**
 * The default Axios instance for API calls.
 */
export const $api = createApiInstance();

export default $api;
