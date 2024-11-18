import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '~/repositories/http';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['products'],
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
    }),
});

export const {
    useFetchProductsQuery,
    useFetchStorageQuery,
    useDeleteProductMutation,
    useLazyFetchProductDetailQuery,
    useUpdateProductPriceMutation,
} = productsApi;
