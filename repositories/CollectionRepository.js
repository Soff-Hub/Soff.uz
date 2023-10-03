import Repository, { baseUrl } from './Repository';

class CollectionRepository {

    async getCategoryData(slug) {
        const reponse = await Repository.get(`${baseUrl}${slug}` )
            .then((response) => {
                if (response.data ) {
                    return response
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
    async getCategoryDataCount(slug) {
        const reponse = await Repository.get(`${baseUrl}${slug}` )
            .then((response) => {
                if (response.data ) {
                    return response.data.results
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }


    async getProductsByCollectionSlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/collections?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

    async getProductsByCategorySlug(slug) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug_in=${slug}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return { items: response.data[0].products };
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

  
}

export default new CollectionRepository();
