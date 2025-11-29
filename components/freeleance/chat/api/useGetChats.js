import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../shared/api/freeleanceApi';

const useGetChats = (search = '') => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ['chats', search, user?.access],
        queryFn: async () => {
            const { data } = await axios.get(
                `chats?search=${encodeURIComponent(search)}`
            );
            return data;
        },
        enabled: !!user?.access,
    });
};

export default useGetChats;

// 1.09.00:50 da slateTime va cache timeni o'chirib qo'ydim
