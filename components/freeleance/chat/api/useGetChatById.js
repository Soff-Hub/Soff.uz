import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '../../api/freeleanceApi';

const useGetChatById = (id) => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);

    return useQuery({
        queryKey: ["chat", id],
        queryFn: async () => {
            const { data } = await axios.get(`chats/${id}`);
            return data;
        },
        enabled: !!id,
        refetchOnMount: "always",
        refetchOnWindowFocus: true,
    });
};

export default useGetChatById;
