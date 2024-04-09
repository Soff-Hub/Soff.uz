import axios from 'axios';

// const baseDomain = 'https://api.soff.uz/api/v1/sezller/'; 
const baseDomain = 'http://192.168.1.19:80/api/v1/seller/'; 
// const baseDomainProfile = 'http://192.168.1.39:80/'; 
const baseDomainProfile = 'http://192.168.1.19:80/'; 
// export const baseUrlCustomer = 'http://192.168.1.39:80/api/v1/'
export const baseUrlCustomer = 'http://192.168.1.19:80/api/v1/'


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
