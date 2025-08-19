import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/freeleanceApi';

const useGetChats = (search = '') => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ["chats", search],
        queryFn: async () => {
            const { data } = await axios.get(`chats?search=${encodeURIComponent(search)}`);
            return data;
        },
        enabled: !!user?.access,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });
};

export default useGetChats;
