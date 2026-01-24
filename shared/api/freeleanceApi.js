import axios from 'axios';
import { f_base_url } from './base-url';

const axiosInstance = (token) => {
    return axios.create({
        baseURL: `${f_base_url}/api/v1/`,
        headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': 'uz',
        },
    });
};

export default axiosInstance;
