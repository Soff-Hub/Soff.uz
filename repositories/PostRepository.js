import Repository, { basePostUrl, baseUrl } from './Repository';

class PostRepository {
    constructor(callback) {
        this.callback = callback;
    }

    async getPostItemsByKeyword(payload) {
        const reponse = await Repository.get(
            `${basePostUrl}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }



    async postSearchFilterNews(page, payload, file) {
        const reponse = await Repository.get(
            `${baseUrl}customer/same-google-search/?page=${page}&search=${payload ? payload : ''}&type=${file ? file : 'all'}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }


    async getPostItemsByCategory(payload) {
        const reponse = await Repository.get(
            `${basePostUrl}/posts?title_contains=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    // async postCartData(payload, token) {
    //     const endPoint = 'customer/cart/';
    //     const reponse = await Repository.post(
    //         baseUrl + endPoint,
    //         payload,
    //         token
    //     )
    //         .then((response) => {
    //             return response;
    //         })
    //         .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }

    async getCartData(token) {
        const endPoint = 'customer/cart-list/';

        const response = await Repository.get(baseUrl + endPoint, token)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getFAQCategorys() {
        const endPoint = 'customer/question-category/';
        const response = await Repository.get(baseUrl + endPoint)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
    async getFAQDescriptionAll() {
        const endPoint = `customer/faq/`;
        const response = await Repository.get(baseUrl + endPoint)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async getFAQDescriptionItem(id) {
        const endPoint = `customer/faq/?category=${id}`;
        const response = await Repository.get(baseUrl + endPoint)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
    async postProductUUID(slug, uuid) {
        const endPoint = `customer/get-view-count/${slug}`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            data: {
                uuid: uuid,
            },
        })
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
    async postClickCardNumber(documents, provider, type, token, affiliate_code) {
        const endPoint = `seller/payment/create/`;
        const data = {
            documents: documents,
            provider: provider,
        }

        if (type && type !== 'document') {
            data.purchase_type = type;
        }

        if (affiliate_code) {
            data.affiliate_code = affiliate_code;
        }
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response
            });
        return response;
    }
    async postClickCard(documents, card_number, expire_date, type, token, affiliate_code) {
        const endPoint = `seller/payment/create/`;
        const data = {
            documents,
            expire_date,
            card_number,
            provider: 'card_data',
        }

        if (type && type !== 'document') {
            data.purchase_type = type;
        }

        if (affiliate_code) {
            data.affiliate_code = affiliate_code;
        }
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            data,
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response
            });
        return response;
    }
    async postClickCode(cart, code, token) {
        const endPoint = `seller/payment/verify/`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            data: {
                cart: cart,
                code: code,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            }
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response
            });
        return response;
    }

    async getTopSeller(search, select) {
        const endPoint = `customer/top-sellers/?search=${search || ''}&ordering_field=${select || ''}`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
        })
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response
            });
        return response;
    }
}

export default new PostRepository();
