import axios from 'axios';
const baseDomain = 'http://192.168.1.20/api/v1/seller/'; 
const baseDomainProfile = 'http://192.168.1.20/'; 
export const baseUrlCustomer = 'https://api.soff.uz/api/v1/'


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
