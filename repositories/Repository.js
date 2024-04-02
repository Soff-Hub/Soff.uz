import axios from 'axios';
const baseDomain = 'https://api.soff.uz/api/v1/'; // API for products
// const baseDomain = 'https://testapi.soff.uz/api/v1/'; 
export const basePostUrl = 'https://api.soff.uz'; // API for post
// export const basePostUrl = 'https://testapi.soff.uz'; 
export const baseStoreURL = 'https://api.soff.uz'; // API for vendor(store)
// export const baseStoreURL = 'https://testapi.soff.uz';
export const baseUrlAuth = 'https://api.soff.uz/'
// export const baseUrlAuth = 'https://testapi.soff.uz/'

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
