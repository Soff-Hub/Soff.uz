import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';

const useGetComments = (id, type) => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ["comments", id],
        queryFn: async () => {
            const { data } = await axios.get(`customer/service/feedbacks/?${type}=${id}`);
            return data;
        },
        enabled: !!id,
        retry: 1,
    });
};

export default useGetComments;
