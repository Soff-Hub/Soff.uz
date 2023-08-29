import Repository, { baseUrl } from './Repository';

class PatchRepository {
    async PatchCategory(data, id) {
        const endPoint = `admin/category-list/${id}/`;
        const reponse = await Repository.patch(baseUrl + endPoint, data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async PatchUsers(data, id) {
        const endPoint = `admin/customer-list/${id}/`;
        const reponse = await Repository.patch(baseUrl + endPoint, data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getShopsPatch(data, id) {
        const endPoint = `admin/seller-list/${id}`;
        const reponse = await Repository.patch(baseUrl + endPoint,data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getProductsPatch(data, id) {
        const endPoint = `admin/product-list/${id}/`;
        const reponse = await Repository.patch(baseUrl + endPoint,data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getMyProductsPatch(data, id) {
        const endPoint = `product-update/${id}`;
        const reponse = await Repository.patch(baseUrl + endPoint,data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getBannersPatch(data, id) {
        const endPoint = `admin/banner-update/${id}`;
        const reponse = await Repository.patch(baseUrl + endPoint,data)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getMyProductsDelete( id) {
        const endPoint = `product-delete/${id}`;
        const reponse = await Repository.patch(baseUrl + endPoint)
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
}

export default new PatchRepository();
