import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';
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
    const { user } = useSelector(state => state.auth);
    const axios = axiosInstance(user.access);
    return useMutation({
        mutationFn: async (orderData) => {
            const { service_id, payment_type, card_number, expire_date, order_id } = orderData
            const payload = { service_id, payment_type };

            if (card_number) {
                payload.card_number = card_number
            }

            if (expire_date) {
                payload.expire_date = expire_date
            }
            if (order_id) {
                payload.order_id = order_id;
            }

            const reponse = await axios.post("payment/create-service-order/", payload);
            return reponse.data
        },
    });
}