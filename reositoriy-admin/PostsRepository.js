import Repository, { baseUrl } from './Repository';

class PostRepository {
    async PostsCategory(data, token) {
        const endPoint = `admin/category-list/`;
        const reponse = await Repository.post(
            baseUrl + endPoint,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            data
        )
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
    async PostsUsers(data, token) {
        const endPoint = `admin/customer-list/`;
        const reponse = await Repository.post(
            baseUrl + endPoint,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
            data
        )
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
    async PostsMyProducts(data, token) {
        const endPoint = `product-create/`;
        const reponse = await Repository({
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
        return reponse;
    }
    async PostsMyProductsAriza(data, token) {
        const endPoint = `application/`;
        const reponse = await Repository({
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
        return reponse;
    }
    



   
}

export default new PostRepository();
