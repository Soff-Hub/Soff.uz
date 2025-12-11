"use strict";
(() => {
var exports = {};
exports.id = 6634;
exports.ids = [6634];
exports.modules = {

/***/ 8777:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var _sentry_server_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5780);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_elements_BreadCrumb__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2920);
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4705);
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3608);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6985);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(7534);
/* harmony import */ var _components_partials_seller_SellerProducts__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(4947);
/* harmony import */ var _components_partials_seller_SellerDonateForm__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7592);
/* harmony import */ var _components_partials_account_DateFormatter__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8664);
/* harmony import */ var _components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(1621);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6603);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_6__, _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_10__, _components_partials_seller_SellerProducts__WEBPACK_IMPORTED_MODULE_11__, _components_partials_seller_SellerDonateForm__WEBPACK_IMPORTED_MODULE_12__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_6__, _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_10__, _components_partials_seller_SellerProducts__WEBPACK_IMPORTED_MODULE_11__, _components_partials_seller_SellerDonateForm__WEBPACK_IMPORTED_MODULE_12__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);

















const SellerPage = ({ seller , sellerr  })=>{
    const { size  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_14__/* ["default"] */ .Z)();
    const isSmallScreen = size <= 430;
    const { 0: data , 1: setData  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(seller);
    const { 0: page , 1: setPage  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(1);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_9__.useRouter)();
    if (!router.isReady) return null;
    const { pid  } = router.query;
    const { 0: isModalOpen , 1: setIsModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: isModalOpenDonate , 1: setIsModalOpenDonate  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const { 0: tab , 1: setTab  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("tab-1");
    const { 0: typeSelect , 1: setTypeSelect  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("file");
    const { 0: search , 1: setSearch  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const { 0: productType , 1: setProductType  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(null);
    const { 0: dateTime , 1: setDateTime  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const showModal = ()=>{
        setIsModalOpen(true);
    };
    const handleOk = ()=>{
        setIsModalOpen(false);
    };
    const handleOkDonate = ()=>{
        setIsModalOpenDonate(false);
    };
    const handleCancel = ()=>{
        setIsModalOpen(false);
    };
    const handleCancelDonate = ()=>{
        setIsModalOpenDonate(false);
    };
    const getSellerProduct = async (slug)=>{
        const respons = await _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_10__/* ["default"].getSellerProductSlugProducts */ .Z.getSellerProductSlugProducts(slug, page, typeSelect, search);
        if (respons) {
            setData(respons.data);
        }
    };
    const getSellerDocumentType = async (slug)=>{
        const respons = await _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_10__/* ["default"].getSellerProductNameSlug */ .Z.getSellerProductNameSlug(slug);
        if (respons?.status === 200) {
            setProductType(respons?.data);
        }
    };
    const handlePagination = async (e)=>{
        setPage(e);
        const respons = await _repositories_ProductRepository__WEBPACK_IMPORTED_MODULE_10__/* ["default"].getSellerProductSlugProducts */ .Z.getSellerProductSlugProducts(pid, e, typeSelect, search);
        if (respons) {
            setData(respons.data);
        }
    };
    const breadCrumb = [
        {
            text: "Asosiy sahifa",
            url: "/"
        },
        {
            text: sellerr?.seller?.full_name ? sellerr?.seller?.full_name : "Loading..."
        }, 
    ];
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (pid) {
            getSellerDocumentType(pid);
        }
    }, [
        pid
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (pid) {
            getSellerProduct(pid);
        }
    }, [
        pid,
        typeSelect,
        search
    ]);
    function checkIfUserIsOnline(lastVisit) {
        const currentTime = new Date();
        const lastVisitTime = new Date(lastVisit);
        const fiveMinutesAgo = new Date(currentTime.getTime() - lastVisitTime?.getTime());
        if (300000 >= fiveMinutesAgo) {
            return setDateTime(true);
        } else {
            return setDateTime(false);
        }
    }
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        checkIfUserIsOnline(sellerr?.seller?.last_login);
    }, [
        sellerr?.seller?.last_login
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_elements_BreadCrumb__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                breacrumb: breadCrumb,
                layout: "fullwidth"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                title: `${sellerr?.seller?.full_name}  `,
                description: `Soff.uz sayti sotuvchisi - ${sellerr?.seller?.full_name} ning barcha mahsulotlarini shu yerda ko'rishingiz mumkin`
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_8__.Modal, {
                title: "Buyurtma berish ",
                open: isModalOpen,
                onOk: handleOk,
                onCancel: handleCancel,
                cancelButtonProps: {
                    style: {
                        display: "none"
                    }
                },
                okButtonProps: {
                    style: {
                        backgroundColor: "#00A44F"
                    }
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                        children: "Tez kunda!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                        children: "Xurmatli Soff.uz foyalanuvchisi, siz bu yerda Sotuvchiga mahsulot yoki xizmat buyurtmasini berishingiz mumkin bo'ladi."
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_8__.Modal, {
                title: "Qo'llab quvvatlash",
                open: isModalOpenDonate,
                onOk: handleOkDonate,
                onCancel: handleCancelDonate,
                cancelButtonProps: {
                    style: {
                        display: "none"
                    }
                },
                okButtonProps: {
                    style: {
                        backgroundColor: "#c5ab35"
                    }
                },
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                        children: "Tez kunda!"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                        children: "Xurmatli Soff.uz foyalanuvchisi, siz bu yerda Sotuvchiga O'zingizni Anonim yoki ismingizni kiritgan holda xabar yo'llashingiz va ular uchun donat summasini o'tkazishingiz mumkin bo'ladi. Sotuvchiga siz ko‘rsatgan summa to‘liq o‘tkazilib beriladi. Hamda qo'llab quvvatlash maqsadida biror bir mahsulotini sotib olishingiz mumkin."
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "ps-product-list mb-5",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                        className: "seller-account-page",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                            className: "container",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                className: "user_profile_container mt-5",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                                        className: "user_profile_card",
                                        style: {
                                            backgroundImage: `url(${(isSmallScreen ? sellerr?.seller?.mobile_background_image : sellerr?.seller?.background_image) || "/static/img/orqafon1.avif"})`
                                        },
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                            className: "profile_images_card",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd__WEBPACK_IMPORTED_MODULE_8__.Image.PreviewGroup, {
                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd__WEBPACK_IMPORTED_MODULE_8__.Image, {
                                                        width: 200,
                                                        src: `${sellerr?.seller?.image ? sellerr?.seller?.image : "/static/img/ozodbek.png"}`
                                                    })
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                                                    className: `fa-solid fa-circle iconOnlayn text-${dateTime ? "success" : "secondary"}`
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                                        className: "user_profile_body usr_bodyy",
                                        children: sellerr?.seller && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                            className: "d-flex justify-content-between user_titleCard ",
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("h1", {
                                                            children: [
                                                                sellerr?.seller?.full_name,
                                                                " "
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
                                                            children: [
                                                                "Ro'yxatdan o'tgan sana:",
                                                                " ",
                                                                sellerr?.created_at,
                                                                " "
                                                            ]
                                                        }),
                                                        dateTime ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                                                            className: "text-success fw-bold",
                                                            children: "Onlayn"
                                                        }) : sellerr?.seller?.last_login && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
                                                            children: [
                                                                "Oxirgi marta:",
                                                                " ",
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_partials_account_DateFormatter__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z, {
                                                                    targetDate: sellerr?.seller?.last_login
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                    className: "col-12 col-md-9 user_cardss",
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                            className: "row justify-content-center",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                                                                    className: "col-10 col-sm-6 col-md-4 mt-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                                        className: "d-flex align-items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                                                                                className: "fa-regular fa-hard-drive fa-2x mr-4"
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
                                                                                        className: "h1",
                                                                                        children: [
                                                                                            sellerr?.total_approved_documents,
                                                                                            " ",
                                                                                            "ta"
                                                                                        ]
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                                                                                        className: "h4",
                                                                                        children: "Jami mahsulotlar soni"
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                                                                    className: "col-10 col-sm-6 col-md-4 my-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                                        className: "d-flex align-items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                                                                                className: "fa-regular fa-handshake fa-2x mr-4"
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
                                                                                        className: "h1",
                                                                                        children: [
                                                                                            sellerr?.total_sold_documents,
                                                                                            " ",
                                                                                            "ta"
                                                                                        ]
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                                                                                        className: "h4",
                                                                                        children: "Sotilgan mahsulotlari soni"
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                                                                    className: "col-10 col-sm-6 col-md-4 my-3",
                                                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                                        className: "d-flex align-items-center",
                                                                        children: [
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                                                                                className: "fa-regular fa-gem fa-2x mr-4"
                                                                            }),
                                                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                                                children: [
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("p", {
                                                                                        className: "h1",
                                                                                        children: [
                                                                                            (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_15__/* .addPeriodToThousands */ .Y)(sellerr?.total_income),
                                                                                            " ",
                                                                                            "so'm"
                                                                                        ]
                                                                                    }),
                                                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                                                                                        className: "h4",
                                                                                        children: "Daromad"
                                                                                    })
                                                                                ]
                                                                            })
                                                                        ]
                                                                    })
                                                                })
                                                            ]
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                            className: "d-xl-flex d-lg-flex d-md-flex d-sm-flex justify-content-center align-items-center gap-5 py-4 ",
                                                            children: [
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("a", {
                                                                    href: "#products",
                                                                    className: `text-white ps-btn w-100 text-center pb-4 pt-4 ${tab === "tab-1" ? "donate-color-btn" : ""}`,
                                                                    style: {
                                                                        textDecoration: "none"
                                                                    },
                                                                    onClick: ()=>setTab("tab-1"),
                                                                    children: [
                                                                        " ",
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                                                                            className: "fa-regular fa-pen-to-square"
                                                                        }),
                                                                        " ",
                                                                        "Mahsulotlari"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("button", {
                                                                    className: `text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 ${tab === "tab-2" ? "donate-color-btn" : ""}`,
                                                                    onClick: showModal,
                                                                    children: [
                                                                        " ",
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                                                                            className: "fa-regular fa-pen-to-square"
                                                                        }),
                                                                        " ",
                                                                        "Buyurtma berish"
                                                                    ]
                                                                }),
                                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("button", {
                                                                    className: `text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 ${tab === "tab-3" ? "donate-color-btn" : ""}`,
                                                                    // onClick={showModalDonate}
                                                                    onClick: ()=>setTab("tab-3"),
                                                                    children: [
                                                                        " ",
                                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("i", {
                                                                            className: "fa-solid fa-hand-holding-medical"
                                                                        }),
                                                                        " ",
                                                                        "Qo'llab quvvatlash"
                                                                    ]
                                                                })
                                                            ]
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                        className: "seller_contaoner2",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("select", {
                                                onChange: (e)=>setTypeSelect(e.target.value),
                                                className: "form-control seller_filter rounded-3",
                                                children: productType?.map((e)=>{
                                                    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("option", {
                                                        value: e.type,
                                                        selected: e?.type === typeSelect,
                                                        children: [
                                                            e?.type === "audio" ? "Audio materiallar" : e?.type === "video" ? "Video materiallar" : e?.type === "template" ? "Shablon materiallar" : "Hujjat materiallar",
                                                            e?.count !== 0 ? `- ${e?.count} ta` : ""
                                                        ]
                                                    }, e?.type);
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                                                type: "text",
                                                placeholder: "Qidiruv...",
                                                onInput: (e)=>setSearch(e.target.value),
                                                className: "form-control rounded-3 seller_filter_option"
                                            })
                                        ]
                                    })
                                ]
                            })
                        })
                    }),
                    tab === "tab-1" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_partials_seller_SellerProducts__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                        data: data,
                        page: page,
                        handlePagination: handlePagination
                    }) : tab === "tab-2" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_partials_seller_SellerProducts__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                        data: data,
                        page: page,
                        handlePagination: handlePagination
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_partials_seller_SellerDonateForm__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {})
                ]
            })
        ]
    });
};
async function getServerSideProps$1({ query  }) {
    const response = await fetch(_repositories_Repository__WEBPACK_IMPORTED_MODULE_6__/* .baseUrl */ .FH + `customer/top-sellers/${query.pid}`);
    // Agar topilmasa yoki status 404 bo‘lsa
    if (!response.ok) {
        return {
            notFound: true
        };
    }
    const sellerr = await response.json();
    // Agar JSON bo‘lsa ham lekin seller topilmagan bo‘lsa:
    if (!sellerr?.seller) {
        return {
            notFound: true
        };
    }
    return {
        props: {
            seller: {},
            sellerr
        }
    };
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getServerSideProps: getServerSideProps$1,
    'default': SellerPage
});

