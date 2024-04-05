import Axios from 'axios';
import axios from 'axios';

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

    try {
        const response = await Axios.get(file?.file_url, {
            responseType: 'blob',
        });

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement('a');
        a.href = url;
        a.download =
            'soff.uz -' + product?.title  +
            '.' +
            file?.file_url.split('.')[
                file?.file_url?.split('.').length - 1
            ];
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        return true
    } catch (error) {
        console.error('Error downloading file: ', error);
        return Promise.reject(error)
    }
};
