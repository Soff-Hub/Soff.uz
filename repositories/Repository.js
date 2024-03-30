import axios from 'axios';
const baseDomain = 'http://192.168.1.20:8000/api/v1/'; // API for products
// const baseDomain = 'http://75.119.147.222:8002/api/v1/'; 
export const basePostUrl = 'http://192.168.1.20:8000'; // API for post
// export const basePostUrl = 'http://75.119.147.222:8002'; 
export const baseStoreURL = 'http://192.168.1.20:8000'; // API for vendor(store)
// export const baseStoreURL = 'http://75.119.147.222:8002';
export const baseUrlAuth = 'http://192.168.1.20:8000/'
// export const baseUrlAuth = 'http://75.119.147.222:8002/'

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(
            (key) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
