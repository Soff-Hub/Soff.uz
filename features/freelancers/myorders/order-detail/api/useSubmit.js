import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';


const useSubmit = () => {
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user?.access)
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({ id, status, reason, rating, comment }) => {
            const formData = new FormData()
            formData.append("status", status)
            if (reason) formData.append("reason", reason)
            if (rating) formData.append("rating", rating)
            if (comment) formData.append("comment", comment)
            await axios.post(`order/${id}/status`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        }
    });

}

export default useSubmit