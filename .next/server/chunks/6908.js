exports.id = 6908;
exports.ids = [6908];
exports.modules = {

/***/ 1219:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "style_card__UDKnl",
	"cardHead": "style_cardHead__8VrJM",
	"cardHeadInfo": "style_cardHeadInfo__Ldk07",
	"cardType": "style_cardType__2CBie",
	"cardActions": "style_cardActions__OOT2V",
	"likeIcon": "style_likeIcon__JDtwp",
	"cartIcon": "style_cartIcon__o3K5l",
	"cardImg": "style_cardImg___I4QZ",
	"cardBody": "style_cardBody___p_cj",
	"cardTitle": "style_cardTitle__28yks",
	"cardPrice": "style_cardPrice__dTqL_",
	"cardInfo": "style_cardInfo__bcava"
};


/***/ }),

/***/ 1169:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1219);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5029);
/* harmony import */ var _shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5758);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3701);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_3__, _shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_4__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_6__]);
([_shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_3__, _shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_4__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const ProductCard = ({ product  })=>{
    const { addSavedItem , wishlist , removeSavedItem  } = (0,_shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const Router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const { setCartOneItem , removeCartOneItem  } = (0,_shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const { 0: basket , 1: setBasket  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const handleNavigate = ()=>{
        Router.push(`/product/${product?.slug}`);
    };
    function handleAddItemToCart(e) {
        showModal();
        e.preventDefault();
        if (basket) {
            removeCartOneItem(product.id);
        } else {
            setCartOneItem(product.id);
        }
        setBasket((prev)=>!prev);
    }
    function handleAddItemToWishlist(e) {
        e.preventDefault();
        addSavedItem(product.id);
        if (wishlist?.find((item)=>item.id === product?.id)) {
            removeSavedItem(product.id);
        }
    }
    const showModal = ()=>{
        setOpen(true);
    };
    const hideModal = ()=>{
        setOpen(false);
    };
    const hideModalOk = ()=>{
        setOpen(false);
        Router.push("/account/shopping-cart");
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {
                href: `/product/${product?.slug}`,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().card),
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardHead),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardHeadInfo),
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardType),
                                            children: product?.document?.file_type || ".zip"
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardActions),
                                            children: [
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    onClick: handleAddItemToWishlist,
                                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().likeIcon),
                                                    children: wishlist?.some((item)=>Number(item.id) === Number(product?.id)) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        style: {
                                                            color: "#00a44f"
                                                        },
                                                        className: "fa-solid fa-heart"
                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "fa-regular fa-heart"
                                                    })
                                                }),
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                    onClick: handleAddItemToCart,
                                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cartIcon),
                                                    children: basket ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        style: {
                                                            color: "#00a44f"
                                                        },
                                                        className: "fa-solid fa-cart-shopping"
                                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "fa-solid fa-cart-shopping"
                                                    })
                                                })
                                            ]
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardImg),
                                    src: product?.poster_url || "/static/img/no-document.png",
                                    alt: "card img"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardBody),
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                    onClick: handleNavigate,
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardTitle),
                                    children: product?.title
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardPrice),
                                    children: product?.price === 0 || !product?.price ? "Bepul" : `${(0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_6__/* .formatCurrencyWithSpace */ .O$)(product?.price)} so’m`
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().cardInfo),
                            children: [
                                product?.document?.file_size && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex gap-1",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/static/img/card_icons/driver.svg",
                                            alt: "icon"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: product?.document?.file_size
                                        })
                                    ]
                                }),
                                product?.document?.page_count && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex gap-1",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/static/img/card_icons/document-copy.svg",
                                            alt: "icon"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: product?.document?.page_count
                                        })
                                    ]
                                }),
                                product?.views_count !== 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex gap-1",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/static/img/card_icons/eye.svg",
                                            alt: "icon"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: product?.views_count
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_5__.Modal, {
                title: "Muvaffaqqiyatli",
                open: open,
                onOk: hideModalOk,
                onCancel: hideModal,
                cancelButtonProps: {
                    style: {
                        color: "#000"
                    }
                },
                okButtonProps: {
                    style: {
                        color: "#fff"
                    }
                },
                okText: "Savatga o'tish",
                cancelText: "Xaridlarni davom etirish",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        children: "Mahsulotingizni savatga qo'shdingiz!"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {})
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(ProductCard));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4705:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _PageLayout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2315);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_PageLayout__WEBPACK_IMPORTED_MODULE_2__]);
_PageLayout__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];



const PageContainer = ({ children , title , withFooter  } = {})=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_PageLayout__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        title: title,
        withFooter: withFooter,
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageContainer);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=6908.js.map