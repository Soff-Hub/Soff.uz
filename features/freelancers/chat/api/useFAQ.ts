import { useQuery } from '@tanstack/react-query';
import { useAppSelector } from '~/app/store/hooks';
import axiosInstance from '~/shared/api/freeleanceApi';

export type FAQOption = {
    id: string;
    question: string;
    answer: string;
};

export type FAQCategory = {
    category: string;
    options: FAQOption[];
};

export const useFAQ = () => {
    const { user } = useAppSelector((state) => state.auth);
    const api = axiosInstance(user?.access);

    return useQuery<FAQCategory[]>({
        queryKey: ['faq', user?.access],
        queryFn: async () => {
            const { data } = await api.get('faq/');
            return data;
        },
        enabled: !!user?.access,
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};
