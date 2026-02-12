import axios from 'axios';
import { safeLocalStorage } from '../utilities/safe-local-storage';

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {
    const storedUser = safeLocalStorage.getItem('user');

    if (storedUser) {
        config.headers['Authorization'] = `Bearer ${JSON.parse(storedUser)?.access
            }`;
        config.headers['Accept-Language'] = 'uz';
    }

    return config;
});

export default api;
