"use strict";
exports.id = 6230;
exports.ids = [6230];
exports.modules = {

/***/ 6230:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(414);
/* harmony import */ var _details_actions_description__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5584);
/* harmony import */ var _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6108);
/* harmony import */ var _details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9260);
/* harmony import */ var _details_actions_tags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7931);
/* harmony import */ var _comment_section_commentList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6156);
/* harmony import */ var _comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7466);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__, _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__, _details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_5__, _comment_section_commentList__WEBPACK_IMPORTED_MODULE_7__, _comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_8__]);
([_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__, _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__, _details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_5__, _comment_section_commentList__WEBPACK_IMPORTED_MODULE_7__, _comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









function ThreeDesignProductsDetails({ product , template  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "seller_container_products_details_three_design",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "ps-container p-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-product--detail_seller_three_design",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "titleh3",
                                style: {
                                    fontWeight: 600,
                                    fontSize: "25px",
                                    lineHeight: "37.5px",
                                    color: "#312F30",
                                    margin: 0
                                },
                                children: product?.title
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                className: "m-0 fs-3 title_cat",
                                children: product?.category?.name
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-product__header_seller_three_design ",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_imageScroll__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                slug: product?.slug,
                                demo_link: product?.demo_link,
                                images: product?.document?.images,
                                views: product?.view_count
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "seller_products_right_section ",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "seller_products_actions_container m-auto",
                                    style: {
                                        height: "auto"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP, {
                                            product: product
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_tags__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                                            tag: product?.tag
                                        })
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-product__header_seller_secound_three_design",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_description__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                description: product?.description
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                product: product
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                                id: product.id,
                                slug: product.slug
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_comment_section_commentList__WEBPACK_IMPORTED_MODULE_7__/* .CommentList */ .$, {
                                slug: product.slug
                            })
                        ]
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ThreeDesignProductsDetails);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;