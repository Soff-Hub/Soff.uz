import axios from 'axios';

const baseDomain = 'http://192.168.1.47:8000/api/v1/seller/'; 
const baseDomainProfile = 'http://192.168.1.47:8000/'; 
export const baseUrlCustomer = 'http://192.168.1.47:8000/api/v1/'


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
