import Axios from 'axios';
import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';

export const stickyHeader = () => {
    let number =
        window.pageXOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop ||
        0;
    const header = document.getElementById('headerSticky');
    if (header !== null) {
        if (number >= 100) {
            header.classList.add('header--sticky');
        } else {
            header.classList.remove('header--sticky');
        }
    }
};

export const generateTempArray = (maxItems) => {
    let result = [];

    for (let i = 0; i < maxItems; i++) {
        result.push(i);
    }
    return result;
};

export const audioDownloaderSale = async (file, product) => {
    const filee = file?.document?.file_url.includes('?AWSAccessKeyId=')
        ? file?.document?.file_url.split('?')[0]
        : file?.document?.file_url;
    try {
        const response = await Axios.get(filee, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download =
            'soff.uz -' +
            product?.title +
            '.' +
            filee?.split('.')[filee?.split('.').length - 1];
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);

        const apiResponse = await Axios.post(
            baseUrl + `seller/upload-count/${product.id}`
        );

        return true;
    } catch (error) {
    
        console.error('Error downloading file: ', error);
        return Promise.reject(error);
    }
};
