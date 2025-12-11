"use strict";
exports.id = 5917;
exports.ids = [5917];
exports.modules = {

/***/ 6086:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _image_lightbox__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3491);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_image_lightbox__WEBPACK_IMPORTED_MODULE_5__]);
_image_lightbox__WEBPACK_IMPORTED_MODULE_5__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];






function FileImagesScroll({ product  }) {
    const containerRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const buttonsRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const fullscreenButtonRef = (0,react__WEBPACK_IMPORTED_MODULE_2__.useRef)(null);
    const { 0: isScrolledDown , 1: setIsScrolledDown  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: canScrollUp , 1: setCanScrollUp  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    const { 0: canScrollDown , 1: setCanScrollDown  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(false);
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useLayoutEffect)(()=>{
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollTop = scrollContainer.scrollHeight;
            scrollContainer.scrollTo({
                top: 0
            });
            const updateButtonPosition = ()=>{
                if (!scrollContainer) return;
                const rect = scrollContainer.getBoundingClientRect();
                const scrollTop = scrollContainer.scrollTop;
                const scrollHeight = scrollContainer.scrollHeight;
                const clientHeight = scrollContainer.clientHeight;
                // Calculate center position of visible container area
                const containerTop = rect.top;
                const containerHeight = rect.height;
                const centerY = containerTop + containerHeight / 2;
                // Update scroll buttons position
                if (buttonsRef.current) {
                    buttonsRef.current.style.top = `${centerY}px`;
                    buttonsRef.current.style.right = `${window.innerWidth - rect.right + 16}px`;
                }
                // Update fullscreen button position
                if (fullscreenButtonRef.current) {
                    fullscreenButtonRef.current.style.top = `${rect.top + 10}px`;
                    fullscreenButtonRef.current.style.right = `${window.innerWidth - rect.right + 10}px`;
                }
                // More precise check for top - account for small rounding differences
                const isAtTop = scrollTop <= 5;
                // More precise check for bottom - account for small rounding differences
                const isAtBottom = scrollTop + clientHeight >= scrollHeight - 5;
                const scrolledDown = scrollTop > 0;
                const canUp = !isAtTop && scrollTop > 0;
                const canDown = !isAtBottom && scrollTop < scrollHeight - clientHeight;
                setIsScrolledDown(scrolledDown);
                setCanScrollUp(canUp);
                setCanScrollDown(canDown);
            };
            const handleScroll = ()=>{
                updateButtonPosition();
            };
            const handleResize = ()=>{
                updateButtonPosition();
            };
            const handleWindowScroll = ()=>{
                updateButtonPosition();
            };
            // Initial check with a small delay to ensure DOM is ready
            const initTimeout = setTimeout(()=>{
                updateButtonPosition();
            }, 100);
            scrollContainer.addEventListener("scroll", handleScroll);
            window.addEventListener("resize", handleResize);
            window.addEventListener("scroll", handleWindowScroll);
            return ()=>{
                clearTimeout(initTimeout);
                scrollContainer.removeEventListener("scroll", handleScroll);
                window.removeEventListener("resize", handleResize);
                window.removeEventListener("scroll", handleWindowScroll);
            };
        }
    }, [
        product?.document?.images
    ]);
    const onClickUp = ()=>{
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollBy({
                top: -200,
                behavior: "smooth"
            });
        }
    };
    const onClickDown = ()=>{
        const scrollContainer = containerRef.current;
        if (scrollContainer) {
            scrollContainer.scrollBy({
                top: 200,
                behavior: "smooth"
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("style", {
                children: `
                .scroll-buttons {
                    position: fixed;
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                    z-index: 100;
                    transform: translateY(-50%);
                }
                .scroll-button {
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.7);
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
                    opacity: 0.6;
                }
                .scroll-button:hover {
                    background: rgba(255, 255, 255, 1);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    transform: scale(1.05);
                    opacity: 1;
                }
                .scroll-button:active {
                    transform: scale(0.95);
                }
                .scroll-button:disabled {
                    opacity: 0.3;
                    cursor: not-allowed;
                    pointer-events: none;
                }
            `
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "ps-product__thumbnail_seller product-short-view",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("figure", {
                    className: "figuree",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "ps-wrapper_seller product-poster ",
                            ref: containerRef,
                            style: {
                                paddingBottom: 0,
                                marginBottom: 0,
                                position: "relative"
                            },
                            children: [
                                product?.document?.images?.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    ref: fullscreenButtonRef,
                                    style: {
                                        position: "fixed",
                                        zIndex: 100
                                    },
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_image_lightbox__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                        gallery: product.document.images
                                    })
                                }),
                                product?.document?.images?.length > 0 ? product?.document?.images?.map((item, i)=>(item?.image_url || item?.thumbUrl || item?.url) && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                        src: item?.image_url || item?.thumbUrl || item?.url || "https://placehold.co/600x400",
                                        width: 785,
                                        height: 614,
                                        alt: "sellerImage",
                                        className: ` seller_image_conatiner`,
                                        objectFit: "contain",
                                        style: {
                                            flexShrink: 0,
                                            objectFit: "contain"
                                        }
                                    }, i)) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                                    src: "https://placehold.co/600x400",
                                    width: 1000,
                                    height: 614,
                                    alt: "sellerImage",
                                    className: ` seller_image_conatiner`,
                                    objectFit: "contain"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        position: "absolute",
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        width: "100%",
                                        height: "40px",
                                        background: "linear-gradient(rgba(80, 80, 80, 0.6) 0%, rgba(0, 0, 0, 0) 100%)",
                                        pointerEvents: "none",
                                        transition: "all 0.3s ease",
                                        opacity: canScrollUp ? 1 : 0,
                                        transform: canScrollUp ? "translateY(0)" : "translateY(-100%)",
                                        visibility: canScrollUp ? "visible" : "hidden",
                                        zIndex: 1
                                    }
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        position: "absolute",
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        width: "100%",
                                        height: "40px",
                                        background: "linear-gradient(rgba(0, 0, 0, 0) 0%, rgba(80, 80, 80, 0.6) 100%)",
                                        pointerEvents: "none",
                                        transition: "all 0.3s ease",
                                        opacity: !isScrolledDown && canScrollDown ? 1 : 0,
                                        transform: !isScrolledDown && canScrollDown ? "translateY(0)" : "translateY(100%)",
                                        zIndex: 1
                                    }
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            ref: buttonsRef,
                            className: "scroll-buttons",
                            style: {
                                display: canScrollUp || canScrollDown ? "flex" : "none"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "scroll-button",
                                    onClick: onClickUp,
                                    disabled: !canScrollUp,
                                    "aria-label": "Scroll up",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.UpOutlined, {
                                        style: {
                                            fontSize: "16px",
                                            color: "#333"
                                        }
                                    })
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                    className: "scroll-button",
                                    onClick: onClickDown,
                                    disabled: !canScrollDown,
                                    "aria-label": "Scroll down",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.DownOutlined, {
                                        style: {
                                            fontSize: "16px",
                                            color: "#333"
                                        }
                                    })
                                })
                            ]
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
                                    children: product?.view_count
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "title_support",
                            style: {
                                paddingTop: "50px"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.InfoCircleOutlined, {
                                    className: "fs-2 ",
                                    style: {
                                        cursor: "pointer"
                                    }
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "Mualliflik huquqi buzilgan holatda"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_4___default()), {
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
                })
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileImagesScroll);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5917:
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
/* harmony import */ var _details_actions_file_images_scroll__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6086);
/* harmony import */ var _details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9409);
/* harmony import */ var _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8195);
/* harmony import */ var _details_actions_description__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8104);
/* harmony import */ var _details_actions_tags__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(8750);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _comment_section_commentList__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(8134);
/* harmony import */ var _comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8690);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_details_actions_file_images_scroll__WEBPACK_IMPORTED_MODULE_2__, _details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__, _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__, _comment_section_commentList__WEBPACK_IMPORTED_MODULE_8__, _comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_9__]);
([_details_actions_file_images_scroll__WEBPACK_IMPORTED_MODULE_2__, _details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__, _details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__, _comment_section_commentList__WEBPACK_IMPORTED_MODULE_8__, _comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










function FileProductsDetails({ product  }) {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "seller_container_products_details",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "ps-container p-0",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-product--detail_seller",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                className: "titleh3",
                                children: product?.title || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    className: "invisible-text",
                                    children: "Mahsulot nomi"
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_7___default()), {
                                href: `/scientific-resources/${product?.category?.slug}?childCategory=${product?.category?.slug}`,
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "m-0 fs-3",
                                        children: product?.category?.name || /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            className: "invisible-text",
                                            children: "Kategoriya nomi"
                                        })
                                    })
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "ps-product__header_seller ",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_file_images_scroll__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                product: product
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "seller_products_right_section",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "seller_products_actions_container",
                                    style: {
                                        height: !(product?.tag.length > 0) && "100%"
                                    },
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .ZP, {
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
                        className: "ps-product__header_seller_secound",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_actions_description__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                description: product?.description
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_details_seller_profile_seller_profile__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                product: product
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_comment_section_commentWrapper__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                                id: product.id,
                                slug: product.slug
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_comment_section_commentList__WEBPACK_IMPORTED_MODULE_8__/* .CommentList */ .$, {
                                slug: product.slug
                            })
                        ]
                    })
                ]
            })
        })
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileProductsDetails);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=5917.js.map