import Repository, {
    baseUrl,
    baseUrlCustomer,
    baseUrlProfie,
} from './Repository';


class GetRepository {
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
            .catch((error) => (error?.response));
        return reponse;
    }

    async getSellerCommitListsFilter(id, page, count) {
        const endPoint = `seller/document-reviews/${id}?offset=0&limit=${page}&replied_to=${count || ''
            }`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
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

    async getSellerCommitLists(id, page, token) {
        const endPoint = `seller/document-reviews/${id}?offset=0&limit=${page}`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'GET',
            headers: {
                Authorization: token ? `Bearer ${token}` : '',
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

    async getNotificationData(token) {
        const endPoint = `user-notification/`;
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

    async getProfileBlock(token) {
        const endPoint = 'seller/has-spam/';
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
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

    async getCategoryData(slug) {
        const reponse = await Repository.get(`${baseUrl}${slug}`)
            .then((response) => {
                if (response.data) {
                    return response
                } else {
                    return null;
                }
                return response.data;
            })
            .catch((error) => {
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
                return null;
            });
        return reponse;
    }


}

export default new GetRepository();