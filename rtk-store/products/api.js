import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '~/repositories/http';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['products', 'productsAdmin'],
    endpoints: (builder) => ({
        fetchStorage: builder.query({
            query: () => ({ url: '/seller/storage/' }),
        }),
        fetchProducts: builder.query({
            query: (params) => ({ url: '/seller/product-list/', params }),
            providesTags: ['products'],
        }),
        fetchProductDetail: builder.query({
            query: (id) => ({ url: '/seller/product-list/' + id }),
        }),
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: '/seller/product-delete/' + id,
                method: 'delete',
            }),
            invalidatesTags: ['products'],
        }),
        updateProductPrice: builder.mutation({
            query: ({ id, data }) => ({
                url: `/seller/product-update/${id}`,
                method: 'PATCH',
                data,
            }),
            invalidatesTags: ['products'],
        }),
        fetchAdminProducts: builder.query({
            query: (params) => ({ url: '/seller/admin/product-list/', params }),
            providesTags: ['productsAdmin'],
        }),
        fetchAdminProductDetail: builder.query({
            query: (id) => ({ url: '/seller/admin/product-list/' + id + '/' }),
        }),
        regenrateAdminProduct: builder.query({
            query: (id) => ({
                url: `/seller/admin/set-poster/${id}/`,
                method: 'GET',
            }),
        }),
    }),
});

export const {
    useFetchProductsQuery,
    useFetchStorageQuery,
    useDeleteProductMutation,
    useLazyFetchProductDetailQuery,
    useUpdateProductPriceMutation,
    useFetchAdminProductsQuery,
    useLazyFetchAdminProductDetailQuery,
    useLazyRegenrateAdminProductQuery,
    useLazyFetchAdminProductsQuery,
} = productsApi;
