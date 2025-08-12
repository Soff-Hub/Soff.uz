import { useSelector } from 'react-redux';
import axiosInstance from './axiosInstance';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const useSendMessage = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append('chat_id', data.chat_id);
            formData.append('content', data.content);

            await axios.post("chats/message", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['chat']);
            message.success("Muvaffaqiyatli");
        }
    });
};

export default useSendMessage;
