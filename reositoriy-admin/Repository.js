import axios from 'axios';

const baseDomain = 'http://192.168.1.20:8000/api/v1/seller/'; 
// const baseDomain = 'http://75.119.147.222:8002/api/v1/seller/'; 
const baseDomainProfile = 'http://192.168.1.20:8000/'; 
// const baseDomainProfile = 'http://75.119.147.222:8002/'; 
export const baseUrlCustomer = 'http://192.168.1.20:8000/api/v1/'
// export const baseUrlCustomer = 'http://75.119.147.222:8002/api/v1/'


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
