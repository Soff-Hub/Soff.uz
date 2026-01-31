import axios from 'axios';
import { safeLocalStorage } from '~/shared/utilities/safe-local-storage';
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

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 403) {
            // Check if URL has modal=open query parameter
            const urlParams = new URLSearchParams(window.location.search);
            const hasModalOpen = urlParams.get('modal') === 'open';

            if (!hasModalOpen) {
                safeLocalStorage.clear();
                window.location.href = '/';
            }
        }
        return Promise.reject(error);
    }
);
