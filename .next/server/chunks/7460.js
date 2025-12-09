;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="62cc5763-defb-4031-8cca-9b1a2acd6f72",e._sentryDebugIdIdentifier="sentry-dbid-62cc5763-defb-4031-8cca-9b1a2acd6f72");})();}catch(e){}};
exports.id = 7460;
exports.ids = [7460];
exports.modules = {

/***/ 1489:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "style_card__pDxMy",
	"cardBody": "style_cardBody__r283C",
	"cardTitle": "style_cardTitle___M5TX",
	"price": "style_price__wbqM5",
	"btns": "style_btns__bZV_F",
	"secondaryBtn": "style_secondaryBtn__YGQPN",
	"primaryBtn": "style_primaryBtn__xB22n",
	"divider": "style_divider__p1zx0",
	"footer": "style_footer__a4usN",
	"userImg": "style_userImg__Lo8IX",
	"username": "style_username___HyEF"
};


/***/ }),

/***/ 7460:
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
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1489);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9075);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_AuthModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2789);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_9__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_5__]);
([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











// Helper function to validate slug
const isValidSlug = (slug)=>{
    return slug && typeof slug === "string" && slug.trim().length > 0 && slug !== "undefined" && slug !== "null";
};
const ServiceCard = ({ service , hasFooter =true  })=>{
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useSelector)((state)=>state.auth);
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const handleOrder = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!isValidSlug(service?.slug)) {
            console.error("Invalid service slug for order:", service?.slug);
            return;
        }
        if (isLoggedIn) {
            push(`/service/${service.slug}?paymodal=open`);
        } else {
            setOpen(true);
        }
    }, [
        isLoggedIn,
        push,
        service?.slug
    ]);
    const handleViewDetails = (0,react__WEBPACK_IMPORTED_MODULE_1__.useCallback)(()=>{
        if (!isValidSlug(service?.slug)) {
            console.error("Invalid service slug for details:", service?.slug);
            return;
        }
        push(`/service/${service.slug}`);
    }, [
        service?.slug
    ]);
    // Don't render if service or slug is invalid
    if (!service || !isValidSlug(service?.slug)) {
        console.warn("ServiceCard: Invalid service data or slug", service);
        return null;
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().card),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().cardBody),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                href: `/service/${service.slug}`,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().cardTitle),
                                        children: service?.title
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "d-flex justify-content-between align-items-center",
                                children: [
                                    service?.avg_rating !== 0 && service?.avg_rating ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "d-flex gap-2 align-items-center",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_7__.StarFilled, {
                                                style: {
                                                    fontSize: "16px",
                                                    color: "#faad14"
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                style: {
                                                    fontSize: "16px",
                                                    color: "#faad14"
                                                },
                                                children: Number(service?.avg_rating).toFixed(1)
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                children: [
                                                    "(",
                                                    service?.feedback_count,
                                                    " izoh)"
                                                ]
                                            })
                                        ]
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {}),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().price),
                                        children: [
                                            (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__/* .formatCurrencyWithSpace */ .O$)(service?.price),
                                            " so'm"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().btns),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Button, {
                                        type: "default",
                                        onClick: handleViewDetails,
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().secondaryBtn),
                                        children: "Batafsil"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_8__.Button, {
                                        type: "primary",
                                        onClick: handleOrder,
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().primaryBtn),
                                        children: "Buyurtma berish"
                                    })
                                ]
                            })
                        ]
                    }),
                    hasFooter && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().divider)
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().footer),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                        href: `/seller/${service?.user?.soff_seller_id}`,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                style: {
                                                    width: "30px",
                                                    height: "30px",
                                                    position: "relative",
                                                    overflow: "hidden",
                                                    borderRadius: "50%",
                                                    flexShrink: 0
                                                },
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_9___default()), {
                                                    src: service?.user?.photo_url || "/static/img/ozodbek.png",
                                                    alt: "user_img",
                                                    width: 30,
                                                    height: 30,
                                                    objectFit: "cover",
                                                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().userImg),
                                                    loading: "lazy"
                                                })
                                            })
                                        })
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                                        href: `/seller/${service?.user?.soff_seller_id}`,
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_10___default().username),
                                            children: service?.user?.full_name
                                        })
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AuthModal__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                slug: service?.slug,
                open: open,
                onClose: ()=>setOpen(false)
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default().memo(ServiceCard));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=7460.js.map