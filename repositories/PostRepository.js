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

    async postCartData(payload, token) {
        const endPoint = 'customer/cart/';
        const reponse = await Repository.post(
            baseUrl + endPoint,
            payload,
            token
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

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
    // async getFAQDescription(id) {

    //     const endPoint = `customer/faq/?category=${id}`;
    //     const response = await Repository.get(baseUrl + endPoint)
    //         .then((response) => {
    //             return response.data;
    //         })
    //         .catch((error) => ({ error: JSON.stringify(error) }));
    //     return response;
    // }
}

export default new PostRepository();
