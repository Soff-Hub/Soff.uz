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

    async postSearchFilter(payload) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?search=${payload ? payload : ''}`
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
    async postClickCardNumber(documents, token) {
        const endPoint = `seller/payment/create/`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            data: {
                documents: documents,
                provider:'click'
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
            } );
        return response;
    }
    async postClickCard(documents, card_number , expire_date, token) {
        const endPoint = `seller/payment/create/`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            data: {
                documents: documents,
                expire_date: expire_date,
                card_number: card_number,
                provider:'via_cart'
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
            } );
        return response;
    }
    async postClickCode(cart, code , token) {
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
        const endPoint = `customer/top-sellers/?search=${search}&ordering_field=${select}`;
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
