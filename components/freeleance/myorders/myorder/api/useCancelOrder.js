import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const useCancelOrder = () => {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append('cancel_reason_id', data.reason);
            formData.append('status', 'cancelled');
            await axios.post(`order/${data.id}/status`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
        onError: (error) => {
            const errorMessage =
                typeof error?.response?.data?.detail === 'string'
                    ? error.response.data.detail
                    : 'Bekor qilishda xatolik yuz berdi';
            message.error(errorMessage);
        },
    });
};

export default useCancelOrder;
