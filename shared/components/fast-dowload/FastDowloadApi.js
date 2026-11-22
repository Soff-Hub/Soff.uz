import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '~/repositories/api';
import {
    handleExpiredAuthSession,
    isAuthErrorStatus,
} from '~/shared/utilities/auth-session';

const getToken = () => Cookies.get('token');

export const fetchFastDownloadProduct = async () => {
    const token = getToken();

    if (!token) {
        throw new Error('Token mavjud emas. Foydalanuvchi tizimga kirmagan.');
    }

    try {
        const res = await axios.get(`${baseURL}customer/downloadable-docs/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        if (isAuthErrorStatus(error.response?.status)) {
            handleExpiredAuthSession();
            throw new Error(
                'Token invalid yoki muddati o‘tgan. Iltimos, qaytadan tizimga kiring.'
            );
        }
        throw error;
    }
};

export const fetchProductDowload = async (id) => {
    const token = getToken();

    if (!token) {
        throw new Error('Token mavjud emas. Foydalanuvchi tizimga kirmagan.');
    }

    try {
        const res = await axios.get(`${baseURL}customer/download/${id}/`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        if (isAuthErrorStatus(error.response?.status)) {
            handleExpiredAuthSession();
            throw new Error('Token invalid yoki muddati o‘tgan.');
        }
        throw error;
    }
};
