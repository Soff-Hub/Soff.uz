import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../repositories/api";

const getRequest = (url, config) => api.get(url, config).then((res) => res.data);
const postRequest = (url, payload, config) => api.post(url, payload, config).then((res) => res.data);
const putRequest = (url, payload, config) => api.put(url, payload, config).then((res) => res.data);
const patchRequest = (url, payload, config) => api.patch(url, payload, config).then((res) => res.data);
const deleteRequest = (url, config) => api.delete(url, config).then((res) => res.data);


export const useGet = (key, url, params, options) =>
  useQuery([key, url, params], () => getRequest(url, { params }), {
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    ...options
  });

const createMutation = (requestFn) => (key, options) => {
  const queryClient = useQueryClient();

  return useMutation(({ url, payload }) => requestFn(url, payload), {
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
export const useDelete = (key, options) => {
  const queryClient = useQueryClient();

  return useMutation((url) => deleteRequest(url), {
    ...options,
    onSuccess: (...args) => {
      if (key) queryClient.invalidateQueries([key]);
      options?.onSuccess?.(...args);
    },
  });
};