/*
 * This file is a template for the code which will be substituted when our webpack loader handles non-API files in the
 * `pages/` directory.
 *
 * We use `__SENTRY_WRAPPING_TARGET_FILE__.cjs` as a placeholder for the path to the file being wrapped. Because it's not a real package,
 * this causes both TS and ESLint to complain, hence the pragma comments below.
 */

const userPageModule = serverComponentModule ;

const pageComponent = userPageModule ? userPageModule.default : undefined;

const origGetInitialProps = pageComponent ? pageComponent.getInitialProps : undefined;
const origGetStaticProps = userPageModule ? userPageModule.getStaticProps : undefined;
const origGetServerSideProps = userPageModule ? userPageModule.getServerSideProps : undefined;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = {
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapErrorGetInitialPropsWithSentry,
};

const getInitialPropsWrapper = getInitialPropsWrappers['/__seller/[pid]'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/__seller/[pid]')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/__seller/[pid]')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 2181:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_hooks_useProduct__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5001);
/* harmony import */ var _components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1621);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_hooks_useProduct__WEBPACK_IMPORTED_MODULE_3__]);
_shared_hooks_useProduct__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const Product = ({ product  })=>{
    const { thumbnailImage , title  } = (0,_shared_hooks_useProduct__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z)();
    const { 0: countShow , 1: setCountShow  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "ps-product",
        onMouseEnter: ()=>setCountShow(true),
        onMouseLeave: ()=>setCountShow(false),
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-product__thumbnail",
                style: {
                    margin: "0 auto"
                },
                children: [
                    (product?.views_count || product?.views_count === 0) && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "text-end mb-0 mt-1",
                        style: {
                            fontSize: "12px",
                            opacity: countShow ? "1" : "0",
                            transition: "opacity 0.3s linear"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                className: "fa-solid fa-eye ",
                                style: {
                                    fontSize: "10px"
                                }
                            }),
                            " ",
                            product?.views_count
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                        href: "/product/[pid]",
                        as: `/product/${product.slug}`,
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                            style: {
                                display: "flex",
                                justifyContent: "center"
                            },
                            children: product.poster_url ? thumbnailImage(product) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                src: "/static/img/docCopy.png",
                                alt: "hujjat"
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "ps-product__container",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "ps-product__content card-narx-box",
                    children: [
                        title(product),
                        +product.discount_price === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "free-product-text",
                            children: "Bepul"
                        }) : product.discount === 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            children: [
                                (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_4__/* .addPeriodToThousands */ .Y)(product.discount_price),
                                " so'm"
                            ]
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("del", {
                                    children: [
                                        (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_4__/* .addPeriodToThousands */ .Y)(product.price),
                                        " so'm"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                    children: [
                                        (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_4__/* .addPeriodToThousands */ .Y)(product.discount_price),
                                        "so'm"
                                    ]
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Product);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8664:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function CalculateTimeDifference({ targetDate , className  }) {
    const sanangiz = new Date(targetDate);
    const yil = sanangiz.getFullYear();
    const oy = (sanangiz.getMonth() + 1).toString().padStart(2, "0");
    const kun = sanangiz.getDate().toString().padStart(2, "0");
    const soat = sanangiz.getHours().toString().padStart(2, "0");
    const minut = sanangiz.getMinutes().toString().padStart(2, "0");
    const getMonthOy = ()=>{
        switch(oy){
            case "01":
                return "yanvar";
            case "02":
                return "fevral";
            case "03":
                return "mart";
            case "04":
                return "aprel";
            case "05":
                return "may";
            case "06":
                return "iyun";
            case "07":
                return "iyul";
            case "08":
                return "avgust";
            case "09":
                return "sentabr";
            case "10":
                return "oktyabr";
            case "11":
                return "noyabr";
            case "12":
                return "dekabr";
            default:
                return "";
        }
    };
    const yangiSanaFormati = `${yil} yil ${kun} ${getMonthOy()} ${soat}:${minut}`;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
        className: className ? className : "",
        children: yangiSanaFormati
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CalculateTimeDifference);


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


/***/ }),

/***/ 7592:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SellerDonateForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3701);
/* harmony import */ var _shared_utilities_ecomerce_helpers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8909);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9648);
/* harmony import */ var _reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3098);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__, axios__WEBPACK_IMPORTED_MODULE_6__, _reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_7__]);
([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__, axios__WEBPACK_IMPORTED_MODULE_6__, _reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function SellerDonateForm() {
    const { 0: name , 1: setName  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("");
    const { 0: amount , 1: setAmount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(5000);
    const { 0: description , 1: setDescription  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: code , 1: setCode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: order , 1: setOrder  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const { 0: paymentMethod , 1: setPaymentMenthod  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("by_card");
    const { 0: cardData , 1: setCardData  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        number: "",
        expired_date: ""
    });
    const { 0: paymentStep , 1: setPaymentStep  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("card") // card | sms | re-sms
    ;
    const { 0: timer , 1: setTimer  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("02:00");
    const { 0: reSend , 1: setReSend  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { query , push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    function reverseCountdown(minutes, seconds) {
        if (typeof minutes !== "number" || typeof seconds !== "number" || minutes < 0 || seconds < 0) {
            return "Faqat non-negativ sonlar kiritilishi kerak";
        }
        var totalSeconds = minutes * 60 + seconds;
        var interval = setInterval(function() {
            var mins = Math.floor(totalSeconds / 60);
            var secs = totalSeconds % 60;
            // Formatni to'g'ri chiqarish
            var formattedMins = mins < 10 ? "0" + mins : mins;
            var formattedSecs = secs < 10 ? "0" + secs : secs;
            setTimer(formattedMins + ":" + formattedSecs);
            totalSeconds--;
            if (totalSeconds < 0) {
                clearInterval(interval);
                setPaymentStep("re-sms");
            }
            if (reSend) {
                clearInterval(interval);
            }
        }, 1000);
    }
    const handleSubmit = async (e)=>{
        e?.preventDefault?.();
        setLoading(true);
        if ((paymentStep === "card" || paymentStep === "re-sms") && paymentMethod === "by_card") {
            setReSend(false);
            setPaymentStep("sms");
            const cfg = {
                card_number: cardData.number.split(" ").join(""),
                expire_date: cardData.expired_date.replace("/", ""),
                amount,
                description,
                sponsor_info: name,
                user: Number(query.pid),
                provider: "by_card"
            };
            try {
                const resp = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post(`${_reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlCustomer */ ._Q}donate/`, cfg);
                const modal = antd__WEBPACK_IMPORTED_MODULE_2__.Modal.success({
                    centered: true,
                    title: "Muvaffaqiyatli!",
                    content: resp.data?.msg
                });
                setOrder(resp.data?.order);
                reverseCountdown(1, 59);
            } catch (err) {
                const modal1 = antd__WEBPACK_IMPORTED_MODULE_2__.Modal.error({
                    centered: true,
                    title: "Xatolik!",
                    content: err.response.data?.msg
                });
                setPaymentStep("card");
            }
            setLoading(false);
            return;
        }
        if (paymentStep === "sms" && paymentMethod === "by_card") {
            const cfg1 = {
                code,
                order
            };
            try {
                const resp1 = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post(`${_reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlCustomer */ ._Q}verify/`, cfg1);
                const modal2 = antd__WEBPACK_IMPORTED_MODULE_2__.Modal.success({
                    centered: true,
                    title: "Muvaffaqiyatli!",
                    content: resp1.data?.msg
                });
                push("/");
            } catch (err1) {
                if (err1.response.data?.status?.[0] === "False") {
                    const modal3 = antd__WEBPACK_IMPORTED_MODULE_2__.Modal.error({
                        centered: true,
                        title: "Xatolik!",
                        content: err1.response.data?.msg
                    });
                } else {
                    setReSend(true);
                    const modal4 = antd__WEBPACK_IMPORTED_MODULE_2__.Modal.error({
                        centered: true,
                        title: "Xatolik!",
                        content: err1.response.data?.msg || "Qaytadan urinib ko'ring"
                    });
                    setPaymentStep("card");
                }
            }
            setLoading(false);
            return;
        }
        if (paymentMethod === "click" || paymentMethod === "payme") {
            const cfg2 = {
                amount,
                description,
                sponsor_info: name,
                user: Number(query.pid),
                provider: paymentMethod
            };
            try {
                const resp2 = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post(`${_reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlCustomer */ ._Q}donate/`, cfg2);
                window.location.href = resp2.data.url;
            } catch (err2) {
                const modal5 = antd__WEBPACK_IMPORTED_MODULE_2__.Modal.error({
                    centered: true,
                    title: "Xatolik!",
                    content: err2.response.data?.msg
                });
            }
            setLoading(false);
            return;
        }
    };
    const onChange = (checked)=>{
        if (checked) {
            setName("Anonim");
        } else {
            setName("");
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "container",
        id: "products",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            style: {
                maxWidth: "800px",
                margin: "0 auto"
            },
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "ps-tab active",
                id: "register",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
                    className: "ps-form__content",
                    onSubmit: handleSubmit,
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                            children: "Qo'llab quvvatlash"
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "d-flex align-items-center gap-3",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "form-group flex-grow-1",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            children: "Ism yoki nikneym *"
                                        }),
                                        name === "Anonim" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            className: "form-control",
                                            type: "text",
                                            placeholder: "Ism yoki nikneym",
                                            value: "Anonim"
                                        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                            className: "form-control",
                                            type: "text",
                                            placeholder: "Ism yoki nikneym",
                                            value: name,
                                            onChange: (e)=>setName(e.target.value),
                                            required: true
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: "form-group",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                            children: "Anonim"
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                                            style: {
                                                display: "flex",
                                                alignItems: "center"
                                            },
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Switch, {
                                                onChange: onChange,
                                                style: name === "Anonim" ? {
                                                    backgroundColor: "#00A44F"
                                                } : {}
                                            })
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "d-flex align-items-center gap-3",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "form-group flex-grow-1",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Summa (so'm)"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        required: true,
                                        className: "form-control",
                                        type: "number",
                                        placeholder: "Ism yoki nikneym",
                                        value: amount,
                                        onChange: (e)=>setAmount(e.target.value)
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "amount-list d-flex gap-4 flex-wrap",
                            children: [
                                5000,
                                10000,
                                20000,
                                50000,
                                100000,
                                250000
                            ].map((el)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "amount-item py-1 px-4",
                                    style: {
                                        backgroundColor: Number(amount) === el ? "#00A44F" : "#f1f1f1",
                                        borderRadius: "12px",
                                        cursor: "pointer",
                                        color: Number(amount) !== el ? "#00A44F" : "#f1f1f1"
                                    },
                                    onClick: ()=>setAmount(el),
                                    children: (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_3__/* .formatCurrency */ .xG)(el)
                                }, el))
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "d-flex align-items-center gap-3 mt-4",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "form-group flex-grow-1",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Xabar matnini yuboring"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("textarea", {
                                        onChange: (e)=>setDescription(e.target.value),
                                        className: "form-control",
                                        placeholder: "Xabar matnini yuboring"
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "amount-list d-flex gap-4 flex-wrap mb-4",
                            children: [
                                {
                                    name: "by_card",
                                    img: "/static/img/payment-method/by_card.png"
                                },
                                {
                                    name: "click",
                                    img: "/static/img/payment-method/click-logo.png"
                                },
                                {
                                    name: "payme",
                                    img: "/static/img/payment-method/payme-logo.png"
                                }, 
                            ].map((el, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    style: {
                                        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                                        cursor: "pointer",
                                        backgroundColor: el.name === paymentMethod ? "#00A44F" : "#f1f1f1",
                                        transition: "all 0.3s ease",
                                        width: "100px"
                                    },
                                    onClick: ()=>(setPaymentStep("card"), setPaymentMenthod(el.name)),
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                        src: el.img,
                                        alt: ""
                                    })
                                }, i))
                        }),
                        paymentMethod === "by_card" && paymentStep === "card" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "d-flex align-items-center gap-3 mt-2",
                            style: {
                                maxWidth: "300px"
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "form-group flex-grow-1",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Karta raqami"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: "form-control",
                                        placeholder: "Karta raqamini kiriting",
                                        maxLength: 19,
                                        onChange: (e)=>setCardData((c)=>({
                                                    ...c,
                                                    number: (0,_shared_utilities_ecomerce_helpers__WEBPACK_IMPORTED_MODULE_4__/* .formatCreditCardNumber */ .mf)(e.target.value)
                                                })),
                                        value: cardData.number
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Kartaning amal qilish muddati"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: "form-control",
                                        placeholder: "mm/yy",
                                        maxLength: 6,
                                        onChange: (e)=>setCardData((c)=>({
                                                    ...c,
                                                    expired_date: (0,_shared_utilities_ecomerce_helpers__WEBPACK_IMPORTED_MODULE_4__/* .formatExpiryDate */ .Lk)(e.target.value)
                                                })),
                                        value: cardData.expired_date
                                    })
                                ]
                            })
                        }),
                        paymentMethod === "by_card" && (paymentStep === "sms" || paymentStep === "re-sms") && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "d-flex align-items-center gap-3",
                            style: {
                                maxWidth: "300px"
                            },
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "form-group flex-grow-1",
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        children: "Raqamingizga yuborilgan sms kodni kiriting"
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("input", {
                                        className: "form-control",
                                        placeholder: "Kod",
                                        maxLength: 6,
                                        onChange: (e)=>setCode(e.target.value)
                                    }),
                                    paymentStep === "re-sms" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-danger",
                                        style: {
                                            cursor: "pointer"
                                        },
                                        onClick: handleSubmit,
                                        children: "Qayta kod yuborish"
                                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        children: [
                                            timer,
                                            " qayta kod olish uchun"
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
                            type: loading ? "button" : "submit",
                            style: {
                                maxWidth: "300px",
                                gap: "5px"
                            },
                            className: `text-white ps-btn w-100 mt-3 mt-xl-0 mt-lg-0 mt-md-0 mt-sm-0 donate-color-btn confirm-btn`,
                            children: [
                                " ",
                                loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("svg", {
                                    xmlns: "http://www.w3.org/2000/svg",
                                    viewBox: "0 0 100 100",
                                    preserveAspectRatio: "xMidYMid",
                                    width: "20",
                                    height: "20",
                                    style: {
                                        shapeRendering: "auto",
                                        display: "block",
                                        background: "transparent"
                                    },
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("g", {
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                                                cx: "50",
                                                cy: "50",
                                                r: "41",
                                                "stroke-width": "8",
                                                stroke: "#d23232",
                                                "stroke-dasharray": "64.40264939859075 64.40264939859075",
                                                fill: "none",
                                                "stroke-linecap": "round",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("animateTransform", {
                                                    attributeName: "transform",
                                                    type: "rotate",
                                                    repeatCount: "indefinite",
                                                    dur: "1s",
                                                    keyTimes: "0;1",
                                                    values: "0 50 50;360 50 50"
                                                })
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("g", {})
                                        ]
                                    })
                                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                    className: "fa-solid fa-gift"
                                }),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "Davom etish"
                                })
                            ]
                        })
                    ]
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4947:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SellerProducts)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_elements_products_Product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2181);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_elements_products_Product__WEBPACK_IMPORTED_MODULE_2__]);
_components_elements_products_Product__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// import ProductVideo from '~/components/elements/products/ProductVideo';
function SellerProducts({ data =[] , page , handlePagination  }) {
    const { 0: isPlay , 1: setIsPlay  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "container",
        id: "products",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "row",
                children: data?.results?.length > 0 ? data?.results?.map((item, index)=>item?.document?.content_type === "file" || item?.document?.content_type === "template" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "home-card col-xl-2 col-lg-2 col-md-3 col-sm-4 col-xs-3 col-6",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_elements_products_Product__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                product: item
                            }),
                            " "
                        ]
                    }, item.id) : item?.document?.content_type === "video" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-md-4 my-3"
                    }, index) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {})) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "row d-flex justify-content-center align-items-center py-5 mt-5",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                        className: "col-md-4 text-center ",
                        children: "Ma'lumot topilmadi!"
                    })
                })
            }),
            data?.count >= 40 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "text-center my-4",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Pagination, {
                    total: data?.count,
                    pageSize: 40,
                    responsive: true,
                    showSizeChanger: false,
                    current: page,
                    showTotal: (total, range)=>`${total} ta dan ${range[0]}-${range[1]} oralig'i `,
                    onChange: (e)=>handlePagination(e)
                })
            })
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3098:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "E": () => (/* binding */ orginalUrl),
/* harmony export */   "FH": () => (/* binding */ baseUrl),
/* harmony export */   "YR": () => (/* binding */ baseUrlProfie),
/* harmony export */   "ZP": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "_Q": () => (/* binding */ baseUrlCustomer)
/* harmony export */ });
/* unused harmony export orginalApi */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

