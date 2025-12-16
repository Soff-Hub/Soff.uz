import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useGetChats = (search = '', limit = 20) => {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    return useInfiniteQuery({
        queryKey: ['chats', search, limit, user?.access],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({
                page: pageParam.toString(),
                limit: limit.toString(),
            });

            if (search) {
                params.append('search', encodeURIComponent(search));
            }

            const { data } = await axios.get(`chats?${params.toString()}`);
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage) return undefined;
            return lastPage?.has_next_page ? allPages.length + 1 : undefined;
        },
        initialPageParam: 1,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
        retry: 1,
        staleTime: 0,
        enabled: !!user?.access,
        // Keep previous data while fetching new data to prevent undefined state
        placeholderData: (previousData) => previousData,
    });
};

export default useGetChats;
