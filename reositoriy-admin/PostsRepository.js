import Repository, { baseUrl, baseUrlProfie } from './Repository';

class PostRepository {
    async PostsCategory(data, token) {
        const endPoint = `admin/category-list/`;
        const response = await Repository.post(
            baseUrl + endPoint,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        )
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
    async PostsUsers(data, token) {
        const endPoint = `admin/customer-list/`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
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
        return response;
    }
    async PostsMyProducts(data, token) {
        const endPoint = `product-create/`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }

    async PostsMyProductsAriza(data, token) {
        const endPoint = `application/`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
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
            .catch((error) => (error.response.data));
        return response;
    }
    async TaxminiyNarxOlish(data, token) {
        const endPoint = `recommend-price/`;
        const response = await Repository({
            url: baseUrl + endPoint,
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
            .then((response) => {
                if (response?.data) {
                    return response?.data;
                } else {
                    return null;
                }
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return response;
    }
    
     CardPostsCredit(data, token) {
        const endPoint ="seller-card-create"
        const response = Repository({
            url:baseUrl+endPoint,
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => (error.response));
        return response;
    }

    async  ChangePassword(data, token) {
        const endPoint ="auth/change-password/"
        const response = await Repository({
            url:baseUrlProfie+endPoint,
            method: 'POST',
            headers: {
                'Authorization' : `Bearer ${token}`
            },
            data:data
        })
            .then((response) => {
                if (response) {
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => (error.response));
        return response;
    }



   
}

export default new PostRepository();
