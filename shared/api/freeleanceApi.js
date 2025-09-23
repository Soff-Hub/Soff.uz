import axios from 'axios';

const axiosInstance = (token) => {
    return axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default axiosInstance;