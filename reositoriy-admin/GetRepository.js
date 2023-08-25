import Repository, { baseUrl, baseUrlUsers } from "./Repository";

class GetRepository {
    
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
    async getShopsProducts(page, category, dataValStatus, date, id) {
        const endPoint =  `admin/product-list/${id ? id + "/" : ""}?page=${page}&category=${category || ''}&start_date=${date || ""}&status=${dataValStatus || ''}`
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
        const endPoint = `product-list/?page=${page}`;
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
    async getMyProductsView( id) {
        const endPoint = `product-list/${id}`;
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
    async getUsersLists(page) {
        const endPoint = `admin/customer-list/?page=${page}`;
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
    async getChartLists() {
        const endPoint = `SellerMonthlySales/`;
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
