exports.id = 1272;
exports.ids = [1272];
exports.modules = {

/***/ 372:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "style_card__vOR3S",
	"rankImageWrapper": "style_rankImageWrapper__0AbGQ",
	"header": "style_header__uJ4KJ",
	"avatar": "style_avatar__3k07O",
	"info": "style_info__g0_TG",
	"name": "style_name__EOJ1C",
	"position": "style_position__WnOzH",
	"extraInfo": "style_extraInfo__ri_91",
	"lastActive": "style_lastActive__heuc3",
	"location": "style_location__fu6QV",
	"ratingBox": "style_ratingBox__f6kRi",
	"reviewCount": "style_reviewCount__OE9kE",
	"btn": "style_btn__kBXQn",
	"badge": "style_badge__rqjVR",
	"rate": "style_rate__8Cnwv",
	"icon": "style_icon__lMxb5",
	"iconSmall": "style_iconSmall__Machw"
};


/***/ }),

/***/ 1272:
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
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1301);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7333);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(372);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1185);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_fa__WEBPACK_IMPORTED_MODULE_3__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_4__, react_icons_io5__WEBPACK_IMPORTED_MODULE_6__]);
([react_icons_fa__WEBPACK_IMPORTED_MODULE_3__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_4__, react_icons_io5__WEBPACK_IMPORTED_MODULE_6__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const formatLastActive = (lastActive)=>{
    if (!lastActive) return "Noma’lum";
    const last = new Date(lastActive);
    if (isNaN(last.getTime())) return lastActive;
    const now = new Date();
    const diffMinutes = Math.floor((now - last) / 1000 / 60);
    if (diffMinutes < 1) return "Hozir faol";
    if (diffMinutes < 60) return `${diffMinutes} daqiqa oldin faol edi`;
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} soat oldin faol edi`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} kun oldin faol edi`;
};
const SearchSellerCard = ({ seller , rankImage  })=>{
    const isOnline = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!seller?.last_active) return false;
        const lastActiveTime = new Date(seller.last_active);
        const now = new Date();
        const diffMinutes = (now - lastActiveTime) / 1000 / 60;
        return diffMinutes <= 5;
    }, [
        seller?.last_active
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().card),
        children: [
            rankImage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().rankImageWrapper),
                children: rankImage
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().header),
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                        dot: true,
                        color: isOnline ? "green" : "gray",
                        offset: [
                            -20,
                            90
                        ],
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().badge),
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_5___default()), {
                            src: seller?.photo_url || "/static/img/ozodbek.png",
                            alt: seller?.full_name || "Seller",
                            width: 100,
                            height: 100,
                            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().avatar)
                        })
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().info),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().name),
                                children: seller?.full_name
                            }),
                            seller?.average_rating > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().ratingBox),
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_3__.FaStar, {
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().rate)
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().ratingValue),
                                        children: seller?.average_rating
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().reviewCount),
                                        children: [
                                            "(",
                                            seller?.total_feedbacks_count,
                                            " ta izoh)"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().position),
                                children: seller?.position?.title || "Kasb ko‘rsatilmagan"
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().extraInfo),
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().lastActive),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_6__.IoTimeOutline, {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().iconSmall)
                            }),
                            " ",
                            formatLastActive(seller?.last_active)
                        ]
                    }),
                    seller?.location && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().location),
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_6__.IoLocationOutline, {
                                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().iconSmall)
                            }),
                            " ",
                            seller?.location || "Joylashuv ko‘rsatilmagan"
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {
                href: `/seller/${seller?.soff_seller_id}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        type: "primary",
                        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_8___default().btn),
                        children: [
                            "Batafsil ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa6__WEBPACK_IMPORTED_MODULE_4__.FaArrowRightLong, {})
                        ]
                    })
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (/*#__PURE__*/(0,react__WEBPACK_IMPORTED_MODULE_1__.memo)(SearchSellerCard));

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;