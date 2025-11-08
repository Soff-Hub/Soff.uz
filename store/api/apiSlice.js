import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { d_base_url, f_base_url } from '~/shared/api/base-url';

const getToken = () => {
    if (typeof window !== 'undefined') {
        const userLocal =
            typeof window !== 'undefined' ? localStorage.getItem('user') : null;
        return userLocal ? JSON.parse(userLocal)?.access : '';
    }
    return null;
};

export const apiSoffSlice = createApi({
    reducerPath: 'apiSoff',
    baseQuery: fetchBaseQuery({
        baseUrl: d_base_url,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Profile'],
    endpoints: () => ({}),
});

export const apiFreelanceSlice = createApi({
    reducerPath: 'apiFreelance',
    baseQuery: fetchBaseQuery({
        baseUrl: f_base_url,
        prepareHeaders: (headers) => {
            const token = getToken();
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Directions'],
    endpoints: () => ({}),
});
