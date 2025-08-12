import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from './axiosInstance';

const useGetChats = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ["chats"],
        queryFn: async () => {
            const { data } = await axios.get('chats/list');
            return data;
        },
        enabled: !!user?.access,
        staleTime: 1000 * 60 * 5,
        cacheTime: 1000 * 60 * 10,
    });
};

export default useGetChats;
