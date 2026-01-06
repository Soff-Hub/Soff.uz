import axiosInstance from '../../../../shared/api/freeleanceApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAppSelector } from '~/app/store/hooks';

export const useReadMessage = () => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }: { id: number }) => {
            await axios.patch(`chats/messages/${id}/read`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
        },
    });
};
