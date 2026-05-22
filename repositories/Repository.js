import axios from 'axios';
import { attachAuthErrorInterceptor } from '~/shared/utilities/auth-session';

// BASE DOMAINS
const baseDomain = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`;
export const basePostUrl = `${process.env.NEXT_PUBLIC_BASE_URL}`;
export const baseStoreURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;
export const baseUrlAuth = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
export const baseUrlSoffNew = `${process.env.NEXT_PUBLIC_BASE_URL_SOFFNEW}/`;

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

const repository = axios.create({
    baseUrl,
    headers: customHeaders,
});

attachAuthErrorInterceptor(repository);

export default repository;

export const serializeQuery = query => {
    return Object.keys(query)
        .map(
            key =>
                `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`
        )
        .join('&');
};
