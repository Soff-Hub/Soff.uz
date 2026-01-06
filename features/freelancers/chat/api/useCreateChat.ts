import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useRouter } from 'next/router';
import axiosInstance from '../../../../shared/api/freeleanceApi';
import { useAppSelector } from '~/app/store/hooks';

export const useCreateChat = () => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();
    const { push } = useRouter();

    return useMutation({
        mutationFn: async (id: number) => {
            const formData = new FormData();
            formData.append('participant_id', String(id));

            const { data } = await axios.post('chats/create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            message.success('Chat yaratildi');
            push(`/chat${data?.chat_id ? `?chatId=${data?.chat_id}` : ''}`);
        },
        onError: (error: any) => {
            const errorMsg =
                error?.response?.data?.detail || 'Xatolik yuz berdi';
            message.error(errorMsg);
        },
    });
};
