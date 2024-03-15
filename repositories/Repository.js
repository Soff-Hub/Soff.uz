import axios from 'axios';
const baseDomain = 'https://api.soff.uz/api/v1/'; // API for products
// const baseDomain = 'http://192.168.1.48:8000/api/v1/'; 
export const basePostUrl = 'https://api.soff.uz'; // API for post
// export const basePostUrl = 'http://192.168.1.48:8000'; 
export const baseStoreURL = 'https://api.soff.uz'; // API for vendor(store)
// export const baseStoreURL = 'http://192.168.1.48:8000';
export const baseUrlAuth = 'https://api.soff.uz/'
// export const baseUrlAuth = 'http://192.168.1.48:8000/'

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
