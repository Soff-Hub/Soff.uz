import { useSelector } from 'react-redux';
import axiosInstance from '../../../../shared/api/freeleanceApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const useEditMessage = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, content }) => {
            const formData = new FormData();
            formData.append('message_id', id);
            formData.append('content', content);

            await axios.put("chats/messages", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['chats'] });
            message.success("Xabar tahrirlandi");
        },
        onError: () => {
            message.error("Xabar tahrirlanmadi");
        }
    });
};

export default useEditMessage;
