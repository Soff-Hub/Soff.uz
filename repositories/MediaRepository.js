import Repository, { baseUrl } from './Repository';

class MediaRespository {
    async getBannersBySlug(payload) {
        const endPoint = `customer/banner/`;
        const reponse = await Repository.get(`${baseUrl}${endPoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data.results;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }
    async getTagItmes() {
        const endPoint = `customer/tag/`;

        const reponse = await Repository.get(`${baseUrl}${endPoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }
    async getTagItmesAktive(search) {
        const endPoint = `seller/tags-for-product-create/?search=${search || ''}`;

        const reponse = await Repository.get(`${baseUrl}${endPoint}`)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }
}

export default new MediaRespository();
