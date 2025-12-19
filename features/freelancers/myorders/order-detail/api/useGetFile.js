import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useGetFile = (id) => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ["file", id],
        queryFn: async () => {
            const { data } = await axios.get(`order/${id}/file`);
            return data;
        },
        enabled: !!id,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
        retry: false
    });
};

export default useGetFile;
