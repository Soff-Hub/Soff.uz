import axios from 'axios';
const baseDomain = 'https://alldataaa.pythonanywhere.com/api/v1/seller/'; 
export const baseUrlCustomer = 'https://alldataaa.pythonanywhere.com/api/v1/'


export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
});
