"use strict";
exports.id = 5758;
exports.ids = [5758];
exports.modules = {

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