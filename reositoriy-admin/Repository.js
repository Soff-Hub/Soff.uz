import axios from 'axios';
const baseDomain = 'http://alldataa.pythonanywhere.com/api/v1/seller/'; // API for products

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `${baseDomain}`;

export default axios.create({
    baseUrl,
    headers: customHeaders,
});