// BASE DOMAINS
const baseDomain = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/seller/`;
const baseDomainProfile = `${process.env.NEXT_PUBLIC_BASE_URL}/`;
const baseUrlCustomer = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`;
const baseUrl = `${baseDomain}`;
const baseUrlProfie = `${baseDomainProfile}`;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseUrl,
    baseDomainProfile
}));
const orginalUrl = baseUrlCustomer;
const orginalApi = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseUrl: orginalUrl
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5001:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useProduct)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3701);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _components_nextImagecard__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5922);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__]);
_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





function useProduct() {
    return {
        thumbnailImage: (payload)=>{
            return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: payload?.poster_url ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        overflow: "hidden"
                    },
                    className: "responsive-image-card text-center",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_nextImagecard__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        url: payload?.poster_url,
                        clasSn: "products-image1 m-0",
                        width: "70px",
                        height: "70px",
                        payload: payload
                    })
                }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    style: {
                        backgroundImage: `url(/static/img/docCopy.png)`,
                        backgroundSize: "contain",
                        backgroundRepeat: "no-repeat",
                        height: "70px"
                    },
                    className: "placholder-hujjat products-image1"
                })
            });
        },
        price: (payload)=>{
            let view;
            if (payload.sale_price) {
                view = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "ps-product__price sale",
                    children: payload.discount_price !== 0 ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__/* .formatCurrency */ .xG)(payload.sale_price),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: " so'm"
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("del", {
                                className: "ms-2",
                                children: [
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__/* .formatCurrency */ .xG)(payload.price),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        children: " so'm"
                                    })
                                ]
                            })
                        ]
                    }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "free-product-text free-product-text_search",
                        children: "Bepul"
                    })
                });
            } else {
                view = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                    className: "ps-product__price",
                    children: payload.discount_price === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "free-product-text free-product-text_search",
                            children: "Bepul"
                        })
                    }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                        children: [
                            (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__/* .formatCurrency */ .xG)(payload.price),
                            " ",
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                children: " so'm"
                            })
                        ]
                    })
                });
            }
            return view;
        },
        title: (payload)=>{
            let view = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
                href: "/product/[pid]",
                as: `/product/${payload?.slug}`,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    className: "ps-product__title ",
                    children: payload?.title
                })
            });
            return view;
        }
    };
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4705:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

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

/***/ }),

/***/ 6999:
/***/ ((module) => {

module.exports = require("@react-oauth/google");

/***/ }),

/***/ 8097:
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 5725:
/***/ ((module) => {

module.exports = require("antd");

/***/ }),

/***/ 6734:
/***/ ((module) => {

module.exports = require("js-cookie");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

module.exports = require("react-redux");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3258:
/***/ ((module) => {

module.exports = import("@reduxjs/toolkit");;

/***/ }),

/***/ 9943:
/***/ ((module) => {

module.exports = import("@reduxjs/toolkit/query/react");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 2880:
/***/ ((module) => {

module.exports = import("jwt-decode");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,5780,3015,7864,2315,6985,6598,3701,7534,2495,2920,8909,5922], () => (__webpack_exec__(8777)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=[pid].js.map