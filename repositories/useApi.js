import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
export const baseUrlUseApi = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`;
// export const baseUrlUseApi = `http://162.254.37.89:8008/api/v1/`

const useApi = (key, endpoint, method = 'GET', options = {}) => {
    const queryClient = useQueryClient();

    // Universal fetcher function
    const fetcher = async ({ body } = {}) => {
        const config = {
            method,
            headers: { 'Content-Type': 'application/json' },
            ...(body ? { body: JSON.stringify(body) } : {}),
        };

        const response = await fetch(endpoint, config);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    };

    // Query for GET
    const queryResult =
        method === 'GET' ? useQuery([key], fetcher, options) : undefined;

    // Mutation for POST, PUT, DELETE
    const mutationResult =
        method !== 'GET'
            ? useMutation(fetcher, {
                  onSuccess: data => {
                      // Invalidate and refetch data if needed
                      queryClient.invalidateQueries([key]);
                      if (options.onSuccess) options.onSuccess(data);
                  },
                  ...options,
              })
            : undefined;

    // Return appropriate result based on method
    return method === 'GET' ? queryResult : mutationResult;
};

export default useApi;
