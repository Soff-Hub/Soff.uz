import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '~/repositories/api';

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
        if (error.response && error.response.status === 403) {
            // Cookies.remove('token'); // tokenni o'chirish
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
        if (error.response && error.response.status === 401) {
            Cookies.remove('token');
            throw new Error('Token invalid yoki muddati o‘tgan.');
        }
        throw error;
    }
};
