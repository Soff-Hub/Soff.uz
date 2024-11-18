import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '~/repositories/http';

export const dashboardApi = createApi({
    reducerPath: 'dashboardApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['dashboard'],
    endpoints: (builder) => ({
        fetchDashboardStats: builder.query({
            query: () => ({ url: '/seller/admin/dashboard/' }),
        }),
        fetchDashboardDate: builder.query({
            query: () => ({ url: '/seller/get-dates/' }),
        }),
        fetchDashboardUploads: builder.query({
            query: (params = '') => ({
                url: '/seller/admin/documents-chart/?' + params,
            }),
        }),
        fetchDashboardUsers: builder.query({
            query: (params = '') => ({
                url: '/seller/admin/users-chart/?' + params,
            }),
        }),
        fetchDashboardIncome: builder.query({
            query: (url) => ({
                url,
            }),
        }),
        fetchDashboardOrders: builder.query({
            query: () => ({
                url: '/seller/admin/order-list/?page=1',
            }),
        }),
        fetchDashboardComments: builder.query({
            query: (page) => ({
                url: '/seller/admin/comments/?page=' + page,
            }),
            providesTags: ['products'],
        }),
        replyToComment: builder.mutation({
            query: ({ id, data }) => ({
                url: '/seller/document-review/' + id,
                method: 'post',
                data,
            }),
            invalidatesTags: ['products'],
        }),
        fetchPopularProducts: builder.query({
            query: (page) => ({
                url: '/seller/admin/popular-product/?page=' + page,
            }),
        }),
        fetchDonates: builder.query({
            query: (page) => ({
                url: '/seller/admin/donates/?page=' + page,
            }),
        }),
    }),
});

export const {
    useFetchDashboardStatsQuery,
    useLazyFetchDashboardStatsQuery,
    useFetchDashboardDateQuery,
    useFetchDashboardUploadsQuery,
    useFetchDashboardUsersQuery,
    useFetchDashboardIncomeQuery,
    useFetchDashboardOrdersQuery,
    useFetchDashboardCommentsQuery,
    useFetchPopularProductsQuery,
    useFetchDonatesQuery,
    useReplyToCommentMutation,
} = dashboardApi;
