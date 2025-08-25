import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';

const useGetOrderById = (id) => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ["order", id],
        queryFn: async () => {
            const { data } = await axios.get(`order/${id}`);
            return data;
        },
        enabled: !!id,
        retry: 1,
        refetchOnWindowFocus: false,
    });
};

export default useGetOrderById;
