import { useSelector } from 'react-redux';
import axiosInstance from '../../../../shared/api/freeleanceApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useSendMessage = () => {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append('chat_id', data.chat_id);
            if (data.content) formData.append('content', data.content);
            if (data.file) formData.append('file', data.file);
            await axios.post('chats/message', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chat'] });
            queryClient.invalidateQueries({ queryKey: ['chats'] });
        },
    });
};

export default useSendMessage;
