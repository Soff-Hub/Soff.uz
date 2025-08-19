import { useSelector } from 'react-redux';
import axiosInstance from '../../api/freeleanceApi';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';

const useDeleteMessage = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id) => {
            const formData = new FormData();
            formData.append('message_id', id);

            await axios.delete("chats/messages", {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['chat']);
            message.success("Xabar o'chirildi");
        }
    });
};

export default useDeleteMessage;
