import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useOrdersStatus = ({ activeclyFetch = false } = {}) => {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ['ordersStatus'],
        queryFn: async () => {
            const { data } = await axios.get(`order/order-status-doing/`);
            return data;
        },
        enabled: !!user?.access,
        staleTime: 0,
        refetchOnWindowFocus: activeclyFetch,
        refetchOnMount: activeclyFetch,
    });
};

export default useOrdersStatus;
