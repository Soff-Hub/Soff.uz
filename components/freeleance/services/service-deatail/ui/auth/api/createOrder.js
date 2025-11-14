import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '~/shared/api/freeleanceApi';

export default function useCreateOrder(balanceMode) {
    const { user } = useSelector((state) => state.auth);
    const axios = axiosInstance(user?.access);
    return useMutation({
        mutationFn: async (orderData) => {
            const {
                service_id,
                payment_type,
                card_number,
                expire_date,
                order_id,
                order_requirement_description,
                order_requirement_file,
            } = orderData;
            const formData = new FormData();
            if (service_id) formData.append('service_id', service_id);
            formData.append('payment_type', payment_type);
            formData.append('from_balance', balanceMode);

            if (card_number) {
                formData.append('card_number', card_number);
            }

            if (expire_date) {
                formData.append('expire_date', expire_date);
            }
            if (order_id) {
                formData.append('order_id', order_id);
            }

            if (order_requirement_description) {
                formData.append(
                    'order_requirement_description',
                    order_requirement_description
                );
            }

            if (order_requirement_file) {
                formData.append(
                    'order_requirement_file',
                    order_requirement_file
                );
            }

            const reponse = await axios.post(
                'payment/create-service-order/',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return reponse.data;
        },
    });
}
