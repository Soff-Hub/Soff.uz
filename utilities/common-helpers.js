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

// console.log(product);
// console.log(product.poster_url.split("/").at(-1));

export const fileDownloader = (product) => {
    fetch(product.file_url)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `soff.uz-${
                    product?.category?.name || product?.slug
                }.${product.file_url.split('.').at(-1)}`
            );

            link.style.display = 'none';
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error(error));

    axios.post(`https://api.soff.uz/api/v1/seller/upload-count/`, {
        pk: product.id,
    });
};

export const fileDownloaderSale = (product) => {
    fetch(product.file_url)
        .then((response) => response.blob())
        .then((blob) => {
            const url = window.URL.createObjectURL(new Blob([blob]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `soff.uz-${product.file_url.split('.').at(-1)}`
            );

            link.style.display = 'none';
            document.body.appendChild(link);

            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => console.error(error));
};

export const audioDownloaderSale = async (product) => {
    try {
        const response = await fetch(product?.file_url);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `soff.uz-${product.file_url.split(".").at(-1)}`); // Name of your audio file
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
    } catch (error) {
        console.error('Error downloading audio:', error);
    }
};
