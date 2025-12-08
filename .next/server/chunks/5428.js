"use strict";
exports.id = 5428;
exports.ids = [5428];
exports.modules = {

/***/ 5428:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export SearchProductsNotFound */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9842);
/* harmony import */ var _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4333);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1185);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__, _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_3__, react_icons_io5__WEBPACK_IMPORTED_MODULE_7__]);
([_entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__, _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_3__, react_icons_io5__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const Search_Results_NotFound = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.forwardRef)(({ isSearchPage =true  }, ref)=>{
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useSelector)((state)=>state.auth);
    const { data , isLoading  } = (0,_shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_3__/* .useFGet */ .oh)("top-services", "customer/popular-services?limit=6", {
        enabled: isSearchPage
    });
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const handleRedirect = ()=>{
        if (isLoggedIn) {
            push("/order/create");
        } else {
            push("/auth/login?returnUrl=" + encodeURIComponent("/order/create"));
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        ref: ref,
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "Search_Results_not_found",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/static/img/searchNotFound.png",
                        alt: "",
                        className: "Search_Results_not_found_img"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "Search_Results_not_found_title",
                        children: isSearchPage ? "Afsuski, izlagan narsangiz topilmadi. Ammo siz uni buyurtma qilishingiz mumkin.\uD83D\uDC47" : "Afsuski, izlagan xizmatingiz topilmadi. Ammo siz uni buyurtma qilishingiz mumkin.\uD83D\uDC47"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "Search_Results_not_found_subtitle",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                            className: "Search_Results_not_found_btn",
                            onClick: handleRedirect,
                            children: "Buyurtma yaratish"
                        })
                    })
                ]
            }),
            isSearchPage && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "row row-gap-2 mt-4",
                children: isLoading ? Array.from({
                    length: 9
                }).map((_, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-6 col-sm-6 col-md-4 px-1",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Skeleton.Input, {
                            active: true,
                            block: true,
                            style: {
                                height: 200,
                                borderRadius: 12
                            }
                        })
                    }, i)) : data?.items?.map((service)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "col-6 col-sm-6 col-md-4 px-1",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                            service: service
                        })
                    }, service.id))
            })
        ]
    });
});
const SearchProductsNotFound = /*#__PURE__*/ (/* unused pure expression or super */ null && (forwardRef((props, ref)=>{
    const router = useRouter();
    const handleLoadSimilarDocuments = ()=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                similar_documents: true
            }
        }, undefined, {
            scroll: false
        });
    };
    return /*#__PURE__*/ _jsx("div", {
        ref: ref,
        children: /*#__PURE__*/ _jsxs("div", {
            className: "Search_Results_not_found",
            style: {
                marginBottom: "50px"
            },
            children: [
                /*#__PURE__*/ _jsx("img", {
                    src: "/static/img/searchNotFound.png",
                    alt: "",
                    className: "Search_Results_not_found_img"
                }),
                /*#__PURE__*/ _jsx("p", {
                    className: "Search_Results_not_found_title",
                    children: "Afsuski, izlagan narsangiz topilmadi. Lekin siz o'xshash mahsulotlarni ko'rib chiqishingiz mumkin."
                }),
                /*#__PURE__*/ _jsx("p", {
                    className: "Search_Results_not_found_subtitle",
                    children: /*#__PURE__*/ _jsx(Button, {
                        icon: /*#__PURE__*/ _jsx(IoDocumentsSharp, {}),
                        type: "primary",
                        onClick: handleLoadSimilarDocuments,
                        style: {
                            position: "relative",
                            right: "10px",
                            fontSize: "18px",
                            fontWeight: "bold"
                        },
                        children: "O'xshash mahsulotlar"
                    })
                })
            ]
        })
    });
})));
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Search_Results_NotFound);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;