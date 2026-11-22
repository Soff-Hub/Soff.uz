import axios from 'axios';
import { safeLocalStorage } from '../utilities/safe-local-storage';
import { attachAuthErrorInterceptor } from '../utilities/auth-session';

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

attachAuthErrorInterceptor(api);

export default api;
