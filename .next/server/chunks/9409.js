"use strict";
exports.id = 9409;
exports.ids = [9409];
exports.modules = {

/***/ 9409:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Qv": () => (/* binding */ fileIcons),
/* harmony export */   "UR": () => (/* binding */ fileColors),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ant_design_icons_ShareAltOutlined__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6946);
/* harmony import */ var _ant_design_icons_ShareAltOutlined__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons_ShareAltOutlined__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(1621);
/* harmony import */ var _shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5029);
/* harmony import */ var _shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(5758);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6603);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3701);
/* harmony import */ var _components_AuthModal__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3944);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_5__, _shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_6__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_11__]);
([_shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_5__, _shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_6__, _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__, _components_AuthModal__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const fileColors = {
    ".doc": "#007DFF",
    ".xls": "#509C62",
    ".xlsx": "#509C62",
    ".ppt": "#DC8452",
    ".pdf": "#E22C2F",
    ".avi": "#6EB5E9",
    ".mp3": "#88549E",
    ".html": "#6D96A",
    ".zip": "#E4BD3E",
    ".psd": "#0053BD",
    ".pptx": "#DD7657"
};
const fileIcons = {
    ".doc": "fa-file-word",
    ".xls": "fa-file-excel",
    ".xlsx": "fa-file-excel",
    ".ppt": "fa-file-powerpoint",
    ".pdf": "fa-file-pdf",
    ".avi": "fa-file-video",
    ".mp3": "fa-file-audio",
    ".html": "fa-file-code",
    ".zip": "fa-file-archive",
    ".psd": "fa-file-image",
    ".pptx": "fa-file-powerpoint",
    ".mp4": "fas fa-file-video"
};
function FileActions({ product  }) {
    const { addSavedItem , wishlist , removeSavedItem  } = (0,_shared_hooks_useWishlist__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z)();
    const { 0: open , 1: setOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: authModal , 1: setAuthModal  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const Router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const pid = Router.asPath;
    const { setCartOneItem , removeCartOneItem  } = (0,_shared_hooks_useCart__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)();
    const { 0: basket , 1: setBasket  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const [messageApi, contextHolder] = antd__WEBPACK_IMPORTED_MODULE_2__.message.useMessage();
    const state = (0,react_redux__WEBPACK_IMPORTED_MODULE_8__.useSelector)((state)=>state.auth.user?.access);
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
    // Nusxa olish
    const infoSuccess = (url)=>{
        messageApi.success(`Nusxa ko\'chirildi (${url})`);
    };
    const infoError = (url)=>{
        messageApi.error(`Nusxa ko\'chirilmadi (${url})`);
    };
    const copyVideoUrl = ()=>{
        if (!pid) {
            infoError("Video ID topilmadi.");
            return;
        }
        const videoUrl = `https://soff.uz${pid}`;
        const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(videoUrl)}`;
        window.open(telegramUrl, "_blank");
    };
    //  Hoziroq xarid qilish
    function handleBuynow(e) {
        e.preventDefault();
        setCartOneItem(product.id);
        if (state) {
            Router.push(`/account/checkout?id=${product?.id}`);
        } else {
            // Router.push(`/auth/login?id=${product?.id}`);
            setAuthModal(true);
        }
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            contextHolder,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "seller_products_actions product-price-section",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "d-flex justify-content-between align-items-center",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "price_container",
                                children: product?.discount_price === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                    children: "Bepul"
                                }) : product?.discount === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                    children: [
                                        (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_12__/* .addPeriodToThousands */ .Y)(product?.discount_price || 0),
                                        " ",
                                        "so'm"
                                    ]
                                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "d-flex gap-3",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h2", {
                                            children: [
                                                (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_12__/* .addPeriodToThousands */ .Y)(product?.discount_price || 0),
                                                " ",
                                                "so'm"
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("del", {
                                            children: [
                                                (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_12__/* .addPeriodToThousands */ .Y)(product?.price || 0),
                                                " ",
                                                "so'm"
                                            ]
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "icon_hover text-success",
                                onClick: ()=>copyVideoUrl(),
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((_ant_design_icons_ShareAltOutlined__WEBPACK_IMPORTED_MODULE_4___default()), {
                                    style: {
                                        fontSize: "30px"
                                    }
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                        className: "fs-2 p-0 d-flex flex-column gap-3",
                        style: {
                            listStyle: "none"
                        },
                        children: [
                            product?.sold_count > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-shopping-bag",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Mahsulotni sotilgan soni:"
                                        ]
                                    }),
                                    " ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            product?.sold_count,
                                            " ta"
                                        ]
                                    })
                                ]
                            }),
                            product?.document?.content_duration && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-stopwatch",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Video davomiyligi:"
                                        ]
                                    }),
                                    " ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            " ",
                                            product?.document?.content_duration
                                        ]
                                    })
                                ]
                            }),
                            product?.document?.page_count && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-copy",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Betlar soni:"
                                        ]
                                    }),
                                    " ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            product?.document?.page_count,
                                            " ta"
                                        ]
                                    })
                                ]
                            }),
                            product?.document?.file_size && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            " ",
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-database",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Fayl hajmi :"
                                        ]
                                    }),
                                    " ",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: product?.document?.file_size
                                    })
                                ]
                            }),
                            product?.document?.file_type && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: `fas ${fileIcons[product?.document?.file_type] || "fa-file-archive"}`,
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Fayl turi:"
                                        ]
                                    }),
                                    " ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            color: "white",
                                            padding: "4px 9px",
                                            borderRadius: "4px",
                                            backgroundColor: fileColors[product?.document?.file_type] || "#007DFF"
                                        },
                                        children: [
                                            " ",
                                            product?.document?.file_type
                                        ]
                                    })
                                ]
                            }),
                            product?.three_d_features?.style?.name && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-cube",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Uslub:"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: product.three_d_features.style.name
                                    })
                                ]
                            }),
                            product?.three_d_features?.height_value && product?.three_d_features?.height_unit && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-ruler-vertical",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Balandlik:"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            product.three_d_features.height_value,
                                            " ",
                                            product.three_d_features.height_unit
                                        ]
                                    })
                                ]
                            }),
                            product?.three_d_features?.width_value && product?.three_d_features?.width_unit && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-arrows-alt-h",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Eni:"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            product.three_d_features.width_value,
                                            " ",
                                            product.three_d_features.width_unit
                                        ]
                                    })
                                ]
                            }),
                            product?.three_d_features?.length_value && product?.three_d_features?.length_unit && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-ruler-horizontal",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Uzunlik:"
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            product.three_d_features.length_value,
                                            " ",
                                            product.three_d_features.length_unit
                                        ]
                                    })
                                ]
                            }),
                            product?.three_d_features?.colors?.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-palette",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Rang:"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: product.three_d_features.colors.map((color, idx)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                style: {
                                                    display: "inline-block",
                                                    width: "16px",
                                                    height: "16px",
                                                    backgroundColor: color.exec_code,
                                                    borderRadius: "50%",
                                                    marginRight: "4px"
                                                }
                                            }, idx))
                                    })
                                ]
                            }),
                            product?.three_d_features?.materials?.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-layer-group",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            " ",
                                            "Materiallar:"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: product.three_d_features.materials.map((m)=>m.name).join(", ")
                                    })
                                ]
                            }),
                            product?.three_d_features?.product_form?.icon && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "d-flex align-items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-shapes",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            "Shakl:"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            width: "20px",
                                            src: product.three_d_features.product_form.form_image,
                                            alt: "icon"
                                        })
                                    })
                                ]
                            }),
                            product?.three_d_features?.render_obj?.length > 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "d-flex align-items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-shapes",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            "Render:"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "d-flex gap-2 flex-wrap",
                                        children: product.three_d_features.render_obj.map((r)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                className: "d-flex align-items-center gap-2 px-2 rounded",
                                                style: {
                                                    backgroundColor: r.color || "#f0f0f0"
                                                },
                                                children: [
                                                    r.logo && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: r.logo,
                                                        alt: r.title,
                                                        style: {
                                                            width: 20,
                                                            height: 20,
                                                            objectFit: "contain"
                                                        }
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        children: r.title
                                                    })
                                                ]
                                            }, r.id))
                                    })
                                ]
                            }),
                            product?.three_d_features?.platform && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("li", {
                                className: "w-100 d-flex align-items-center justify-content-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        className: "d-flex align-items-center gap-2",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-cube",
                                                style: {
                                                    color: "#00a44f"
                                                }
                                            }),
                                            "Platforma:"
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: product.three_d_features.platform
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "d-flex flex-column gap-3 ",
                        children: [
                            !product?.document?.file_url ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: " d-flex align-items-center gap-3 justify-content-end",
                                children: [
                                    product?.discount_price !== 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                        onClick: handleAddItemToCart,
                                        iconPosition: "end",
                                        style: {
                                            height: "58px",
                                            fontSize: "20px"
                                        },
                                        type: "text",
                                        variant: "solid",
                                        className: "w-100 border-2 border-success text-success button_hover",
                                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.ShoppingCartOutlined, {}),
                                        size: "large",
                                        children: "Savatga qo’shish"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                        iconPosition: "end",
                                        onClick: handleAddItemToWishlist,
                                        style: {
                                            height: "58px",
                                            width: "80px",
                                            fontSize: "28px"
                                        },
                                        type: "text",
                                        variant: "solid",
                                        className: "border-2 border-success text-success button_hover",
                                        icon: wishlist?.some((item)=>Number(item.id) === Number(product?.id)) ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-heart"
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-regular fa-heart "
                                        }),
                                        size: "large"
                                    })
                                ]
                            }) : null,
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(CustomResponsiveLayout, {
                                handleBuynow: handleBuynow,
                                product: product
                            })
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
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
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_AuthModal__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                open: authModal,
                onClose: ()=>setAuthModal(false),
                onGoogleSuccessNavigateTo: "/account/checkout",
                onSuccess: ()=>{
                    Router.push("/account/checkout");
                }
            })
        ]
    });
}
const CustomResponsiveLayout = ({ product , handleBuynow  })=>{
    const { isMobile , size  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)();
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `d-flex flex-column gap-3 ${isMobile ? "sticky-bottom-btn" : ""}`,
                children: product?.document?.file_url ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: product?.document?.file_url,
                    target: "_blank",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        iconPosition: "end",
                        style: {
                            height: "58px",
                            fontSize: "20px"
                        },
                        type: "primary",
                        className: "w-100 bg-success",
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.DownloadOutlined, {}),
                        size: "large",
                        children: "Yuklab olish"
                    })
                }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    onClick: (e)=>handleBuynow(e),
                    iconPosition: "end",
                    style: {
                        height: "58px",
                        fontSize: "20px"
                    },
                    type: "primary",
                    className: "w-100 bg-success truncate-text text-truncate",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.DownloadOutlined, {}),
                    size: "large",
                    children: [
                        "Hoziroq xarid qilish (",
                        (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__/* .formatCurrencyWithSpace */ .O$)(product?.price),
                        " so'm)"
                    ]
                })
            }),
            isMobile && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: `d-flex flex-column gap-3 `,
                children: product?.document?.file_url ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: product?.document?.file_url,
                    target: "_blank",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        iconPosition: "end",
                        style: {
                            height: "58px",
                            fontSize: "20px"
                        },
                        type: "primary",
                        className: "w-100 bg-success",
                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.DownloadOutlined, {}),
                        size: "large",
                        children: "Yuklab olish"
                    })
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                    onClick: (e)=>handleBuynow(e),
                    iconPosition: "end",
                    style: {
                        height: "58px",
                        fontSize: "20px"
                    },
                    type: "primary",
                    className: "w-100 bg-success",
                    icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.DownloadOutlined, {}),
                    size: "large",
                    children: `Hoziroq xarid qilish ${size >= 360 ? `(${(0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_10__/* .formatCurrencyWithSpace */ .O$)(product?.price)} so'm)` : ""}`
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FileActions);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1621:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Y": () => (/* binding */ addPeriodToThousands)
/* harmony export */ });
function addPeriodToThousands(number) {
    const numStr = String(number);
    const [integerPart, decimalPart] = numStr.split(".");
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    const formattedNumber = decimalPart !== undefined ? `${formattedIntegerPart}.${decimalPart}` : formattedIntegerPart;
    return formattedNumber;
}


/***/ })

};
;
//# sourceMappingURL=9409.js.map