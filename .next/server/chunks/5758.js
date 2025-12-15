"use strict";
exports.id = 5758;
exports.ids = [5758];
exports.modules = {

/***/ 7534:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Repository__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3608);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_Repository__WEBPACK_IMPORTED_MODULE_0__]);
_Repository__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

class ProductRepository {
    async getRecords() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/category-list/`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getRecordsSearch() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/documents/`).then((response)=>{
            return response.data.results;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getTagData() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/tag/`).then((response)=>{
            return response.data.results;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getWishlistData() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/wishlist/`).then((response)=>{
            return response.data.results;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async WishlistDataDelete(id) {
        const select = localStorage.getItem("token");
        const reponse = await (0,_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
            url: `${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/wishlist/${id}/`,
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${select}`
            }
        }).then((response)=>{
            return response;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getFilderProduct(page, chaildID, parentID, min, max, approved_count, tartib, price, mashhur) {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/documents/?page=${page || ""}&id=&category=${chaildID || ""}&created_at=&category_parent_slug=${parentID || ""}&min_price=${min || ""}&max_price=${max || ""}&min_id=&max_id=&order_by_approved_count=${approved_count || ""}&order_by_id=${tartib || ""}&order_by_price=${price || ""}&approved_count=${mashhur || ""}`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getFilderPrice(page, chaildID, parentID, min, max, approved_count, tartib, price, mashhur) {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/documents/?page=${page || ""}&id=&category=${chaildID || ""}&created_at=&category_parent_slug=${parentID || ""}&min_price=${min || ""}&max_price=${max || ""}&min_id=&max_id=&order_by_approved_count=${approved_count || ""}&order_by_id=${tartib || ""}&order_by_price=${price || ""}&approved_count=${mashhur || ""}`).then((response)=>{
            return response;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getSearchProduct(page, chaildID, parentID, min, max, approved_count, tartib, price, mashhur, search) {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/documents/?page=${page || ""}&id=&category=${chaildID || ""}&created_at=&category_parent_slug=${parentID || ""}&min_price=${min || ""}&max_price=${max || ""}&min_id=&max_id=&order_by_approved_count=${approved_count || ""}&order_by_id=${tartib || ""}&order_by_price=${price || ""}&approved_count=${mashhur || ""}&search=${search || ""}`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getCardData() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/data/`).then((response)=>{
            return response.data.results;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getBrands() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}/brands`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getProductCategories() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}/product-categories`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getTotalRecords() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/category-list/`).then((response)=>{
            return response.data.results;
        }).catch((error)=>({
                error: JSON.stringify(error)
            })).finally(false);
        return reponse;
    }
    async getCategoryParent() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/parent-category-list/`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            })).finally(false);
        return reponse;
    }
    async getTopCategories() {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/top-categories/`).then((response)=>{
            return response.data.results;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async postCartData(arr) {
        if (arr?.length > 0) {
            const reponse = await (0,_Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .ZP)({
                method: "POST",
                url: `${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/documents-list/`,
                data: {
                    documents: arr
                }
            }).then((response)=>{
                return response;
            }).catch((error)=>({
                    error: JSON.stringify(error)
                }));
            return reponse;
        }
    }
    async getProductsById(pid) {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/documents/${pid}/`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getProductSimilarSlug(pid) {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/similar/${pid}/`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getProductImagesSlug(pid) {
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(`${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/promotional-sliders/${pid}`).then((response)=>{
            return response.data;
        }).catch((error)=>({
                error: JSON.stringify(error)
            }));
        return reponse;
    }
    async getSellerProduct(payload) {
        const endPoint = `${_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH}customer/documents/?id=&category=&created_at=&category__parent=&seller__phone=&seller__email=&seller__id=${payload}12&min_price=&max_price=&min_id=&max_id=&order_by_id=&order_by_price=&approved_count=`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(endPoint).then((response)=>{
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        }).catch((error)=>{
            return null;
        });
        return reponse;
    }
    async getChaildCategory(payload) {
        const endPoint = `customer/get-child-category/${payload}`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response.data.data;
            } else {
                return null;
            }
        }).catch((error)=>{
            return null;
        });
        return reponse;
    }
    async getMoreTopCategorys() {
        const endPoint = `customer/four-child`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        }).catch((error)=>{
            return null;
        });
        return reponse;
    }
    async getSellerProductSlug(slug, page) {
        const endPoint = `customer/documents/?seller__id=${slug}&page=${page}`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response;
            } else {
                return null;
            }
        }).catch((error)=>{
            return error.response;
        });
        return reponse;
    }
    async getSellerProductSlugProducts(slug, page, type, search) {
        const endPoint = `customer/seller-documents/${slug}/?page=${page}&type=${type}&search=${search || ""}`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response;
            } else {
                return null;
            }
        }).catch((error)=>{
            return error.response;
        });
        return reponse;
    }
    async getSellerProfileSlug(slug) {
        const endPoint = `customer/top-sellers/${slug}`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response;
            } else {
                return null;
            }
        }).catch((error)=>{
            return error.response;
        });
        return reponse;
    }
    async getSellerProductNameSlug(slug) {
        const endPoint = `customer/seller-counts/${slug}/`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response;
            } else {
                return null;
            }
        }).catch((error)=>{
            return error.response;
        });
        return reponse;
    }
    async getOrderPercentage() {
        const endPoint = `seller/get-customer-percentage/`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response;
            } else {
                return null;
            }
        }).catch((error)=>{
            return error.response;
        });
        return reponse;
    }
    async getCustomerProducts(type, page, page_size = 48, slug) {
        const endPoint = `customer/products/?type=${type}&category=${slug}&page=${page}&page_size=${page_size}`;
        const reponse = await _Repository__WEBPACK_IMPORTED_MODULE_0__/* ["default"].get */ .ZP.get(_Repository__WEBPACK_IMPORTED_MODULE_0__/* .baseUrl */ .FH + endPoint).then((response)=>{
            if (response.data) {
                return response.data;
            } else {
                return null;
            }
        }).catch((error)=>{
            return error.response;
        });
        return reponse;
    }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new ProductRepository());

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5758:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useCart)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7534);
/* harmony import */ var _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2160);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__]);
([_repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function useCart() {
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();
    const cartItems = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state.ecomerce.cartDataItems);
    return {
        setAllCartItem: async ()=>{
            const data = JSON.parse(localStorage.getItem("cart"));
            if (data?.length > 0) {
                const resp = await _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__/* ["default"].postCartData */ .Z.postCartData(data);
                if (resp?.data) {
                    dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setCartDataItems */ .x9)(resp.data.data));
                }
            }
        },
        setCartOneItem: async (newItem)=>{
            const resp = await _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__/* ["default"].postCartData */ .Z.postCartData([
                newItem
            ]);
            if (resp?.data) {
                if (cartItems.every((el)=>el.id !== newItem)) {
                    dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setCartItemDataItems */ .PF)(resp.data.data));
                }
            }
        },
        removeCartOneItem: (newItem)=>{
            const filtered = cartItems.filter((el)=>el.id !== newItem);
            dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setCartDataItems */ .x9)(filtered));
        },
        removeAll: ()=>{
            dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setCartDataItems */ .x9)([]));
        },
        removeItems: ()=>{}
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=5758.js.map