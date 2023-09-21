
import Repository, { baseUrl, baseUrlCustomer, baseUrlProfie } from "./Repository";

class GetRepository {
    async getSellerDashbord(token) {
        const endPoint = `admin/dashboard/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getPopularProducts(token) {
        const endPoint = `admin/popular-product/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getPopularProductsView(id, token) {
        const endPoint = `admin/popular-product/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getShops(page, token) {
        const endPoint = `admin/seller-list/?page=${page}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getShopsProducts(page, category, dataValStatus, date, id,arxiv, token) {
        const endPoint = `admin/product-list/${
            id ? id + '/' : ''
        }?page=${page}&category=${category || ''}&start_date=${
            date || ''
        }&status=${dataValStatus || ''}&arxiv=${arxiv || ""}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getMyProducts(page, category, tagItems, date,status, token) {
        const endPoint = `product-list/?page=${page}&category=${
            category || ''
        }${tagItems ? `&tag=${tagItems}` : ``}&start_date=${date || ''}&status=${status || ''}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getMyProductsView(id, token) {
        const endPoint = `product-list/${id}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getCategory(page, token) {
        const endPoint = `admin/category-list/?page=${page}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getCategoryLists(token) {
        const endPoint = `admin/category-list/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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

    async getCategoryParentLists(token) {
        const endPoint = `admin/category-parent/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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


    async getOrdersLists(page, status, date, token) {
        const endPoint = `admin/order-list/?page=${page}&status=${
            status || ''
        }&start_date=${date || ''}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getOrdersListsDashbord(page, token) {
        const endPoint = `admin/order-list/?page=${page}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getUsersLists(page, status, token) {
        const endPoint = `admin/customer-list/?page=${page}&status=${status}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getChartLists(token) {
        const endPoint = `AdminMonthlySales/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getBannerLists(token) {
        const endPoint = `admin/banner/`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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
    async getProfile(token) {
        const endPoint ="auth/profile/"
        const reponse = await Repository({
            url:baseUrlProfie+endPoint,
            method: 'GET',
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
    async getProfileAriza(page ,token) {
        const endPoint = `application-list/?page=${page}`
        const reponse = await Repository({
            url:baseUrl + endPoint,
            method: 'GET',
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
    async getProfileArizaCardLists(token) {
        const endPoint = `seller-card-list`
        const reponse = await Repository({
            url:baseUrl + endPoint,
            method: 'GET',
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
    async getProfileArizaAdmin(page ,status , token) {
        const endPoint = `admin/application/?page=${page}&status=${status ? status : ""}`
        const reponse = await Repository({
            url:baseUrl + endPoint,
            method: 'GET',
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
   
}

export default new GetRepository();
