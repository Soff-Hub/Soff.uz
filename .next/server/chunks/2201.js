"use strict";
exports.id = 2201;
exports.ids = [2201];
exports.modules = {

/***/ 3532:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ DefaultVideoContent)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6603);




function DefaultVideoContent({ product , isPlay , setIsPlay , type  }) {
    const url = product?.document?.file_url;
    const poster = product?.poster_url || product?.poster;
    const hasPoster = !!poster;
    const hasVideo = !!url;
    const { isMobile , isTablet , isDesktop  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const player = document.getElementById(`videoPlayer-${product?.id}`);
        if (player) {
            if (isPlay === product?.id) {
                player.play();
            } else {
                player.pause();
            }
        }
    }, [
        isPlay,
        product
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "video_iframe",
        style: {
            backgroundSize: "cover",
            borderRadius: "5px",
            backgroundImage: hasPoster ? `url("${poster}")` : "none",
            backgroundColor: hasPoster ? "transparent" : "#111",
            minHeight: isMobile ? "100px" : isTablet ? "350px" : "450px",
            maxHeight: isMobile ? "100px" : isTablet ? "350px" : "450px",
            overflow: "hidden",
            position: "relative",
            width: "100%",
            height: "100%"
        },
        children: [
            hasVideo ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("video", {
                id: `videoPlayer-${product?.id}`,
                onContextMenu: (e)=>e.preventDefault(),
                controls: false,
                controlsList: "nodownload",
                preload: "none",
                style: {
                    maxHeight: "450px",
                    height: "100%",
                    width: "100%",
                    position: "relative",
                    zIndex: 1,
                    pointerEvents: "none",
                    backgroundColor: hasPoster ? "transparent" : "#000"
                },
                poster: poster,
                src: url
            }) : null,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    zIndex: 3,
                    color: "white",
                    display: hasVideo ? "none" : "block"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_2__.LockOutlined, {
                    style: {
                        fontSize: "48px",
                        color: "white"
                    }
                })
            })
        ]
    });
}


/***/ }),

/***/ 2201:
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
/* harmony import */ var _details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9409);
/* harmony import */ var _details_actions_description__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8104);
/* harmony import */ var _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8195);
/* harmony import */ var _default_video__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3532);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__, _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__]);
([_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__, _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function VideosProductsDetails({ product , isPlay , setIsPlay  }) {
    const type = "playlists";
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "seller_container_products_details_videos",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "ps-container p-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-product--detail_seller_videos",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                style: {
                                    fontWeight: 600,
                                    fontSize: "25px",
                                    lineHeight: "37.5px",
                                    color: "#312F30",
                                    margin: 0
                                },
                                children: product?.title
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "m-0 fs-3",
                                children: product?.category?.name
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-product__header_seller_videos ",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "video_container product-short-view",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_default_video__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                        product: product,
                                        isPlay: isPlay,
                                        setIsPlay: setIsPlay
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "views",
                                        children: [
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fa-solid fa-eye"
                                            }),
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: product?.view_count || 0
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "title_support",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__.InfoCircleOutlined, {
                                                className: "fs-2 ",
                                                style: {
                                                    cursor: "pointer"
                                                }
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                children: "Mualliflik huquqi buzilgan holatda"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {
                                                href: `/report/${product.slug}`,
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("strong", {
                                                        className: "text-success",
                                                        style: {
                                                            cursor: "pointer"
                                                        },
                                                        children: "shikoyat qiling!"
                                                    })
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .ZP, {
                                product: product
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-product__header_seller_secound_videos",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_description__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                description: product?.description
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "w-100 gap-5 d-flex flex-column",
                                style: {
                                    maxWidth: "550px"
                                },
                                children: [
                                    type !== "playlists" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_description__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                        description: product?.description
                                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {}),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                        product: product
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (VideosProductsDetails);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=2201.js.map