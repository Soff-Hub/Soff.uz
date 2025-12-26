import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '~/app/store/hooks';
import axiosInstance from '~/shared/api/freeleanceApi';

const useGetReasons = () => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ['reasons'],
        queryFn: async () => {
            const { data } = await axios.get(
                `seller-services/order-cancel-reasons`
            );
            return data;
        },
        enabled: !!user?.access,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });
};

export default useGetReasons;
