import axios from 'axios';

const axiosInstance = (token) => {
    return axios.create({
        baseURL: `http://176.96.241.219:8005/api/v1/`,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default axiosInstance;