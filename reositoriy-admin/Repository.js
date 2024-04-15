import axios from 'axios';

const baseDomain = 'https://testapi.soff.uz/api/v1/seller/';
const baseDomainProfile = 'https://testapi.soff.uz/';
export const baseUrlCustomer = 'https://testapi.soff.uz/api/v1/';

export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
