import axios from 'axios';
const baseDomain = 'http://46.101.123.144/api/v1/seller/'; 
export const baseUrlCustomer = 'http://46.101.123.144/api/v1/'


export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
});
