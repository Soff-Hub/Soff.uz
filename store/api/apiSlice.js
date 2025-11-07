import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { d_base_url, f_base_url } from '~/shared/api/base-url';

const userLocal =
    typeof window !== 'undefined' ? localStorage.getItem('user') : null;
const token = userLocal ? JSON.parse(userLocal)?.access : '';

export const apiSoffSlice = createApi({
    reducerPath: 'apiSoff',
    baseQuery: fetchBaseQuery({
        baseUrl: d_base_url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    tagTypes: ['Profile'],
    endpoints: () => ({}),
});

export const apiFreelanceSlice = createApi({
    reducerPath: 'apiFreelance',
    baseQuery: fetchBaseQuery({
        baseUrl: f_base_url,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }),
    tagTypes: ['Directions'],
    endpoints: () => ({}),
});
