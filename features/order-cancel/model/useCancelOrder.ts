import { useMutation, useQueryClient } from '@tanstack/react-query';
import { message } from 'antd';
import { useAppSelector } from '~/app/store/hooks';
import axiosInstance from '~/shared/api/freeleanceApi';

const useCancelOrder = () => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (data: { reason: string; id: string }) => {
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
        onError: (error: any) => {
            const errorMessage =
                typeof error?.response?.data?.detail === 'string'
                    ? error.response.data.detail
                    : 'Bekor qilishda xatolik yuz berdi';
            message.error(errorMessage);
        },
    });
};

export default useCancelOrder;
