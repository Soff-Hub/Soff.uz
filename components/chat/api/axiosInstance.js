import axios from 'axios';

const axiosInstance = (token) => {
    return axios.create({
        baseURL: `http://192.168.1.60:8000/api/v1/`, //192.168.1.60  http://176.96.241.219:8005
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default axiosInstance;