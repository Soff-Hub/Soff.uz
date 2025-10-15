import axios from 'axios';
export const authBaseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const authAxios = axios.create({
    baseURL: authBaseUrl,
    timeout: 30000,
});

authAxios.interceptors.request.use(
    (config) => {
        const storedToken = localStorage.getItem('user');
        if (storedToken && JSON.parse(storedToken).access) {
            const token = JSON.parse(storedToken).access;
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// authAxios.interceptors.response.use(
//     (response) => {
//         return response;
//     },
//     (error) => {
//         if (error.response && error.response.status === 403) {
//             const urlParams = new URLSearchParams(window.location.search);
//             const hasModalOpen = urlParams.get('modal') === 'open';

//             if (!hasModalOpen) {
//                 localStorage.clear();
//                 window.location.href = '/';
//             }
//         }
//         return Promise.reject(error);
//     }
// );
