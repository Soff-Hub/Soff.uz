import axios from 'axios';

// const baseDomain = 'https://api.soff.uz/api/v1/seller/'; 
const baseDomain = 'http://75.119.147.222:8002/api/v1/seller/'; 
// const baseDomainProfile = 'https://api.soff.uz/'; 
const baseDomainProfile = 'http://75.119.147.222:8002/'; 
// export const baseUrlCustomer = 'https://api.soff.uz/api/v1/'
export const baseUrlCustomer = 'http://75.119.147.222:8002/api/v1/'


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
