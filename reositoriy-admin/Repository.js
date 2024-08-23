import axios from 'axios';

// BASE DOMAINS
const baseDomain = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/seller/`;
const baseDomainProfile = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
export const baseUrlCustomer = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});

export const orginalUrl = baseUrlCustomer

export const orginalApi = axios.create({
    baseUrl: orginalUrl
});


