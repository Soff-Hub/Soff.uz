import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useRouter } from 'next/router';
import axiosInstance from '../../../../shared/api/freeleanceApi';

const useCreateChat = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();
    const { push } = useRouter()

    return useMutation({
        mutationFn: async (id) => {
            const formData = new FormData();
            formData.append('participant_id', id);

            const { data } = await axios.post("chats/create", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return data
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            message.success("Chat yaratildi");
            push(`/chat${data?.chat_id ? `?chatId=${data?.chat_id}` : ''}`);
        },
        onError: (error) => {
            const errorMsg = error?.response?.data?.detail || "Xatolik yuz berdi";
            message.error(errorMsg);
        }
    });
};

export default useCreateChat;
