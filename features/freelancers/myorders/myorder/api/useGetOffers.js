import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

function useGetOffers({ orderId, enabled = true }) {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    const isEnabled = !!user?.access && !!orderId && enabled;

    return useInfiniteQuery({
        queryKey: ['offers', orderId],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(
                `offer/${orderId}/?page=${pageParam}&limit=10`
            );
            return data;
        },
        getNextPageParam: (lastPage, _allPages) => {
            const totalPages = Math.ceil(lastPage.total / lastPage.limit);

            if (lastPage.page < totalPages) {
                return lastPage.page + 1;
            }

            return undefined;
        },
        enabled: isEnabled,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });
}

export default useGetOffers;
