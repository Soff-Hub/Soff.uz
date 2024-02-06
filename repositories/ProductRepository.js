import Repository, { baseUrl, serializeQuery } from './Repository';

class ProductRepository {
    async getRecords() {
        const reponse = await Repository.get(
            `${baseUrl}customer/category-list/`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getRecordsSearch() {
        const reponse = await Repository.get(`${baseUrl}customer/documents/`)
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getTagData() {
        const reponse = await Repository.get(`${baseUrl}customer/tag/`)
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getWishlistData() {
        const reponse = await Repository.get(`${baseUrl}customer/wishlist/`)
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async WishlistDataDelete(id) {
        const select = localStorage.getItem('token');

        const reponse = await Repository({
            url: `${baseUrl}customer/wishlist/${id}/`,
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${select}`,
            },
        })
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getFilderProduct(
        page,
        chaildID,
        parentID,
        min,
        max,
        approved_count,
        tartib,
        price,
        mashhur
    ) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?page=${page || ''}&id=&category=${
                chaildID || ''
            }&created_at=&category_parent_slug=${parentID || ''}&min_price=${
                min || ''
            }&max_price=${max || ''}&min_id=&max_id=&order_by_approved_count=${
                approved_count || ''
            }&order_by_id=${tartib || ''}&order_by_price=${
                price || ''
            }&approved_count=${mashhur || ''}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getFilderPrice(
        page,
        chaildID,
        parentID,
        min,
        max,
        approved_count,
        tartib,
        price,
        mashhur
    ) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?page=${page || ''}&id=&category=${
                chaildID || ''
            }&created_at=&category_parent_slug=${parentID || ''}&min_price=${
                min || ''
            }&max_price=${max || ''}&min_id=&max_id=&order_by_approved_count=${
                approved_count || ''
            }&order_by_id=${tartib || ''}&order_by_price=${
                price || ''
            }&approved_count=${mashhur || ''}`
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getSearchProduct(
        page,
        chaildID,
        parentID,
        min,
        max,
        approved_count,
        tartib,
        price,
        mashhur,
        search
    ) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?page=${page || ''}&id=&category=${
                chaildID || ''
            }&created_at=&category_parent_slug=${parentID || ''}&min_price=${
                min || ''
            }&max_price=${max || ''}&min_id=&max_id=&order_by_approved_count=${
                approved_count || ''
            }&order_by_id=${tartib || ''}&order_by_price=${
                price || ''
            }&approved_count=${mashhur || ''}&search=${search || ''}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    // async getFilterPagination(payload) {
    //     const reponse = await Repository.get(
    //         `${baseUrl}customer/documents/?page=${payload}`
    //     )
    //         .then((response) => {
    //             return response.data;
    //         })
    //         .catch((error) => ({ error: JSON.stringify(error) }));
    //     return reponse;
    // }

    async getCardData() {
        const reponse = await Repository.get(`${baseUrl}customer/data/`)
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    // async getProducts(params) {
    //     const reponse = await Repository.get(
    //         `${baseUrl}/products?${serializeQuery(params)}`
    //     )
    //         .then((response) => {
    //             if (response.data && response.data.length > 0) {
    //                 return response.data;
    //             } else {
    //                 return null;
    //             }
    //         })

    //         .catch((error) => {
    //             return null;
    //         });
    //     return reponse;
    // }

    async getBrands() {
        const reponse = await Repository.get(`${baseUrl}/brands`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductCategories() {
        const reponse = await Repository.get(`${baseUrl}/product-categories`)
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getTotalRecords() {
        const reponse = await Repository.get(
            `${baseUrl}customer/category-list/`
        )
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
            .finally(false);
        return reponse;
    }
    async getCategoryParent() {
        const reponse = await Repository.get(
            `${baseUrl}customer/parent-category-list/`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
            .finally(false);
        return reponse;
    }

    async getTopCategories() {
        const reponse = await Repository.get(
            `${baseUrl}customer/top-categories/`
        )
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async postCartData(arr) {
        const reponse = await Repository({
            method: 'POST',
            url: `${baseUrl}customer/documents-list/`,
            data: {
                documents: arr,
            },
        })
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductsById(pid) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/${pid}/`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getProductSimilarSlug(pid) {
        const reponse = await Repository.get(
            `${baseUrl}customer/similar/${pid}/`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProductFileSlug(pid, token) {
        const reponse = await Repository({
            url: baseUrl + `customer/get-file-url/${pid}`,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                return response.data
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getProductImagesSlug(pid) {
        const reponse = await Repository.get(
            `${baseUrl}customer/promotional-sliders/${pid}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }


    async getSellerProduct(payload) {
        const endPoint = `${baseUrl}customer/documents/?id=&category=&created_at=&category__parent=&seller__phone=&seller__email=&seller__id=${payload}12&min_price=&max_price=&min_id=&max_id=&order_by_id=&order_by_price=&approved_count=`;
        const reponse = await Repository.get(endPoint)
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
    async getChaildCategory(payload) {
        const endPoint = `customer/get-child-category/${payload}`
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.data) {
                    return response.data.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                return null;
            });
        return reponse;
    }
    async getMoreTopCategorys() {
        const endPoint = `customer/four-child`
        const reponse = await Repository.get(baseUrl+endPoint)
            .then((response) => {
                if (response.data) {
                    return response.data
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

export default new ProductRepository();
