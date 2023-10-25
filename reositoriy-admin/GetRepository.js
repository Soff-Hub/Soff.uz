import Repository, { baseUrl, baseUrlProfie } from './Repository';

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
    async getShops(page, search, token) {
        const endPoint = `admin/seller-list/?page=${page}&search=${
            search || ''
        }`;
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
    async getShopsProducts(
        page,
        category,
        dataValStatus,
        date,
        id,
        arxiv,
        search,
        token
    ) {
        const endPoint = `admin/product-list/${
            id ? id + '/' : ''
        }?page=${page}&category=${category || ''}&start_date=${
            date || ''
        }&status=${dataValStatus || ''}&arxiv=${arxiv || ''}&search=${
            search || ''
        }`;

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
    async getMyProducts(page, category, tagItems, date, status, search, token) {
        const endPoint = `product-list/?page=${page}&category=${
            category || ''
        }${tagItems ? `&tag=${tagItems}` : ``}&start_date=${
            date || ''
        }&status=${status || ''}&search=${search}`;

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
    async getMyProductsSeller(page, category, date, search, token) {
        const endPoint = `approved-product/?page=${page}&category=${
            category || ''
        }&start_date=${date || ''}&search=${search}`;
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
    async getCategory(page, search,id, token) {
        const endPoint = `admin/category-list/${
            id ? id + '/' : ''
        }?page=${page}&search=${search || ''}`;
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
    async getAllCategoryLists(search) {
        const endPoint = `admin/category-children/?search=${search || ''}`;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
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

    async getOrdersLists(page, status, date, search, token) {
        const endPoint = `admin/order-list/?page=${page}&status=${
            status || ''
        }&start_date=${date || ''}&search=${search}`;
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
    async getUsersLists(page, status, search, token) {
        const endPoint = `admin/customer-list/?page=${page}&auth_status=${status}&search=${
            search || ''
        }`;
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
    async getTagLists(page, search, active, token) {
        const endPoint = `admin/tag-list/?page=${page}&search=${
            search || ''
        }&active=${active}`;
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
    }z
    async getTagTaklifLists(page,  token) {
        const endPoint = `admin/offer-list/?page=${page}`;
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

    async getTagListsDeaktiv(token) {
        const endPoint = `deactive-tags/`;
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
        const endPoint = 'auth/profile/';
        const reponse = await Repository({
            url: baseUrlProfie + endPoint,
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
    async getProfileAriza(page, token) {
        const endPoint = `application-list/?page=${page}`;
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
    async getProfileArizaCardLists(token) {
        const endPoint = `seller-card-list`;
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
    async getProfileArizaAdmin(page, status, token) {
        const endPoint = `admin/application/?page=${page}&status=${
            status ? status : ''
        }`;
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
}

export default new GetRepository();
