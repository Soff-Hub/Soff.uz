import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useGetOrderById = (id, enabled) => {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ['order', id],
        queryFn: async () => {
            const { data } = await axios.get(`order/${id}`);
            return data;
        },
        enabled: !!id && !!user?.access && enabled,
    });
};

export default useGetOrderById;
