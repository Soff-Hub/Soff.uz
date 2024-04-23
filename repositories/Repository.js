import axios from 'axios';

// BASE DOMAINS
const baseDomain = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`;
export const basePostUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
export const baseStoreURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
export const baseUrlAuth = `${process.env.NEXT_PUBLIC_BASE_URL}/`


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
