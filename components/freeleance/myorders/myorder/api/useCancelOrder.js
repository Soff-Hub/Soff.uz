import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';


const useCancelOrder = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async (data) => {
            const formData = new FormData();
            formData.append("cancel_reason_id", data.id);
            formData.append("status", 'cancelled');
            await axios.post(`order/${data.id}/status`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });

}

export default useCancelOrder