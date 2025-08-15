import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';


const useCancelOrder = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, reason }) => {
            const formData = new FormData();
            formData.append("reason", reason);

            await axios.post(`order/orders/${id}/cancel`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['orders']);
        }
    });

}

export default useCancelOrder