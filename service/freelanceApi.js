import axios from 'axios';
import api from './api';
export const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL_FREELANCENEW}`;

export const freelanceApi = axios.create({
    baseURL: baseURL,
    timeout: 30000,
});

api.interceptors.request.use(
    config => {
        const storedToken = localStorage.getItem('user');
        if (storedToken && JSON.parse(storedToken).access) {
            const token = JSON.parse(storedToken).access;
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response && error.response.status === 403) {
            localStorage.clear();
            window.location.href = '/';
        }
        return Promise.reject(error);
    }
);
