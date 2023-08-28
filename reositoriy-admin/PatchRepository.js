import Repository, { baseUrl } from './Repository';

class PatchRepository {
    async PatchCategory(data, id, token) {
        const endPoint = `admin/category-list/${id}/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
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
    async PatchUsers(data, id, token) {
        const endPoint = `admin/customer-list/${id}/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
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
    async getShopsPatch(data, id, token) {
        const endPoint = `admin/seller-list/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
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
    async getProductsPatch(data, id, token) {
        const endPoint = `admin/product-list/${id}/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
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
    async getMyProductsPatch(data, id, token) {
        const endPoint = `product-update/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
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
    async getBannersPatch(data, id, token) {
        const endPoint = `admin/banner-update/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })

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
    async getMyProductsDelete(id, token) {
        const endPoint = `product-delete/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
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
