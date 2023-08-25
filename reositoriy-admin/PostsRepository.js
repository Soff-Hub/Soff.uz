import Repository, { baseUrl } from "./Repository";

class PostRepository {
    async PostsCategory(data) {
        const endPoint = `admin/category-list/`;
        const reponse = await Repository.post(baseUrl+endPoint, data)
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
    async PostsUsers(data) {
        const endPoint = `admin/customer-list/`;
        const reponse = await Repository.post(baseUrl+endPoint, data)
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
    async PostsMyProducts(data) {
        const endPoint = `product-create/`;
        const reponse = await Repository.post(baseUrl+endPoint, data)
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
    async PostsBanner(data) {
        const endPoint = `admin/banner-create/`;
        const reponse = await Repository.post(baseUrl+endPoint, data)
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


export default new PostRepository();
