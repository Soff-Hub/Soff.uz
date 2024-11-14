import axios from 'axios';
import { createApi } from '@reduxjs/toolkit/query/react';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const clientApi = axios.create({
    baseURL: baseURL + '/api/v1',
});

clientApi.interceptors.request.use(
    (config) => {
        const storedToken = localStorage.getItem('user');

        if (storedToken && JSON.parse(storedToken).access) {
            const token = JSON.parse(storedToken).access;
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export const axiosBaseQuery =
    () =>
    async ({ url, method, data, params }) => {
        try {
            const result = await http({
                url: baseURL + '/api/v1' + url,
                method,
                data,
                params,
            });
            return { data: result.data };
        } catch (axiosError) {
            let err = axiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data,
                },
            };
        }
    };

export const http = clientApi;
