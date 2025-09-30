import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../repositories/api';

const getRequest = (url, config, instance = api) =>
    instance.get(url, config).then(res => res.data);

const postRequest = (url, payload, config, instance = api) =>
    instance.post(url, payload, config).then(res => res.data);

const putRequest = (url, payload, config, instance = api) =>
    instance.put(url, payload, config).then(res => res.data);

const patchRequest = (url, payload, config, instance = api) =>
    instance.patch(url, payload, config).then(res => res.data);

const deleteRequest = (url, config, instance = api) =>
    instance.delete(url, config).then(res => res.data);

export const useGet = (key, url, params, options = {}, apiInstance = api) =>
    useQuery([key, url, params], () => getRequest(url, { params }, apiInstance), {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        ...options,
    });

const createMutation = requestFn => (key, options = {}, apiInstance = api) => {
    const queryClient = useQueryClient();

    return useMutation(({ url, payload }) => requestFn(url, payload, {}, apiInstance), {
        ...options,
        onSuccess: (...args) => {
            if (key) queryClient.invalidateQueries([key]);
            options?.onSuccess?.(...args);
        },
    });
};

export const usePost = createMutation(postRequest);
export const usePut = createMutation(putRequest);
export const usePatch = createMutation(patchRequest);

export const useDelete = (key, options = {}, apiInstance = api) => {
    const queryClient = useQueryClient();

    return useMutation(url => deleteRequest(url, {}, apiInstance), {
        ...options,
        onSuccess: (...args) => {
            if (key) queryClient.invalidateQueries([key]);
            options?.onSuccess?.(...args);
        },
    });
};
