import axiosInstance from '../../../../shared/api/freeleanceApi';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useAppSelector } from '~/app/store/hooks';

export const useGetChatById = (id?: string) => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    return useInfiniteQuery({
        queryKey: ['chat-messages', id],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(`chats/${id}?page=${pageParam}`);
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const nextPage = lastPage?.has_next_page
                ? allPages.length + 1
                : undefined;
            return nextPage;
        },
        enabled: !!id,
        refetchOnWindowFocus: true,
        refetchOnMount: 'always',
    });
};
