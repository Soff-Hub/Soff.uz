"use strict";
exports.id = 8909;
exports.ids = [8909];
exports.modules = {

/***/ 8909:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Lk": () => (/* binding */ formatExpiryDate),
/* harmony export */   "fu": () => (/* binding */ calculateAmount),
/* harmony export */   "mf": () => (/* binding */ formatCreditCardNumber)
/* harmony export */ });
/* unused harmony exports getCartItemsFromCookies, updateCartToCookies, addItemToCartHelper, removeCartItemHelper */
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6734);
/* harmony import */ var js_cookie__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(js_cookie__WEBPACK_IMPORTED_MODULE_0__);

function getCartItemsFromCookies() {
    const cartItems = cookies.get("cart");
    if (cartItems) {
        return JSON.parse(cartItems);
    } else {
        return null;
    }
}
function updateCartToCookies(payload) {
    cookies.set("cart", payload, {
        path: "/",
        expires: 24 * 7
    });
}
function addItemToCartHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        cart?.items.push(product);
    } else {
        cart = {
            items: []
        };
        cart.items.push(product);
    }
    updateCartToCookies(cart);
    return cart;
}
function removeCartItemHelper(product) {
    let cart;
    let cookieCart = getCartItemsFromCookies();
    if (cookieCart) {
        cart = cookieCart;
        const index = cart.items.findIndex((item)=>item.id === product.id);
        cart.items.splice(index, 1);
        updateCartToCookies(cart);
        return cart;
    }
}
function calculateAmount(obj) {
    return Object.values(obj).reduce((acc, item)=>{
        if (!item) return acc;
        const price = item.discount_price ?? item.price ?? 0;
        return acc + Number(price);
    }, 0);
}
function formatCreditCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/\s/g, "");
    var formattedNumber = "";
    for(var i = 0; i < cardNumber.length; i++){
        if (i > 0 && i % 4 === 0) {
            formattedNumber += " "; // probel qo'shish
        }
        formattedNumber += cardNumber[i];
    }
    return formattedNumber;
}
function formatExpiryDate(expiryDate) {
    var dateRegex = /^(0[1-9]|1[0-2])(\d{2})$/;
    if (!dateRegex.test(expiryDate)) {
        return expiryDate;
    }
    return expiryDate.replace(/^(\d{2})(\d{2})$/, "$1/$2");
}


/***/ })

};
;
//# sourceMappingURL=8909.js.map