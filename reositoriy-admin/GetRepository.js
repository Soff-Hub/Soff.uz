import Repository, { baseUrl } from "./Repository";

class GetRepository {
    constructor(callback) {
        this.callback = callback;
    }
    async getSellerDashbord() {
        const endPoint = `dashboard/`;
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getPopularProducts(page) {
        const endPoint = `admin/popular-product/?page=${page}`;
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getShops(page) {
        const endPoint = `admin/seller-list/?page=${page}`;
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getShopsProducts(page) {
        const endPoint = `admin/product-list/?page=${page}`;
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getMyProducts(page) {
        const endPoint = `product-list/1`;
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getCategory(page) {
        const endPoint = `admin/category-list/?page=${page}`;
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getOrdersLists(page) {
        const endPoint = `admin/order-list/?page=${page}`;
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.status===200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

}


export default new GetRepository();
