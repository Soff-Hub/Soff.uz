import axios from 'axios';
import Cookies from 'js-cookie';
import { baseURL } from '~/repositories/api';

const token = Cookies.get("token")

export const fetchFastDownloadProduct = async () => {

    if (!token) {
        throw new Error('Token mavjud emas. Foydalanuvchi tizimga kirmagan.');
    }

    const res = await axios.get(`${baseURL}customer/downloadable-docs/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
    return res.data;
};

export const fetchProductDowload = async (id) => {
    const res = await axios.get(`${baseURL}customer/download/${id}/`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
    return res.data
}