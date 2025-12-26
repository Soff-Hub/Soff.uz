import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { useAppSelector } from '~/app/store/hooks';
import axiosInstance from '~/shared/api/freeleanceApi';

export type SubmitPayloadType = {
    id: number;
    status: 'completed' | 'rejected';
    reason?: string;
    rating?: number;
    comment?: string;
};

const useSubmit = () => {
    const { user } = useAppSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({
            id,
            status,
            reason,
            rating,
            comment,
        }: SubmitPayloadType) => {
            const formData = new FormData();
            formData.append('status', status);
            if (reason) formData.append('reason', reason);
            if (rating) formData.append('rating', rating.toString());
            if (comment) formData.append('comment', comment);
            await axios.post(`order/${id}/status`, formData);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders'] });
        },
    });
};

export default useSubmit;
