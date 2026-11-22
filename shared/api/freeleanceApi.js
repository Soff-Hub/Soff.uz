import axios from 'axios';
import { f_base_url } from './base-url';
import { attachAuthErrorInterceptor } from '../utilities/auth-session';

const axiosInstance = (token) => {
    const instance = axios.create({
        baseURL: `${f_base_url}/api/v1/`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': 'uz',
        },
    });

    attachAuthErrorInterceptor(instance);
    return instance;
};

export default axiosInstance;
