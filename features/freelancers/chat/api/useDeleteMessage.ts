import axiosInstance from '../../../../shared/api/freeleanceApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAppSelector } from '~/app/store/hooks';

export const useDeleteMessage = () => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: number) => {
            const formData = new FormData();
            formData.append('message_id', String(id));

            await axios.delete('chats/messages', {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat-messages'] });
            message.success("Xabar o'chirildi");
        },
    });
};
