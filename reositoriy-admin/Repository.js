import axios from 'axios';

// const baseDomain = 'https://api.soff.uz/api/v1/sezller/'; 
const baseDomain = 'https://testapi.soff.uz/api/v1/seller/'; 
// const baseDomainProfile = 'https://api.soff.uz/'; 
const baseDomainProfile = 'https://testapi.soff.uz/'; 
// export const baseUrlCustomer = 'https://api.soff.uz/api/v1/'
export const baseUrlCustomer = 'http://192.168.1.16:8000/api/v1/'


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
