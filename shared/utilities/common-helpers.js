import axios from 'axios';
import { baseUrl } from '~/repositories/Repository';

export const audioDownloaderSale = async (file, product) => {
    const filee = file?.document?.file_url || file?.document?.short_content_url;
    try {
        const response = await axios.get(filee, {
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

        axios.post(baseUrl + `seller/upload-count/${product.id}`);

        return true;
    } catch (error) {
        console.error('Error downloading file: ', error);
        return Promise.reject(error);
    }
};
