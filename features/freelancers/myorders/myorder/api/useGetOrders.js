import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useGetOrders = ({ status }) => {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const currentStatus = Array.isArray(status) ? status.join(',') : status;
    return useInfiniteQuery({
        queryKey: ['orders', currentStatus || 'all'],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(
                `order/?page=${pageParam}&limit=10&${
                    status ? `status=${currentStatus}` : ''
                }`
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
        enabled: !!user?.access,
        refetchOnWindowFocus: true,
        refetchOnMount: true,
        staleTime: 0,
    });
};

export default useGetOrders;
