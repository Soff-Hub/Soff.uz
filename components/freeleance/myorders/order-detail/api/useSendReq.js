import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useSendReq = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, content, file }) => {
            const formData = new FormData();

            if (content) formData.append("content", content);
            if (file) formData.append("file", file); // <-- to'g'rilandi

            formData.append("order_id", id);

            await axios.post(`customer/order-note/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['order'] });
            message.success("Buyurtma talablari muvaffaqiyatli yuborildi!")
        }
    });
};

export default useSendReq;
