import axios from 'axios';
// const baseDomain = 'https://api.soff.uz/api/v1/'; // API for products
const baseDomain = 'http://192.168.1.23:80/api/v1/'; // API for products
export const basePostUrl = 'http://192.168.1.23:80'; // API for post
export const baseStoreURL = 'http://192.168.1.23:80'; // API for vendor(store)
export const baseUrlAuth = 'http://192.168.1.23:80/'

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
