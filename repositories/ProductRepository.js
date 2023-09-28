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
        // const select = useSelector(state => state.auth.user?.access)
        const select = localStorage.getItem('token');
        // console.log('select', select);

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

   
    async getFilderProduct(page, chaildID, parentID, min, max, approved_count, tartib, price, mashhur) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?page=${page || ''}&id=&category=${chaildID || ''}&created_at=&category__parent=${parentID || ''}&min_price=${min || ''}&max_price=${max || ''}&min_id=&max_id=&order_by_approved_count=${approved_count || ''}&order_by_id=${tartib || ''}&order_by_price=${price || ''}&approved_count=${mashhur || ''}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    
    async getFilderPrice(page, chaildID, parentID, min, max, approved_count, tartib, price, mashhur) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?page=${page || ''}&id=&category=${chaildID || ''}&created_at=&category__parent=${parentID || ''}&min_price=${min || ''}&max_price=${max || ''}&min_id=&max_id=&order_by_approved_count=${approved_count || ''}&order_by_id=${tartib || ''}&order_by_price=${price || ''}&approved_count=${mashhur || ''}`
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }
    async getDefaultPrice() {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/`
        )
            .then((response) => {
                return response;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

   
    async getSearchProduct(page, chaildID, parentID, min, max, approved_count, tartib, price, mashhur, search) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?page=${page || ''}&id=&category=${chaildID || ''}&created_at=&category__parent=${parentID || ''}&min_price=${min || ''}&max_price=${max || ''}&min_id=&max_id=&order_by_approved_count=${approved_count || ''}&order_by_id=${tartib || ''}&order_by_price=${price || ''}&approved_count=${mashhur || ''}&search=${search || ''}`

        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }



    async getFilterPagination(payload) {
        const reponse = await Repository.get(
            `${baseUrl}customer/documents/?page=${payload}`
        )
            .then((response) => {
                return response.data;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getCardData() {
        const reponse = await Repository.get(`${baseUrl}customer/data/`)
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }));
        return reponse;
    }

    async getProducts(params) {
        const reponse = await Repository.get(
            `${baseUrl}/products?${serializeQuery(params)}`
        )
            .then((response) => {
                if (response.data && response.data.length > 0) {
                    return response.data;
                } else {
                    return null;
                }
            })

            .catch((error) => {
                // console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }

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
            `${baseUrl}customer/category-list`
        )
            .then((response) => {
                return response.data.results;
            })
            .catch((error) => ({ error: JSON.stringify(error) }))
            .finally(false)
        return reponse;
    }


    async getTopCategories() {
        const reponse = await Repository.get(
            `${baseUrl}customer/top-categories/`
        )
            .then((response) => {
                // console.log(response.data.results);
                return response.data.results;
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

    async getProductsByCategory(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/product-categories?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByBrand(payload) {
        const reponse = await Repository.get(
            `${baseUrl}/brands?slug=${payload}`
        )
            .then((response) => {
                if (response.data) {
                    if (response.data.length > 0) {
                        return response.data[0];
                    }
                } else {
                    return null;
                }
            })
            .catch(() => {
                return null;
            });
        return reponse;
    }

    async getProductsByIds(payload) {
        const endPoint = `${baseUrl}customer/documents/${payload}`;
        const reponse = await Repository.get(endPoint)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                // console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }
    async getSellerProduct(payload) {
        const endPoint = `${baseUrl}customer/documents/?seller__id=${payload}`;
        const reponse = await Repository.get(endPoint)
            .then((response) => {
                if (response.data) {
                    return response.data;
                } else {
                    return null;
                }
            })
            .catch((error) => {
                // console.log(JSON.stringify(error));
                return null;
            });
        return reponse;
    }


}

export default new ProductRepository();
