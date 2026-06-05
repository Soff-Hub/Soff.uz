import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '~/shared/api/freeleanceApi';

export default function useUpdateOrderDeadline() {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    return useMutation({
        mutationFn: async ({ order_id, deadline_date }) => {
            const formData = new FormData();
            formData.append('deadline_date', deadline_date);
            const response = await axios.patch(
                `order/${order_id}/deadline`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        },
    });
}
