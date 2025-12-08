"use strict";
exports.id = 5177;
exports.ids = [5177];
exports.modules = {

/***/ 5177:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useWishlist)
/* harmony export */ });
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3328);
/* harmony import */ var _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7260);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__]);
([_repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__, _store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);



function useWishlist() {
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useDispatch)();
    const { ecomerce  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_0__.useSelector)((state)=>state);
    const wishlist = ecomerce?.wishlist || [];
    const cartItems = ecomerce?.cartDataItems || [];
    return {
        wishlist,
        setAllSaved: async ()=>{
            const data = JSON.parse(localStorage.getItem("wishlist"));
            if (data?.length > 0) {
                const resp = await _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__/* ["default"].postCartData */ .Z.postCartData(data);
                if (resp?.data) {
                    dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setSaved */ .Ih)(resp.data.data));
                }
            }
        },
        addSavedItem: async (newItem)=>{
            const resp = await _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_1__/* ["default"].postCartData */ .Z.postCartData([
                newItem
            ]);
            if (resp?.data) {
                if (wishlist.every((el)=>el.id !== newItem)) {
                    dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setSavedItem */ .I0)(resp.data.data));
                }
            }
        },
        isSavedItem: (itemId)=>{
            return cartItems.some((el)=>el.id === itemId);
        },
        removeSavedItem: (newItem)=>{
            const filtered = wishlist.filter((el)=>el.id !== newItem);
            dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setSaved */ .Ih)(filtered));
        },
        removeAllSaved: ()=>{
            dispatch((0,_store_ecomerce_slice__WEBPACK_IMPORTED_MODULE_2__/* .setSaved */ .Ih)([]));
        }
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;