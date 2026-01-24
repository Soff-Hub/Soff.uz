import axios from 'axios';

const baseURL =
    process.env.NODE_ENV === 'development'
        ? process.env.NEXT_PUBLIC_LOCAL_BASE_URL
        : process.env.NEXT_PUBLIC_BASE_URL;

const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
        config.headers['Authorization'] = `Bearer ${
            JSON.parse(storedUser)?.access
        }`;
        config.headers['Accept-Language'] = 'uz';
    }

    return config;
});

export default api;
