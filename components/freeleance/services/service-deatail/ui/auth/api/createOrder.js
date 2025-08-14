import { useSelector } from 'react-redux';
import { useMutation } from '@tanstack/react-query';
import axiosInstance from '~/components/freeleance/api/freeleanceApi';

const createOrderRequest = async ({ token, id, type, card_number, expire_date }) => {
    const axios = axiosInstance(token);
    const payload = { id, type, card_number, expire_date };
    const { data } = await axios.post("payment/create-service-order/", payload);
    return data;
};

export default function useCreateOrder() {
    const { user } = useSelector(state => state.auth);

    return useMutation({
        mutationFn: (orderData) => createOrderRequest({ token: user.access, ...orderData }),
        onSuccess: (data) => {
            console.log("✅ Order created:", data);
        },
        onError: (error) => {
            console.error("❌ Order error:", error);
        }
    });
}
