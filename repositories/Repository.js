import axios from 'axios';
const baseDomain = 'http://75.119.147.222:8000/api/v1/'; // API for products
// const baseDomain = 'http://75.119.147.222:8000/api/v1/'; // API for products
export const basePostUrl = 'https://api.soff.uz/8000'; // API for post
export const baseStoreURL = 'https://api.soff.uz/8000'; // API for vendor(store)
export const baseUrlAuth = 'https://api.soff.uz/8000/'

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
