import { createApi } from '@reduxjs/toolkit/query/react';
import { axiosBaseQuery } from '~/repositories/http';

export const uploadApi = createApi({
    reducerPath: 'uploadApi',
    baseQuery: axiosBaseQuery(),
    tagTypes: ['upload'],
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
        // replyToComment: builder.mutation({
        //     query: ({ id, data }) => ({
        //         url: '/seller/document-review/' + id,
        //         method: 'post',
        //         data,
        //     }),
        //     invalidatesTags: ['upload'],
        // }),
    }),
});

export const {
    useLazyFetchTemplateCategoriesQuery,
    useLazyFetchCreateTagsQuery,
    useUploadTemplateMutation,
} = uploadApi;
