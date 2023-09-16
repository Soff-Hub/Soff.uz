import axios from 'axios';
const baseDomain = 'http://46.101.123.144/api/v1/seller/'; 
const baseDomainProfile = 'http://46.101.123.144/'; 
export const baseUrlCustomer = 'http://46.101.123.144/api/v1/'


export const baseUrl = `${baseDomain}`;
export const baseUrlProfie = `${baseDomainProfile}`;

export default axios.create({
    baseUrl,
    baseDomainProfile,
});
