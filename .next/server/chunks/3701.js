"use strict";
exports.id = 3701;
exports.ids = [3701];
exports.modules = {

/***/ 3701:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O$": () => (/* binding */ formatCurrencyWithSpace),
/* harmony export */   "xG": () => (/* binding */ formatCurrency)
/* harmony export */ });
/* unused harmony exports getColletionBySlug, getItemBySlug, convertSlugsQueryString, StrapiProductPriceExpanded, StrapiProductThumbnail */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3608);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_repositories_Repository__WEBPACK_IMPORTED_MODULE_2__]);
_repositories_Repository__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




function formatCurrency(num) {
    if (num !== undefined) {
        return parseFloat(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {}
}
function formatCurrencyWithSpace(num) {
    if (num !== undefined) {
        return parseFloat(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ");
    } else {}
}
function getColletionBySlug(collections, slug) {
    if (collections.length > 0) {
        const result = collections.find((item)=>item.slug === slug.toString());
        if (result !== undefined) {
            return result.products;
        } else {
            return [];
        }
    } else {
        return [];
    }
}
function getItemBySlug(banners, slug) {
    if (banners.length > 0) {
        const banner = banners.find((item)=>item.slug === slug.toString());
        if (banner !== undefined) {
            return banner;
        } else {
            return null;
        }
    } else {
        return null;
    }
}
function convertSlugsQueryString(payload) {
    let query = "";
    if (payload.length > 0) {
        payload.forEach((item)=>{
            if (query === "") {
                query = `slug_in=${item}`;
            } else {
                query = query + `&slug_in=${item}`;
            }
        });
    }
    return query;
}
function StrapiProductPriceExpanded(product) {
    let view;
    if (product.is_sale === true) {
        view = /*#__PURE__*/ _jsxs("p", {
            className: "ps-product__price sale",
            children: [
                "$",
                formatCurrency(product.price),
                /*#__PURE__*/ _jsxs("del", {
                    className: "ms-2",
                    children: [
                        "$",
                        formatCurrency(product.sale_price)
                    ]
                }),
                /*#__PURE__*/ _jsx("small", {
                    children: "18% off"
                })
            ]
        });
    } else {
        view = /*#__PURE__*/ _jsxs("p", {
            className: "ps-product__price",
            children: [
                "$",
                formatCurrency(product.price)
            ]
        });
    }
    return view;
}
function StrapiProductThumbnail(product) {
    let view;
    if (product.thumbnail) {
        view = /*#__PURE__*/ _jsx(Link, {
            href: "/product/[pid]",
            as: `/product/${product.slug}`,
            children: /*#__PURE__*/ _jsx("a", {
                children: /*#__PURE__*/ _jsx("img", {
                    src: `${baseUrl}${product.thumbnail.url}`,
                    alt: product.title,
                    loading: "lazy"
                })
            })
        });
    } else {
        view = /*#__PURE__*/ _jsx(Link, {
            href: "/product/[pid]",
            as: `/product/${product.slug}`,
            children: /*#__PURE__*/ _jsx("a", {
                children: /*#__PURE__*/ _jsx("img", {
                    src: "/static/img/not-found.png",
                    alt: "soff",
                    loading: "lazy"
                })
            })
        });
    }
    return view;
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=3701.js.map