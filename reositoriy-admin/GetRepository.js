import Repository, {
    baseUrl,
    baseUrlCustomer,
    baseUrlProfie,
    orginalApi,
    orginalUrl,
} from './Repository';

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

    async getSellerDashbordBirja(token) {
        const endPoint = `auctions/auction-dashboard/`;
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

    async getSellerDashbordYearch(token, id) {
        const endPoint = `get-dates/?seller=${id || ''}`;
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

    async getSellerDashbordDonat(token) {
        const endPoint = `admin/donates/`;
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

    async getPopularPlayLists(page, token) {
        const endPoint = `sold-plyalists/?page=${page}`;
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

    async getPopularPlayListsApproved(page, token) {
        const endPoint = `purchased-plyalists/?page=${page}`;
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
    async getShops(page, search, lock, token) {
        const endPoint = `admin/seller-list/?page=${page}&search=${
            search || ''
        }&lock=${lock || ''}`;

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

    async getShopsListsEval(id, page, search, status, token) {
        const endPoint = `auctions/doc_sale_applications/${
            id ? id + '/' : ''
        }?page=${page}&search=${search || ''}&status=${status}`;

        const reponse = await orginalApi({
            url: orginalUrl + endPoint,
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

    async getSellingLists(search, token) {
        const endPoint = `auctions/assesment-docs/?search=${search || ''}`;

        const reponse = await orginalApi({
            url: orginalUrl + endPoint,
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

    async getEvaluation(slug, token) {
        const endPoint = `assesment/${slug}`;

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
        offset,
        limit,
        page,
        category,
        dataValStatus,
        date,
        id,
        search,
        document__content_type,
        playlist,
        viewsAll,
        token
    ) {
        const endPoint = `admin/product-list/${
            id ? id + '/' : ''
        }?page=${page}&category=${category || ''}&date_range_after=${
            date || ''
        }&status=${dataValStatus || ''}&search=${
            search || ''
        }&document__content_type=${document__content_type || ''}&playlist=${
            playlist || ''
        }&sort=${viewsAll || ''}&offset=${offset || ''}&limit=${limit || ''}`;

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

    async getShopsProductsAdmin(id, token) {
        const endPoint = `admin/product-list/${id ? id + '/' : ''}`;

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

    async getShopsProductsAdminDetails(id, token) {
        const endPoint = `admin/product-list/${id ? id + '/' : ''}`;

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

    async getMyProducts(
        page,
        category,
        tagItems,
        date,
        status,
        search,
        document__content_type,
        viewsAll,
        playlist,
        token,
        mnPrice,
        mxPrice
    ) {
        const endPoint = `product-list/?page=${page}&category=${
            category || ''
        }${tagItems ? `&tag=${tagItems}` : ``}&date_range_after=${
            date || ''
        }&status=${status || ''}&search=${search}&document__content_type=${
            document__content_type || ''
        }&sort=${viewsAll || ''}&playlist=${
            playlist || ''
        }&discount_price_before=${
            mxPrice || ''
        }&discount_price_after=${mnPrice || ''}`;

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
    async getVideoSize(token) {
        const endPoint = `storage/`;
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
    async getTrafficListData(token) {
        const endPoint = `traffics/`;
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

    async getDealListData(token) {
        const endPoint = `deals/deal-coins/`;
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

    async getCategory(page, search, id, token) {
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

    async getCategoryStatic(id, token) {
        const endPoint = `auctions/doc_sale_applications/stat/${id}/`;
        const reponse = await Repository({
            url: orginalUrl + endPoint,
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

    async getCategoryParentList(search, id, token) {
        const endPoint = `admin/parent-category-list/${
            id ? id + '/' : ''
        }?search=${search || ''}`;
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
    async getCategoryChaildItem(id, token, search) {
        const endPoint = `admin/childen-list/${
            id ? id + '/' : ''
        }?search=${search}`;
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

    async getAllCategoryListsGlobal(search) {
        const endPoint = `admin/global-childern/?search=${search || ''}`;
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

    async getAllCategoryLists(search) {
        const endPoint = `admin/category-children/file/?search=${search || ''}`;
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
    async getItemsPlayLists(token) {
        const endPoint = `playlist/`;

        const reponse = await Repository.get(`${baseUrl}${endPoint}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
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

    async getAllCategoryListsAudio(search) {
        const endPoint = `admin/category-children/audio/?search=${
            search || ''
        }`;
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
    async getAllCategoryListsDesign(search) {
        const endPoint = `admin/category-children/template/?search=${
            search || ''
        }`;
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

    async getAllCategoryListsVideo(search) {
        const endPoint = `admin/category-children/video/?search=${
            search || ''
        }`;
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

    async getOrdersLists(page, status, date, search, token, userRole) {
        const endPoint = `admin/order/?page=${page}&status=${
            status || ''
        }&start_date=${date || ''}&search=${search}&user__role=${userRole}`;
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

    async getOrdersListsDashbordBirja(page, token) {
        const endPoint = `auctions/doc_exchange_sellers/?page=${page}`;
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

    async getOrdersDealLists(
        page,
        search,
        start_date,
        end_date,
        type,
        min_price,
        max_price,
        id,
        token
    ) {
        const endPoint = `deals/${id ? id + '/' : ''}?page=${page}&search=${
            search || ''
        }&start_date=${start_date || ''}&end_date=${end_date || ''}&type=${
            type || ''
        }&min_price=${min_price || ''}&max_price=${max_price || ''}`;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'GET',
            headers: {
                Authorization: token ? `Bearer ${token} ` : '',
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

    async getOrdersApplicationsLists(page, search, id, status, token) {
        const endPoint = `deals/deal-applications/${
            id ? id + '/' : ''
        }?page=${page}&search=${search || ''}&status=${status || ''}`;
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

    async getOrdersApplicationsListsUpdates(id, token) {
        const endPoint = `deals/deal-applications/${id ? id + '/' : ''}`;
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

    async getOrdersMYDealLists(page, search, id, status, token) {
        const endPoint = `deals/my-deals/${
            id ? id + '/' : ''
        }?page=${page}&search=${search || ''}&status=${status || ''}`;
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
            .catch((error) => error?.response);
        return reponse;
    }

    async getOrdersMYDealListsUpdate(id, token) {
        const endPoint = `deals/my-deals/${id ? id + '/' : ''}`;
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

    async getOrdersMYDealListsUpdateUserDataDeals(id, page) {
        const endPoint = `deals/deal-applicant-applications/${id}?page=${page}`;
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

    async getOrdersMYDealListsUpdateUserData(id) {
        const endPoint = `deals/deal-applicant-profile/${id}`;
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

    async getApplicationsReceived(page, status, deal, token) {
        const endPoint = `deals/my-deals-applications/?page=${page}&status=${
            status || ''
        }&deal=${deal || ''}`;
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
            .catch((error) => error?.response);
        return reponse;
    }

    async getOrdersProgressBar(token) {
        const endPoint = `deals/deal-coin/`;
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

    async getSellerCommitListsFilter(id, page, count) {
        const endPoint = `seller/document-reviews/${id}?offset=0&limit=${page}&replied_to=${
            count || ''
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

    async getAllUserLists(token, search) {
        const endPoint = `all-user/`;
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
    async getNotificationList(p) {
        const endPoint = `admin/notification-list?page=${p}`;
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

    async getSellerLists(id, token) {
        const endPoint = `admin/seller-detail/${id}`;

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

    async getCustomerLists(id, token) {
        const endPoint = `customer-info/${id}`;
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

    async getSellerDashboard(id, token) {
        const endPoint = `admin/seller-dashboard/${id}`;
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
    }
    z;
    async getTagTaklifLists(page, date, token, isAdmin) {
        const endPoint = isAdmin
            ? `admin/offer-list/?page=${page}&start_date=${date || ''}`
            : `offer-list/?page=${page}&start_date=${date || ''}`;
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

    async getTagListsDeaktiv(token, search) {
        const endPoint = `deactive-tags/?search=${search || ''}`;
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
    async getChartLists(token, year, month, role) {
        const api = role === 'seller' ? 'chart' : 'admin/chart';
        const endPoint = month
            ? `${api}/?year=${year}&month=${month}`
            : `${api}/?year=${year}`;
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

    async getChartListsSeller(token, year, month, id) {
        const endPoint = month
            ? `admin/chart/${id}/?year=${year}&month=${month}`
            : `admin/chart/${id}/?year=${year}`;
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
            .catch((error) => error?.response);
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

    async getImageGenaration(id, token) {
        const endPoint = `seller/admin/set-poster/${id}/`;
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

    async getProfileToken(token) {
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
                    return response;
                } else {
                    return null;
                }
            })
            .catch((error) => error.response);
        return reponse;
    }

    async getProfileAriza(page, token, isAdmin) {
        const endPoint = isAdmin
            ? `admin/application/?page=${page}`
            : `application-list/?page=${page}`;
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

    async getProfileArizaAdmin(page, status, token, isAdmin, search) {
        const endPoint = isAdmin
            ? `admin/application/?page=${page}&status=${
                  status ? status : ''
              }&search=${search ? search : ''}`
            : `application-list/?page=${page}&status=${status ? status : ''}`;
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

    async getProfileArizaTaklif(page, token) {
        const endPoint = `seller/offer-list/?page=${page} `;
        const reponse = await Repository({
            url: baseUrlCustomer + endPoint,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token} `,
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

    async getPMSellers(page, search, token) {
        const endPoint = `admin/premium-user/?page=${page}&search=${
            search || ''
        } `;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token} `,
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

    async getPMSellerDetail(id, token) {
        const endPoint = `admin / premium - user / ${id} `;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token} `,
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

    async updatePMSellerDetail(id, data, token) {
        const endPoint = `admin / premium - user / ${id} `;
        const reponse = await Repository({
            url: baseUrl + endPoint,
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token} `,
            },
            data,
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

    async getDonateList(token) {
        const endPoint = `donates/`;
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
    async getDealList(page, token) {
        const endPoint = `deals/owner-admin/?page=${page}`;
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
    async getDealItems(id, token) {
        const endPoint = `deals/admin/deals/${id}/`;
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
    async getDealType(search) {
        const endPoint = `deals/deal-types/?search=${search || ''}`;
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

    async getDealTypePriceRange() {
        const endPoint = `deals/price-range/`;
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

    async getDeadline(token) {
        const endPoint = `deals/deadlines/`;
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

    async getDeadProfle(token) {
        const endPoint = `deals/deal-profile/`;
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
}

export default new GetRepository();
