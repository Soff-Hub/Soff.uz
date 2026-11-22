import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import axiosInstance from '~/shared/api/freeleanceApi';

const verifyCode = async ({ token, transaction_id, code }) => {
    const axios = axiosInstance(token);
    const payload = { code, transaction_id };

    const { data } = await axios.post("payment/verify-card-order/", payload);
    return data;
};

export const useVerifyCode = () => {
    const { user } = useSelector(state => state.auth);
    const token = user?.access; // tokenni auth’dan olamiz

    return useMutation({
        mutationFn: ({ transaction_id, code }) => verifyCode({ token, transaction_id, code }),
    });
};