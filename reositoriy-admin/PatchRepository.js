import { baseDomain } from '~/repositories/NewRepository';
import Repository, {
    baseUrl,
    baseUrlCustomer,
    baseUrlProfie,
} from './Repository';

class PatchRepository {
    async PatchCategory(data, id, token) {
        const endPoint = `admin/category-list/${id}/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error?.response);
        return reponse;
    }
    async PatchUsers(data, id, token) {
        const endPoint = `admin/customer-list/${id}/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }
    async PatchTegs(data, id, token) {
        const endPoint = `admin/tag-list/${id}/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
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
                Authorization: `Bearer ${token}`,
            },
            data: data,
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
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }
    async getMyProductsPatch(data, id, token) {
        const endPoint = `product-update/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 202) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error?.response);
        return reponse;
    }
    async getTextItemsUpdate(data, id, token) {
        const endPoint = `admin/offer-update/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 202) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error?.response);
        return reponse;
    }
    async getBannersPatch(data, id, token) {
        const endPoint = `admin/banner-update/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async getMyDealsDelete(id, token) {
        const endPoint = `deals/my-deals/${id}/`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 204) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error?.response);
        return reponse;
    }
    async getMyDealsDeleteApplicaiton(id, token) {
        const endPoint = `deals/deal-applications/${id}/`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                if (response.status === 204) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error?.response);
        return reponse;
    }

    async getMyProductsDelete(id, token) {
        const endPoint = `product-delete/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
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

    async getPatchProfile(data, token) {
        const endPoint = 'auth/profile/';
        try {
            const response = await Repository({
                url: baseUrlProfie + endPoint,
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                data: data,
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error?.response?.data);
        }
    }

    async getPatchProfileAriza(data, id, token) {
        const endPoint = `admin/answer/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }
    async getPatchPoster(data, token) {
        const endPoint = `product-create-second/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 201) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }
    
    async patchDealadmin(id, data, token) {
        const endPoint = `deals/admin/deals/${id}/`;
        const reponse = await Repository({
            url: baseDomain + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async patchDealUpdate(id, data, token) {
        const endPoint = `deals/my-deals/${id}/`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async patchDealUpdateApplicaiton(id, data, token) {
        const endPoint = `deals/deal-applications/${id}/`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async patchDealUpdateApplicaitonUpdates(id, data, token) {
        const endPoint = `deals/deal-applications-update/${id}/`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async patchDealUpdateApplicaitonCommit(id, data, token) {
        const endPoint = `seller/document-review/${id}`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 201) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async patchDealUpdateApplicaitonStatus(id, data, token) {
        const endPoint = `deals/application-status/${id}`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
            },
            data: data,
        })
            .then((response) => {
                if (response.status === 200) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }
}

export default new PatchRepository();
