import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';

const useGetOrders = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ["orders"],
        queryFn: async () => {
            const { data } = await axios.get(`order/`);
            return data;
        },
        enabled: !!user?.access,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });
};

export default useGetOrders;
