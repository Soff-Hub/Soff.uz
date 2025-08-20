// import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
// import { api } from '../repositories/api';

// const getRequest = (url, config) => api.get(url, config).then(res => res.data);
// const postRequest = (url, payload, config) =>
//     api.post(url, payload, config).then(res => res.data);
// const putRequest = (url, payload, config) =>
//     api.put(url, payload, config).then(res => res.data);
// const patchRequest = (url, payload, config) =>
//     api.patch(url, payload, config).then(res => res.data);
// const deleteRequest = (url, config) =>
//     api.delete(url, config).then(res => res.data);

// export const useGet = (key, url, params, options) =>
//     useQuery([key, url, params], () => getRequest(url, { params }), {
//         staleTime: 1000 * 60 * 5,
//         cacheTime: 1000 * 60 * 10,
//         keepPreviousData: true,
//         refetchOnWindowFocus: false,
//         ...options,
//     });

// const createMutation = requestFn => (key, options) => {
//     const queryClient = useQueryClient();

//     return useMutation(({ url, payload }) => requestFn(url, payload), {
//         ...options,
//         onSuccess: (...args) => {
//             if (key) queryClient.invalidateQueries([key]);
//             options?.onSuccess?.(...args);
//         },
//     });
// };

// export const usePost = createMutation(postRequest);
// export const usePut = createMutation(putRequest);
// export const usePatch = createMutation(patchRequest);
// export const useDelete = (key, options) => {
//     const queryClient = useQueryClient();

//     return useMutation(url => deleteRequest(url), {
//         ...options,
//         onSuccess: (...args) => {
//             if (key) queryClient.invalidateQueries([key]);
//             options?.onSuccess?.(...args);
//         },
//     });
// };




// hooks/useApi.js
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../repositories/api'; // ikkala instanceni import qilamiz

// Helperlar — istalgan axios instance bilan ishlaydi
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

// 🟢 useGet: default api, lekin istasangiz apiInstance yuboring
export const useGet = (key, url, params, options = {}, apiInstance = api) =>
    useQuery([key, url, params], () => getRequest(url, { params }, apiInstance), {
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        keepPreviousData: true,
        refetchOnWindowFocus: false,
        ...options,
    });

// 🔁 Dynamic mutation creator — istalgan axios instance bilan
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
