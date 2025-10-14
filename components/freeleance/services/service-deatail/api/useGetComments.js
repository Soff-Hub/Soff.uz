import { useInfiniteQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useGetComments = (id, type) => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useInfiniteQuery({
        queryKey: ['comments', id],
        queryFn: async ({ pageParam = 1 }) => {
            const { data } = await axios.get(
                `customer/service/feedbacks/?${type}=${id}&page=${pageParam}`
            );
            return data;
        },
        getNextPageParam: (lastPage, allPages) => {
            const loaded = allPages.length * 10;
            if (loaded < lastPage.total) {
                return allPages.length + 1;
            }
            return undefined;
        },
        enabled: !!id,
        retry: false,
    });
};

export default useGetComments;
