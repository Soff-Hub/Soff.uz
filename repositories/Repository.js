import axios from 'axios';
// const baseDomain = 'https://soffaa.pythonanywhere.com/api/v1/'; // API for products
const baseDomain = 'https://api.soff.uz/api/v1/'; // API for products
export const basePostUrl = 'https://api.soff.uz'; // API for post
export const baseStoreURL = 'https://api.soff.uz'; // API for vendor(store)
export const baseUrlAuth = 'https://api.soff.uz/'

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
