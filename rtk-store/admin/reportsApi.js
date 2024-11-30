import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '~/repositories/http';

export const reportsApi = createApi({
    reducerPath: 'reportsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['reports'],
    endpoints: (builder) => ({
        fetchReports: builder.query({
            query: (params) => ({ url: '/seller/admin/complaints/', params }),
        }),
    }),
});

export const { useFetchReportsQuery } = reportsApi;
