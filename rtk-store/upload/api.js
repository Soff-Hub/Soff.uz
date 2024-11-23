import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '~/repositories/http';

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery: axiosBaseQuery(),
    endpoints: (builder) => ({
        fetchTemplateCategories: builder.query({
            query: (search = '') => ({
                url: '/seller/admin/category-children/template/',
                params: { search },
            }),
        }),
        fetchCreateTags: builder.query({
            query: (search = '') => ({
                url: '/seller/tags-for-product-create/',
                params: { search },
            }),
        }),
        uploadTemplate: builder.mutation({
            query: (data) => ({
                url: '/seller/product-create-second/',
                data,
                method: 'POST',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
        fetchProductDetail: builder.query({
            query: (id) => ({
                url: '/seller/product-list/' + id,
            }),
        }),
        updateTemplate: builder.mutation({
            query: ({ id, data }) => ({
                url: '/seller/product-update/' + id,
                data,
                method: 'PATCH',
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }),
        }),
    }),
});

export const {
    useLazyFetchTemplateCategoriesQuery,
    useLazyFetchCreateTagsQuery,
    useUploadTemplateMutation,
    useFetchProductDetailQuery,
    useUpdateTemplateMutation,
} = uploadApi;
