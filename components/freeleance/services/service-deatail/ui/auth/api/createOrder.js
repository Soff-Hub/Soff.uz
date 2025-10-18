import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '~/shared/api/freeleanceApi';
import { message } from 'antd';
// const createOrderRequest = async ({ token, service_id, payment_type, card_number, expire_date, order_id }) => {
//     const axios = axiosInstance(token);
//     const payload = { service_id, payment_type };

//     if (card_number) {
//         payload.card_number = card_number
//     }

//     if (expire_date) {
//         payload.expire_date = expire_date
//     }
//     if (order_id) {
//         payload.order_id = order_id;
//     }

//     const { data } = await axios.post("payment/create-service-order/", payload);
//     console.log(data);

//     return data;
// };

export default function useCreateOrder() {
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
