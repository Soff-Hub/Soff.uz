import { useMutation } from '@tanstack/react-query';
import api from '~/shared/api/api';

export default function useUpdateProfile() {
    return useMutation({
        mutationFn: async (body) => {
            const response = await api.patch('/auth/profile/', body, {
                headers: { 'Content-Type': 'application/json' },
            });
            return response.data;
        },
    });
}
