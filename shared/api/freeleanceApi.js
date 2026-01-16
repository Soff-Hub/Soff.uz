import axios from 'axios';
import { f_base_url } from './base-url';
import { getUserLocale } from '~/store/api/apiSlice';
import Cookies from 'js-cookie';

const axiosInstance = (token) => {
    const lang = getUserLocale();

    console.log({ lang, cookie: Cookies.get('user_locale') });
    return axios.create({
        baseURL: `${f_base_url}/api/v1/`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': lang,
        },
    });
};

export default axiosInstance;
