import { useSelector } from 'react-redux';
import axiosInstance from './axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useReadMessage = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }) => {
            await axios.patch(`chats/messages/${id}/read`,);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['chat']);
        }
    });
};

export default useReadMessage;
