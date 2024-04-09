import axios from 'axios';
// const baseDomain = 'https://api.soff.uz/api/v1/'; // API for products
const baseDomain = 'http://192.168.1.19:80/api/v1/'; 
// export const basePostUrl = 'https://api.soff.uz'; // API for post
export const basePostUrl = 'http://192.168.1.19:80'; 
// export const baseStoreURL = 'http://192.168.1.39:80'; // API for vendor(store)
export const baseStoreURL = 'http://192.168.1.19:80';
// export const baseUrlAuth = 'http://192.168.1.39:80/'
export const baseUrlAuth = 'http://192.168.1.19:80/'

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
