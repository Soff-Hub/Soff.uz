import { useInfiniteQuery } from '@tanstack/react-query';
import { useAppSelector } from '~/app/store/hooks';
import axiosInstance from '~/shared/api/freeleanceApi';

type ChatResponse = {
    total: number;
    page: number;
    limit: number;
    has_next_page: boolean;
    has_previous_page: boolean;
    results: any[];
};

export const useGetChats = (search = '', limit = 20) => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    return useInfiniteQuery<ChatResponse>({
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
            // NOTE: this is for testing purpose only
            // const fetchedData = await fetch(`/api/chats?${params.toString()}`);
            // const data = await fetchedData.json();
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            if (!lastPage) return undefined;
            return lastPage?.has_next_page ? allPages.length + 1 : undefined;
        },
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
        retry: 1,
        staleTime: 0,
        enabled: !!user?.access,
    });
};
