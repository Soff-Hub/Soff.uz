import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../api/freeleanceApi';
import { useRouter } from 'next/router';

export const useFGet = (
    key,
    url,
    { enabled = true, token, ...options } = {}
) => {
    const { locale } = useRouter();
    const queryKey = Array.isArray(key) ? [...key, locale] : [key, locale];
    console.log({ locale, queryKey });
    return useQuery({
        queryKey,
        queryFn: async () => {
            const { data } = await axiosInstance(token).get(url);
            return data;
        },
        enabled,
        ...options,
    });
};

export const useFPost = ({
    url,
    token,
    onSuccess,
    onError,
    ...options
} = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await axiosInstance(token).post(url, body);
            return data;
        },
        onSuccess: (data, variables, context) => {
            if (onSuccess) onSuccess(data, variables, context);
            // invalidate cache
            queryClient.invalidateQueries();
        },
        onError,
        ...options,
    });
};

export const useFPatch = ({
    url,
    token,
    onSuccess,
    onError,
    ...options
} = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (body) => {
            const { data } = await axiosInstance(token).patch(url, body);
            return data;
        },
        onSuccess: (data, variables, context) => {
            if (onSuccess) onSuccess(data, variables, context);
            queryClient.invalidateQueries();
        },
        onError,
        ...options,
    });
};

export const useFDelete = ({
    url,
    token,
    onSuccess,
    onError,
    ...options
} = {}) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (id) => {
            const { data } = await axiosInstance(token).delete(`${url}/${id}`);
            return data;
        },
        onSuccess: (data, variables, context) => {
            if (onSuccess) onSuccess(data, variables, context);
            queryClient.invalidateQueries();
        },
        onError,
        ...options,
    });
};
