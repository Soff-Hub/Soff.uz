import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

function useGetOffers({ orderId, enabled = true, filters = {} }) {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    const isEnabled = !!user?.access && !!orderId && enabled;

    return useInfiniteQuery({
        queryKey: ['offers', orderId, filters],
        queryFn: async ({ pageParam = 1 }) => {
            const params = new URLSearchParams({
                page: pageParam.toString(),
                limit: '10',
            });

            if (
                filters.min_rating !== undefined &&
                filters.min_rating !== null &&
                filters.min_rating !== ''
            ) {
                params.append('min_rating', filters.min_rating.toString());
            }
            if (
                filters.has_category_experience !== undefined &&
                filters.has_category_experience !== null
            ) {
                params.append(
                    'has_category_experience',
                    filters.has_category_experience.toString()
                );
            }
            if (filters.sort_by) {
                params.append('sort_by', filters.sort_by);
            }
            if (filters.sort_order) {
                params.append('sort_order', filters.sort_order);
            }

            const { data } = await axios.get(
                `offer/${orderId}/?${params.toString()}`
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
