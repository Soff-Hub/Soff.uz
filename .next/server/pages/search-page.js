"use strict";
(() => {
var exports = {};
exports.id = 9763;
exports.ids = [9763];
exports.modules = {

/***/ 4951:
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
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_nextImagecard__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(5922);
/* harmony import */ var _components_elements_search_page_details_products__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1399);
/* harmony import */ var _shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1275);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_elements_search_page_details_services__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8429);
/* harmony import */ var _components_elements_search_page_details_specialists__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(5349);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(6603);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _components_elements_search_page_details_search_page_side__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(3934);
/* harmony import */ var _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(6400);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(9752);
/* harmony import */ var _repositories_api__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(8310);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(1064);
/* harmony import */ var _shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(9894);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_elements_search_page_details_products__WEBPACK_IMPORTED_MODULE_8__, _components_elements_search_page_details_services__WEBPACK_IMPORTED_MODULE_11__, _components_elements_search_page_details_specialists__WEBPACK_IMPORTED_MODULE_12__, _components_elements_search_page_details_search_page_side__WEBPACK_IMPORTED_MODULE_15__, _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_16__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_17__, _repositories_api__WEBPACK_IMPORTED_MODULE_18__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_19__, _shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_20__]);
([_components_elements_search_page_details_products__WEBPACK_IMPORTED_MODULE_8__, _components_elements_search_page_details_services__WEBPACK_IMPORTED_MODULE_11__, _components_elements_search_page_details_specialists__WEBPACK_IMPORTED_MODULE_12__, _components_elements_search_page_details_search_page_side__WEBPACK_IMPORTED_MODULE_15__, _shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_16__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_17__, _repositories_api__WEBPACK_IMPORTED_MODULE_18__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_19__, _shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_20__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






















const Search_Results = ({ keyword , productsInitialData , servicesInitialData , sellersInitialData , searchUrl ,  })=>{
    const inputEl = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const { 0: searchTerm , 1: setSearchTerm  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(keyword || "");
    const debouncedSearchTerm = (0,_shared_hooks_useDebounce__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z)(searchTerm, 1000);
    const { query  } = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const { isDesktop  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_13__/* ["default"] */ .Z)();
    const pageRef = (0,react__WEBPACK_IMPORTED_MODULE_3__.useRef)(null);
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_14__.useSelector)((state)=>state.auth);
    const tab = router.query.tab || "1";
    const topServicesQuery = new URLSearchParams({
        limit: 6,
        ...(query.direction || query.ts_direction) && tab !== "1" && {
            direction: query.direction || query.ts_direction
        },
        ...query.keyword && !query.direction && !query.ts_direction && tab !== "1" && {
            search: query.keyword
        }
    });
    const { data: topServices , isLoading: topServicesLoading  } = (0,_shared_hooks_useFApi__WEBPACK_IMPORTED_MODULE_16__/* .useFGet */ .oh)([
        "top-services",
        topServicesQuery.toString()
    ], `customer/popular-services?${topServicesQuery.toString()}`);
    const { data: lastProducts , isLoading: lastProductsLoading  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_17__.useQuery)({
        queryKey: [
            `last-products`
        ],
        queryFn: async ()=>{
            const res = await _repositories_api__WEBPACK_IMPORTED_MODULE_18__/* .api.get */ .hi.get(`customer/last-added?limit=10`);
            return res.data;
        }
    });
    const dynamicCreateBtnLink = isLoggedIn ? "/order/create" : "/auth/login?returnUrl=" + encodeURIComponent("/order/create");
    const createBtn = ()=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
            className: "w-100",
            children: isDesktop && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                href: dynamicCreateBtnLink,
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                        className: "Search_Results_not_found_btn w-100 text-center py-3",
                        children: "Buyurtma yaratish"
                    })
                })
            })
        });
    const handleSetRouterQuery = (currentTab)=>{
        const omitKeys = [
            "direction",
            "ts_direction",
            "page",
            "offset",
            "limit",
            "category",
            "parentCategory",
            "service_parent",
            "file_type",
            "order_by",
            "page_from",
            "page_to", 
        ];
        const newQueries = Object.fromEntries(Object.entries(router.query).filter(([key])=>!omitKeys.includes(key)));
        router.push({
            pathname: router.pathname,
            query: {
                ...newQueries,
                keyword: debouncedSearchTerm,
                tab: currentTab,
                type: currentTab == "1" ? "file" : "all"
            }
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (pageRef.current) {
            pageRef.current.scrollIntoView({
                behavior: "smooth"
            });
        } else {
            window.scrollIntoView({
                behavior: "smooth"
            });
        }
    }, [
        tab
    ]);
    const handleClearInput = ()=>{
        setSearchTerm("");
        inputEl.current.value = "";
    };
    const handleChangeTab = (value)=>{
        handleSetRouterQuery(value);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        if (debouncedSearchTerm !== router.query.keyword) {
            // When a new search term is entered, reset pagination and filter params
            const omitKeys = [
                "page",
                "offset",
                "similar_documents"
            ];
            const newQueries = Object.fromEntries(Object.entries(router.query).filter(([key])=>!omitKeys.includes(key)));
            router.push({
                pathname: router.pathname,
                query: {
                    ...newQueries,
                    keyword: debouncedSearchTerm
                }
            });
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [
        debouncedSearchTerm
    ]);
    const clearTextView = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        className: "ps-form__action",
        children: searchTerm ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "ps-form__action_search_btn m-auto cursor-pointer",
            onClick: handleClearInput,
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "14",
                height: "14",
                viewBox: "0 0 24 24",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
                    fill: "#7B7B7B",
                    d: "M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7a1 1 0 0 0-1.41 1.41L10.59 12l-4.89 4.89a1 1 0 0 0 1.41 1.41L12 13.41l4.89 4.89a1 1 0 0 0 1.41-1.41L13.41 12l4.89-4.89a1 1 0 0 0 0-1.4Z"
                })
            })
        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
            className: "ps-form__action_search_btn m-auto",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("svg", {
                xmlns: "http://www.w3.org/2000/svg",
                width: "12",
                height: "13",
                viewBox: "0 0 12 13",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("path", {
                    d: "M9.47006 9.13465L12 11.6646L11.1646 12.5L8.63465 9.97006C7.72497 10.6978 6.57133 11.1332 5.31661 11.1332C2.38184 11.1332 0 8.75138 0 5.81661C0 2.88184 2.38184 0.5 5.31661 0.5C8.25138 0.5 10.6332 2.88184 10.6332 5.81661C10.6332 7.07133 10.1978 8.22497 9.47006 9.13465ZM8.28487 8.69632C9.00722 7.95188 9.45175 6.93641 9.45175 5.81661C9.45175 3.53194 7.60127 1.68147 5.31661 1.68147C3.03194 1.68147 1.18147 3.53194 1.18147 5.81661C1.18147 8.10127 3.03194 9.95175 5.31661 9.95175C6.43641 9.95175 7.45188 9.50722 8.19632 8.78487L8.28487 8.69632Z",
                    fill: "#7B7B7B"
                })
            })
        })
    });
    const sideElements = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_elements_search_page_details_search_page_side__WEBPACK_IMPORTED_MODULE_15__/* ["default"] */ .Z, {
        createBtn: createBtn,
        topServices: topServices,
        topServicesLoading: topServicesLoading,
        lastProducts: lastProducts,
        lastProductsLoading: lastProductsLoading
    });
    const tabItems = [
        {
            key: "1",
            label: "Mahsulotlar",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_elements_search_page_details_products__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                children: sideElements,
                initialData: productsInitialData
            })
        },
        {
            key: "2",
            label: "Xizmatlar",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_elements_search_page_details_services__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z, {
                children: sideElements,
                initialData: servicesInitialData
            })
        },
        {
            key: "3",
            label: "Mutahasislar",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_elements_search_page_details_specialists__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
                children: sideElements,
                initialData: sellersInitialData
            })
        }, 
    ];
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
        ref: pageRef,
        className: "global_search_results",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_6___default()), {
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("title", {
                        children: keyword ? `“${keyword}”` : "Soff.uz - Qidiruv natijalar"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("meta", {
                        name: "robots",
                        content: "index, follow"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("meta", {
                        name: "description",
                        content: keyword ? `“${keyword}” bo‘yicha topilgan natijalar. Soff.uz orqali kerakli bo'lgan raqamli mahsulotlarni yuklab olishingiz mumkin` : "Soff.uz orqali kerakli bo'lgan raqamli mahsulotlarni yuklab olishingiz mumkin"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("nav", {
                className: "global_navbar",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                    className: "container d-flex align-items-center",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                        className: "d-flex align-items-center gap-5 width_full_screen",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
                                href: "/",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("a", {
                                    className: "ps-logo",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_nextImagecard__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                        url: "/static/img/soff/logo-dark.png",
                                        className: "logoo",
                                        width: "120px",
                                        height: "50px"
                                    })
                                })
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                                className: "ps-form--quick-search",
                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                    style: {
                                        background: "white"
                                    },
                                    className: keyword === "" ? "ps-form__input" : "ps-form__input active_search_input",
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("input", {
                                            ref: inputEl,
                                            autoFocus: true,
                                            className: keyword === "" ? "form-control input2" : "input1 form-control active_search_input",
                                            type: "text",
                                            value: searchTerm,
                                            placeholder: "Izlayotgan mahsulotingizni toping...",
                                            onChange: (e)=>setSearchTerm(e.target.value),
                                            style: {
                                                width: "calc(100% - 30px)"
                                            }
                                        }),
                                        clearTextView
                                    ]
                                })
                            })
                        ]
                    })
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                className: "container ",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd__WEBPACK_IMPORTED_MODULE_10__.Tabs, {
                    className: "order_tabs",
                    destroyInactiveTabPane: true,
                    activeKey: tab,
                    onChange: handleChangeTab,
                    items: tabItems
                })
            })
        ]
    });
};
async function getServerSideProps$1(context) {
    const { keyword ="" , page =1 , tab ="1" , type ="all" , category ="" , parentCategory ="" , order_by ="" , direction ="" , limit =20 , offset =0 , category_id ="" , service_parent ="" , file_type ="" , page_from ="" , page_to ="" , similar_documents ="" ,  } = context.query;
    const deviceId = (0,_shared_utilities_device_id__WEBPACK_IMPORTED_MODULE_20__/* .getOrCreateDeviceId */ .n)({
        req: context.req,
        res: context.res
    });
    const servicesQuery = new URLSearchParams({
        ...category_id && {
            category_id
        },
        ...direction && {
            direction
        },
        limit,
        offset
    });
    const fetchJson = async (url)=>{
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error("Failed to fetch");
            return await res.json();
        } catch (err) {
            return {
                error: err.message
            };
        }
    };
    // ✅ Yangi filterlar qo‘shildi
    const searchUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_19__/* .baseUrlUseApi */ .q}customer/same-google-search/?limit=50${page ? `&page=${page}` : ""}${keyword ? `&search=${keyword}` : ""}${type ? `&type=${type}` : ""}${category ? `&category=${category}` : ""}${order_by ? `&order_by=${order_by}` : ""}${file_type ? `&file_type=${file_type}` : ""}${page_from ? `&page_from=${page_from}` : ""}${page_to ? `&page_to=${page_to}` : ""}${parentCategory ? `&parentCategory=${parentCategory}` : ""}${similar_documents ? `&similar_documents=${similar_documents}` : ""}`;
    const servicesUrl = `${"https://freelance.soff.uz"}/api/v1/customer?${servicesQuery.toString()}&search=${keyword}${service_parent ? `&category_id=${service_parent}` : ""}`;
    const sellersUrl = `${"https://freelance.soff.uz"}/api/v1/users/sellers?limit=${limit}&offset=${offset}&search=${keyword}`;
    const restQueries = {
        fourChildData: null,
        childCategoryData: null,
        searchData: null,
        keyword,
        page,
        type,
        category,
        order_by,
        error: null,
        lastProducts: null,
        service: null,
        serviceParent: null,
        serviceChild: null,
        sellers: null
    };
    switch(tab){
        case "1":
            {
                let productsInitialData = null;
                try {
                    const productsFetch = await fetch(searchUrl, {
                        headers: {
                            "X-Device-ID": deviceId
                        }
                    });
                    productsInitialData = await productsFetch.json();
                } catch (error) {
                    console.error("Error fetching products:", error);
                }
                const searchError = productsInitialData?.error || null;
                return {
                    props: {
                        ...restQueries,
                        error: searchError,
                        searchUrl,
                        productsInitialData: productsInitialData?.results ? productsInitialData : null
                    }
                };
            }
        case "2":
            {
                const servicesInitialData = await fetchJson(servicesUrl);
                return {
                    props: {
                        ...restQueries,
                        error: null,
                        servicesInitialData
                    }
                };
            }
        case "3":
            {
                const sellersInitialData = await fetchJson(sellersUrl);
                return {
                    props: {
                        ...restQueries,
                        sellersInitialData
                    }
                };
            }
        default:
            {
                const [productsInitialData1, servicesInitialData1, sellersInitialData1, ] = await Promise.all([
                    fetchJson(searchUrl),
                    fetchJson(servicesUrl),
                    fetchJson(sellersUrl), 
                ]);
                const searchError1 = productsInitialData1?.error || null;
                return {
                    props: {
                        ...restQueries,
                        error: searchError1,
                        productsInitialData: productsInitialData1?.results ? productsInitialData1 : null,
                        servicesInitialData: servicesInitialData1,
                        sellersInitialData: sellersInitialData1
                    }
                };
            }
    }
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': Search_Results,
    getServerSideProps: getServerSideProps$1
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

const getInitialPropsWrapper = getInitialPropsWrappers['/search-page'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/search-page')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/search-page')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1399:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Search_Results_Products)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _search_page_card_searchResultsProducts_Card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2449);
/* harmony import */ var _search_page_card_searchResultsLoading__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9823);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _search_page_filter_search_results_products_filter__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(3031);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _notFound__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(4817);
/* harmony import */ var _shared_hooks_useScrollToNotFound__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7995);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9752);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(1064);
/* harmony import */ var _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(3801);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_search_page_card_searchResultsProducts_Card__WEBPACK_IMPORTED_MODULE_2__, _search_page_filter_search_results_products_filter__WEBPACK_IMPORTED_MODULE_5__, _notFound__WEBPACK_IMPORTED_MODULE_7__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_10__, _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_11__]);
([_search_page_card_searchResultsProducts_Card__WEBPACK_IMPORTED_MODULE_2__, _search_page_filter_search_results_products_filter__WEBPACK_IMPORTED_MODULE_5__, _notFound__WEBPACK_IMPORTED_MODULE_7__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_10__, _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const currentTab = "1";
function Search_Results_Products({ children , initialData: data ,  }) {
    const { similarDocuments , isFetchingSimilarDocuments  } = (0,_shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .Z)({
        defaultData: data
    });
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const { type ="file" , page ="1" , category ="" , tab ="1" ,  } = router.query;
    // NOTE: Requests Enable property
    const isRequestsEnabled = router.isReady && tab === currentTab;
    const isChildCategoryEnabled = isRequestsEnabled && !!router.query.category;
    const mergedData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return [
            ...data && data.results || [],
            ...isFetchingSimilarDocuments ? Array(10).fill({
                type: "skeleton"
            }) : similarDocuments && similarDocuments.results || [], 
        ];
    }, [
        data,
        similarDocuments,
        isFetchingSimilarDocuments
    ]);
    const { data: childData  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQuery)({
        queryKey: [
            "four-child",
            type
        ],
        queryFn: async ()=>{
            const res = await fetch(`${_repositories_useApi__WEBPACK_IMPORTED_MODULE_10__/* .baseUrlUseApi */ .q}customer/four-child?direction=${type}`);
            return await res.json();
        },
        enabled: isRequestsEnabled
    });
    const { data: parentData  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQuery)({
        queryKey: [
            "child-category",
            category,
            type
        ],
        queryFn: async ()=>{
            const res = await fetch(`${_repositories_useApi__WEBPACK_IMPORTED_MODULE_10__/* .baseUrlUseApi */ .q}customer/four-child?direction=${type}&parent__slug=${category}`);
            return await res.json();
        },
        enabled: isChildCategoryEnabled
    });
    const total = data?.count + (similarDocuments?.count || 0) || 0;
    const notFoundRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const showResults = Array.isArray(mergedData) && mergedData?.length > 0;
    (0,_shared_hooks_useScrollToNotFound__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z)(notFoundRef, showResults, data);
    let resultsContent = null;
    if (showResults) {
        resultsContent = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                mergedData.map((item, index)=>item.type === "skeleton" ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_page_card_searchResultsLoading__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {}, index) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_page_card_searchResultsProducts_Card__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                        product: item
                    }, index)),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_4__.Pagination, {
                    style: {
                        marginBottom: "100px",
                        marginTop: "20px"
                    },
                    current: Number(page),
                    pageSize: 50,
                    total: total,
                    onChange: (newPage)=>{
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                page: newPage
                            }
                        });
                    }
                })
            ]
        });
    } else {
        resultsContent = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_notFound__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
            ref: notFoundRef
        });
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: "Search_Results_Products container",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "Search_Results_Products_Wrap",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "mb-3",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_page_filter_search_results_products_filter__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                                    total: total,
                                    parentData: parentData,
                                    childData: childData,
                                    count: data
                                })
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "Search_Results_Products_Wrap",
                                children: resultsContent
                            })
                        ]
                    })
                }),
                children
            ]
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1706:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9409);
/* harmony import */ var _components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1621);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__]);
_components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];





const LastAddedProductCard = ({ product  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
        href: `/product/${product.slug}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    cursor: "pointer",
                    border: "1px solid #f0f0f0",
                    borderRadius: "12px",
                    padding: "12px",
                    transition: "box-shadow 0.3s ease",
                    boxShadow: "0 0 6px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#fff"
                },
                onMouseEnter: (e)=>e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)",
                onMouseLeave: (e)=>e.currentTarget.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.05)",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        style: {
                            width: "70px",
                            height: "70px",
                            objectFit: "cover",
                            borderRadius: "8px",
                            flexShrink: 0,
                            backgroundColor: "#f5f5f5"
                        },
                        src: product.poster_url,
                        alt: product.slug
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        style: {
                            flex: 1
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h2", {
                                style: {
                                    fontSize: "16px",
                                    fontWeight: 600,
                                    color: "#333",
                                    margin: "0 0 8px 0",
                                    overflowWrap: "anywhere"
                                },
                                children: product.title
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                children: [
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        style: {
                                            color: "white",
                                            padding: "4px 9px",
                                            borderRadius: "4px",
                                            backgroundColor: _components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__/* .fileColors */ .UR[product?.document?.file_type] || "#007DFF"
                                        },
                                        className: "Search_Results_Products_card_boldtype",
                                        children: product?.document?.file_type
                                    }),
                                    "     ",
                                    "Narxi:",
                                    " ",
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                        style: {
                                            fontWeight: 600,
                                            color: "#00a44f"
                                        },
                                        children: [
                                            (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_4__/* .addPeriodToThousands */ .Y)(product.discount_price),
                                            " ",
                                            "so'm"
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LastAddedProductCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 757:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3701);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__]);
_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




// Helper function to validate slug
const isValidSlug = (slug)=>{
    return slug && typeof slug === "string" && slug.trim().length > 0 && slug !== "undefined" && slug !== "null";
};
const LastAddedServiceCard = ({ service  })=>{
    // Don't render if service or slug is invalid
    if (!service || !isValidSlug(service?.slug)) {
        console.warn("LastAddedServiceCard: Invalid service data or slug", service);
        return null;
    }
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_3___default()), {
        href: `/service/${service.slug}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    gap: "6px",
                    cursor: "pointer",
                    border: "1px solid #f0f0f0",
                    borderRadius: "12px",
                    padding: "12px",
                    transition: "box-shadow 0.3s ease",
                    boxShadow: "0 0 6px rgba(0, 0, 0, 0.05)",
                    backgroundColor: "#fff",
                    flexDirection: "column"
                },
                onMouseEnter: (e)=>e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.1)",
                onMouseLeave: (e)=>e.currentTarget.style.boxShadow = "0 0 6px rgba(0, 0, 0, 0.05)",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        style: {
                            color: "#111",
                            fontSize: "16px",
                            fontWeight: "600",
                            overflowWrap: "anywhere"
                        },
                        className: "m-0",
                        children: service?.title
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                        className: "m-0",
                        children: [
                            "Narxi:",
                            " ",
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                style: {
                                    fontWeight: 600,
                                    color: "#00a44f"
                                },
                                children: [
                                    (0,_shared_utilities_product_helper__WEBPACK_IMPORTED_MODULE_2__/* .formatCurrencyWithSpace */ .O$)(service?.price),
                                    " so'm"
                                ]
                            })
                        ]
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LastAddedServiceCard);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 9823:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



function searchResultsLoading() {
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Skeleton.Button, {
        active: true,
        style: {
            width: "100%",
            height: "140px"
        }
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (searchResultsLoading);


/***/ }),

/***/ 2449:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SearchResultsProducts_Card)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9409);
/* harmony import */ var _components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1621);
/* harmony import */ var _shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6603);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_utilities_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1324);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__]);
_components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];








function SearchResultsProducts_Card({ product  }) {
    const { isDesktop  } = (0,_shared_utilities_useResponsive__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z)();
    const { 0: isHovering , 1: setIsHovering  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: previewPosition , 1: setPreviewPosition  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({
        top: "0",
        right: "-420px"
    });
    const imgRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const previewRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(null);
    const updatePreviewPosition = ()=>{
        if (!imgRef.current || !previewRef.current || !isHovering) return;
        const imgRect = imgRef.current.getBoundingClientRect();
        const previewWidth = 400;
        const previewHeight = 400;
        const windowWidth = window.innerWidth;
        const windowHeight = window.innerHeight;
        const padding = 20;
        let top = 0;
        let horizontalPosition = imgRect.width + 10;
        if (imgRect.right + previewWidth + 10 > windowWidth - padding) {
            horizontalPosition = -(previewWidth + 10);
        }
        if (imgRect.top + previewHeight > windowHeight - padding) {
            const spaceBelow = windowHeight - imgRect.top - padding;
            const spaceAbove = imgRect.bottom - padding;
            if (spaceBelow >= previewHeight) {
                top = 0;
            } else if (spaceAbove >= previewHeight) {
                top = Math.max(-(previewHeight - imgRect.height), -(imgRect.top - padding));
            } else {
                if (spaceBelow > spaceAbove) {
                    top = windowHeight - imgRect.top - previewHeight - padding;
                } else {
                    top = -imgRect.top + padding;
                }
            }
        }
        setPreviewPosition({
            top: `${top}px`,
            left: `${horizontalPosition}px`,
            right: "auto"
        });
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isHovering && isDesktop) {
            updatePreviewPosition();
            window.addEventListener("scroll", updatePreviewPosition);
            window.addEventListener("resize", updatePreviewPosition);
            return ()=>{
                window.removeEventListener("scroll", updatePreviewPosition);
                window.removeEventListener("resize", updatePreviewPosition);
            };
        }
    }, [
        isHovering,
        isDesktop
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_5___default()), {
        href: `/product/${product.slug}`,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            target: "_blank",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "Search_Results_Products_card",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "Search_Results_Products_card_body",
                        style: {
                            cursor: "pointer",
                            flex: "1"
                        },
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Breadcrumb, {
                                className: "Breadcrumb",
                                items: [
                                    {
                                        title: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: product?.category_data?.parent || ""
                                        })
                                    },
                                    {
                                        title: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                            children: product?.category_data?.category || ""
                                        })
                                    }, 
                                ]
                            }),
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                className: "Search_Results_Products_card_title",
                                children: product.title
                            }),
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "Search_Results_Products_card_info",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                        className: "Search_Results_Products_card_price",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                className: "fas fa-money-bill price_icon"
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "Search_Results_Products_card_price_boldspan",
                                                children: (0,_components_partials_account_price_formatter__WEBPACK_IMPORTED_MODULE_7__/* .addPeriodToThousands */ .Y)(product.discount_price)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "search_main_info",
                                        children: [
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                className: "Search_Results_Products_card_type",
                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                    style: {
                                                        color: "white",
                                                        padding: "2px 7px",
                                                        borderRadius: "4px",
                                                        backgroundColor: _components_details_components_details_actions_file_actions__WEBPACK_IMPORTED_MODULE_3__/* .fileColors */ .UR[product?.file_type] || "#007DFF"
                                                    },
                                                    className: "Search_Results_Products_card_boldtype",
                                                    children: product.file_type
                                                })
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "Search_Results_Products_card_price",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "fas fa-copy file_icon "
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "Search_Results_Products_card_price_boldspan",
                                                        children: product?.page_count
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                                className: "Search_Results_Products_card_price",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                                        className: "fas fa-database price_icon "
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                        className: "Search_Results_Products_card_price_boldspan",
                                                        children: (0,_shared_utilities_utils__WEBPACK_IMPORTED_MODULE_6__/* .formatFileSize */ .sS)(product?.file_size)
                                                    })
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "Search_Results_Products_card_img",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                ref: imgRef,
                                src: product.poster,
                                alt: product.title,
                                onMouseEnter: ()=>setIsHovering(true),
                                onMouseLeave: ()=>setIsHovering(false)
                            }),
                            isHovering && isDesktop && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                ref: previewRef,
                                style: {
                                    position: "absolute",
                                    top: previewPosition.top,
                                    right: previewPosition.right,
                                    left: previewPosition.left,
                                    width: "400px",
                                    height: "400px",
                                    border: "2px solid rgba(255, 255, 255, 0.8)",
                                    borderRadius: "8px",
                                    overflow: "hidden",
                                    backgroundColor: "white",
                                    boxShadow: "0 8px 25px rgba(0, 0, 0, 0.3)",
                                    zIndex: 1000,
                                    pointerEvents: "none"
                                },
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                    src: product.poster,
                                    alt: product.title,
                                    style: {
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "contain",
                                        display: "block"
                                    }
                                })
                            })
                        ]
                    })
                ]
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3031:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1185);
/* harmony import */ var react_icons_lu__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(577);
/* harmony import */ var react_icons_fa6__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7333);
/* harmony import */ var react_icons_md__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6905);
/* harmony import */ var react_icons_pi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1154);
/* harmony import */ var _shared_hooks_useMounted__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3735);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_io5__WEBPACK_IMPORTED_MODULE_5__, react_icons_lu__WEBPACK_IMPORTED_MODULE_6__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_7__, react_icons_md__WEBPACK_IMPORTED_MODULE_8__, react_icons_pi__WEBPACK_IMPORTED_MODULE_9__]);
([react_icons_io5__WEBPACK_IMPORTED_MODULE_5__, react_icons_lu__WEBPACK_IMPORTED_MODULE_6__, react_icons_fa6__WEBPACK_IMPORTED_MODULE_7__, react_icons_md__WEBPACK_IMPORTED_MODULE_8__, react_icons_pi__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













const fileTypes = [
    {
        label: "Barchasi",
        value: ""
    },
    {
        label: "DOCX",
        value: "docx"
    },
    {
        label: "DOC",
        value: "doc"
    },
    {
        label: "PPTX",
        value: "pptx"
    },
    {
        label: "PPT",
        value: "ppt"
    },
    {
        label: "PDF",
        value: "pdf"
    }, 
];
const { Option  } = antd__WEBPACK_IMPORTED_MODULE_1__.Select;
const orders = [
    {
        label: "Narx (arzon)",
        value: "price"
    },
    {
        label: "Narx (qimmat)",
        value: "-price"
    },
    {
        label: "Ko'p ko‘rilganlar bo‘yicha",
        value: "views"
    },
    {
        label: "Ko‘p xarid qilingan",
        value: "purchased_count"
    }, 
];
const allTypes = [
    {
        title: "Barchasi",
        value: "all",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.AppstoreOutlined, {})
    },
    {
        title: "Fayllar",
        value: "file",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.FileTextOutlined, {})
    },
    {
        title: "3D modellar",
        value: "3d",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.PictureOutlined, {})
    },
    {
        title: "Dizayn shablonlar",
        value: "design",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.LayoutOutlined, {})
    },
    {
        title: "Turli shablonlar",
        value: "template",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.CodeOutlined, {})
    },
    {
        title: "Veb saytlar",
        value: "website",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.GlobalOutlined, {})
    },
    {
        title: "Videolar",
        value: "video",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.VideoCameraOutlined, {})
    }, 
];
const defaultValues = {
    type: "file",
    file_type: "",
    parentCategory: "",
    category: "",
    order_by: "",
    pageRange: [
        1,
        100
    ]
};
function SearchResultsProductsFilter({ total , childData  }) {
    const { 0: filterOpen , 1: setFilterOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(false);
    const isMounted = (0,_shared_hooks_useMounted__WEBPACK_IMPORTED_MODULE_10__/* .useMounted */ .s)(200);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const mutationsInForm = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>{
        if (!isMounted) {
            return {
                hasMutation: false,
                howManyMutations: 0
            };
        }
        let hasMutation = false;
        let howManyMutations = 0;
        Object.keys(defaultValues).forEach((key)=>{
            if (router.query[key] && router.query[key] !== defaultValues[key]) {
                hasMutation = true;
                howManyMutations += 1;
            }
        });
        return {
            hasMutation,
            howManyMutations
        };
    }, [
        router.query,
        isMounted
    ]);
    const handleClearAll = ()=>{
        const newQueries = {
            ...router.query
        };
        delete newQueries.type;
        delete newQueries.file_type;
        delete newQueries.parentCategory;
        delete newQueries.category;
        delete newQueries.order_by;
        delete newQueries.page_from;
        delete newQueries.page_to;
        router.push({
            pathname: router.pathname,
            query: {
                page: 1,
                keyword: router.query.keyword || "",
                type: "file"
            }
        }, undefined, {
            scroll: false
        });
    };
    const deleteQuerySelectively = (...keys)=>{
        const newParams = {
            ...router.query
        };
        keys.forEach((key)=>{
            delete newParams[key];
        });
        router.push({
            pathname: router.pathname,
            query: {
                ...newParams,
                page: 1
            }
        }, undefined, {
            scroll: false
        });
    };
    const filterIndicatorSelectors = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>{
        const currentType = allTypes.find((type)=>type.value == router.query.type);
        const currentFileType = fileTypes.find((type)=>type.value == router.query.file_type);
        const currentParentCategory = childData?.results?.find((cat)=>cat.slug === router.query.parentCategory);
        const currentOrderBy = orders.find((order)=>order.value === router.query.order_by);
        return [
            {
                key: "type",
                icon: currentType?.icon,
                title: currentType?.title,
                isEnabled: !!router.query.type,
                disabled: defaultValues.type === router.query.type,
                disabledTooltip: "Bu qiymat standart sozlamaligi uchun o'chira olmaysiz, filtr orqali o'zgartiring",
                tooltip: "Turi",
                action: ()=>deleteQuerySelectively("type")
            },
            {
                key: "file_type",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_lu__WEBPACK_IMPORTED_MODULE_6__.LuFileType2, {}),
                title: currentFileType?.label,
                tooltip: "Fayl turi",
                isEnabled: !!router.query.file_type,
                action: ()=>deleteQuerySelectively("file_type")
            },
            {
                key: "parentCategory",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_fa6__WEBPACK_IMPORTED_MODULE_7__.FaRegFile, {}),
                title: currentParentCategory?.name,
                tooltip: "Katta kategoriya",
                isEnabled: !!router.query.parentCategory,
                action: ()=>deleteQuerySelectively("parentCategory", "category")
            },
            {
                key: "order_by",
                isEnabled: !!router.query.order_by,
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_pi__WEBPACK_IMPORTED_MODULE_9__.PiSortDescendingBold, {
                    fontSize: 16
                }),
                tooltip: "Saralash",
                title: currentOrderBy?.label,
                action: ()=>deleteQuerySelectively("order_by")
            },
            {
                key: "page_range-from",
                isEnabled: !!router.query.page_from || Number(router.query.page_to || 100) < 100,
                disabled: !router.query.page_from,
                tooltip: "Betlar soni dan",
                disabledTooltip: "Bu qiymat standart sozlamaligi uchun o'chira olmaysiz, avval bet gacha qiymatini o'chiring",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_8__.MdOutlineFirstPage, {
                    fontSize: 16
                }),
                title: `Bet dan: ${router.query.page_from || 1}`,
                action: ()=>deleteQuerySelectively("page_from")
            },
            {
                key: "page_range-to",
                isEnabled: !!router.query.page_to || Number(router.query.page_from || 1) > 1,
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_md__WEBPACK_IMPORTED_MODULE_8__.MdOutlineLastPage, {
                    fontSize: 16
                }),
                tooltip: "Betlar soni gacha",
                disabledTooltip: "Bu qiymat standart sozlamaligi uchun o'chira olmaysiz, avval bet dan qiymatini o'chiring",
                title: `Bet gacha: ${router.query.page_to || 100}`,
                disabled: !router.query.page_to,
                action: ()=>deleteQuerySelectively("page_to")
            }, 
        ];
    }, [
        router.query,
        childData
    ]);
    const onClose = ()=>{
        setFilterOpen(false);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "Search_Results_Products_form_box",
        children: [
            mutationsInForm.hasMutation ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Card, {
                className: "search_results_filter_card",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "filter_card_action_btns",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "filter_indicators",
                            children: [
                                filterIndicatorSelectors.filter((selector)=>selector.isEnabled).map((selector)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
                                        placement: "top",
                                        title: selector.disabled ? selector.disabledTooltip : selector.tooltip,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                            color: "light",
                                            icon: selector.icon,
                                            className: "filter-indicator-button",
                                            disabled: selector.disabled,
                                            onClick: selector.action,
                                            children: [
                                                selector.title,
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_4__.CloseCircleOutlined, {
                                                    style: {
                                                        marginLeft: "4px"
                                                    }
                                                })
                                            ]
                                        })
                                    }, selector.key)),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Tooltip, {
                                    placement: "top",
                                    title: "Barcha filterlarni tozalash",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                        color: "danger",
                                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoClose, {}),
                                        onClick: handleClearAll,
                                        iconPosition: "end",
                                        className: "filter-danger"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Badge, {
                            count: mutationsInForm.howManyMutations,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoFilter, {}),
                                type: "primary",
                                onClick: ()=>setFilterOpen(true),
                                style: {
                                    width: "auto"
                                },
                                children: "Filter"
                            })
                        })
                    ]
                })
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "search_results_indicator",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "countProduct text-nowrap m-0",
                        children: `${total} ta mahsulot topildi`
                    }),
                    !mutationsInForm.hasMutation && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Badge, {
                            count: mutationsInForm.howManyMutations,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoFilter, {}),
                                type: "primary",
                                onClick: ()=>setFilterOpen(true),
                                style: {
                                    width: "auto"
                                },
                                children: "Filter"
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FilterFormDrawer, {
                open: filterOpen,
                childData: childData,
                onClose: onClose
            })
        ]
    });
}
const FilterFormDrawer = ({ open , childData , onClose  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const initialFilterValues = (0,react__WEBPACK_IMPORTED_MODULE_3__.useMemo)(()=>({
            type: router.query.type || "file",
            file_type: router.query.file_type || "",
            parentCategory: router.query.parentCategory || "",
            category: router.query.category || "",
            order_by: router.query.order_by || "",
            pageRange: [
                Number(router.query.page_from) || 1,
                Number(router.query.page_to) || 100, 
            ]
        }), [
        router.query
    ]);
    const { 0: filterValues , 1: setFilterValues  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(initialFilterValues);
    const handleChangeFilterValues = (key, value)=>{
        setFilterValues((prev)=>{
            if (typeof key === "object") {
                return {
                    ...prev,
                    ...key
                };
            }
            return {
                ...prev,
                [key]: value
            };
        });
    };
    const handleSaveFilters = ()=>{
        const { pageRange , ...restFilterValues } = filterValues;
        const newQueries = {
            ...router.query
        };
        router.push({
            pathname: router.pathname,
            query: {
                ...newQueries,
                ...restFilterValues,
                page_from: pageRange[0] === 1 ? "" : pageRange[0],
                page_to: pageRange[1] === 100 ? "" : pageRange[1],
                page: 1
            }
        }, undefined, {
            scroll: false
        });
        onClose();
    };
    const handleClear = ()=>{
        setFilterValues(defaultValues);
    };
    const handleSaveAndClose = ()=>{
        handleSaveFilters();
        onClose();
    };
    const saveAndCloseForm = (e)=>{
        e.preventDefault();
        handleSaveAndClose();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        setFilterValues(initialFilterValues);
    }, [
        initialFilterValues
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Drawer, {
        title: "Filterlar",
        placement: "left",
        onClose: handleSaveAndClose,
        open: open,
        closable: false,
        extra: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Space, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                onClick: onClose,
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoClose, {
                    fontSize: 20
                }),
                type: "text"
            })
        }),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
            onSubmit: saveAndCloseForm,
            className: "search_results_filter_form",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Select, {
                    style: {
                        width: "100%"
                    },
                    value: filterValues.type,
                    onClear: handleClear,
                    onChange: (value)=>handleChangeFilterValues({
                            type: value,
                            parentCategory: "",
                            category: "",
                            file_type: "",
                            pageRange: [
                                1,
                                100
                            ]
                        }),
                    children: allTypes.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Option, {
                            value: item.value,
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                className: "d-flex align-items-center gap-2",
                                children: [
                                    item.icon,
                                    " ",
                                    item.title
                                ]
                            })
                        }, item.value))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Select, {
                    style: {
                        width: "100%"
                    },
                    placeholder: "Fayl turi",
                    value: filterValues.file_type || undefined,
                    disabled: filterValues?.type !== "file",
                    allowClear: true,
                    onClear: ()=>handleChangeFilterValues({
                            file_type: ""
                        }),
                    onChange: (value)=>handleChangeFilterValues({
                            file_type: value
                        }),
                    options: fileTypes
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Select, {
                    style: {
                        width: "100%"
                    },
                    placeholder: "Katta kategoriya",
                    value: filterValues.parentCategory || undefined,
                    disabled: !filterValues.type || filterValues.type === "all",
                    allowClear: true,
                    onClear: ()=>handleChangeFilterValues({
                            parentCategory: "",
                            category: ""
                        }),
                    onChange: (value)=>{
                        const selected = childData?.results?.find((cat)=>cat.slug === value);
                        handleChangeFilterValues({
                            parentCategory: selected?.slug || "",
                            category: selected?.id
                        });
                    },
                    options: childData?.results?.map((cat)=>({
                            value: cat.slug,
                            label: cat.name
                        }))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Select, {
                    placeholder: "Saralash",
                    style: {
                        width: "100%",
                        maxWidth: "159px"
                    },
                    value: filterValues.order_by || undefined,
                    allowClear: true,
                    onClear: ()=>handleChangeFilterValues({
                            order_by: ""
                        }),
                    onChange: (value)=>handleChangeFilterValues({
                            order_by: value
                        }),
                    options: orders
                }),
                filterValues.type === "file" && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "ranger p-2 border rounded bg-light",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "mb-0 fw-medium small",
                            children: "Betlar soni"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Slider, {
                            range: true,
                            min: 1,
                            max: 100,
                            value: filterValues.pageRange,
                            onChange: (val)=>handleChangeFilterValues("pageRange", val),
                            style: {
                                margin: "6px"
                            }
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "d-flex justify-content-between",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-muted small",
                                    children: [
                                        filterValues.pageRange[0],
                                        " bet"
                                    ]
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                    className: "text-muted small",
                                    children: [
                                        filterValues.pageRange[1],
                                        " bet"
                                    ]
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "actions",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                            type: "default",
                            htmlType: "reset",
                            block: true,
                            onClick: handleClear,
                            children: "Tozalash"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Button, {
                            htmlType: "submit",
                            type: "primary",
                            block: true,
                            children: "Qo‘llash"
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchResultsProductsFilter);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 3964:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SearchResultsProductsFilter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_hooks_useMounted__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3735);
/* harmony import */ var react_icons_io5__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1185);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_icons_bi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6157);
/* harmony import */ var react_icons_ai__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(7425);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9752);
/* harmony import */ var _store_profile_slice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9880);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_icons_io5__WEBPACK_IMPORTED_MODULE_5__, react_icons_bi__WEBPACK_IMPORTED_MODULE_7__, react_icons_ai__WEBPACK_IMPORTED_MODULE_8__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_10__]);
([react_icons_io5__WEBPACK_IMPORTED_MODULE_5__, react_icons_bi__WEBPACK_IMPORTED_MODULE_7__, react_icons_ai__WEBPACK_IMPORTED_MODULE_8__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const defaultValues = {
    direction: "",
    service_parent: undefined
};
function SearchResultsProductsFilter({ total  }) {
    const { 0: filterOpen , 1: setFilterOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const isMounted = (0,_shared_hooks_useMounted__WEBPACK_IMPORTED_MODULE_4__/* .useMounted */ .s)(200);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { 0: categoriesList , 1: setCategoriesList  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
    const { data: directionsData  } = (0,_store_profile_slice__WEBPACK_IMPORTED_MODULE_10__/* .useGetDirectionsQuery */ .P5)();
    const directions = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return [
            {
                label: "Barchasi",
                value: ""
            },
            ...directionsData || [], 
        ].filter(Boolean);
    }, [
        directionsData
    ]);
    const mutationsInForm = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        if (!isMounted) {
            return {
                hasMutation: false,
                howManyMutations: 0
            };
        }
        let hasMutation = false;
        let howManyMutations = 0;
        Object.keys(defaultValues).forEach((key)=>{
            if (router.query[key] && router.query[key] !== defaultValues[key]) {
                hasMutation = true;
                howManyMutations += 1;
            }
        });
        return {
            hasMutation,
            howManyMutations
        };
    }, [
        router.query,
        isMounted
    ]);
    const handleClearAll = ()=>{
        const newQueries = {
            ...router.query
        };
        newQueries.offset = 0;
        newQueries.limit = 50;
        delete newQueries.direction;
        delete newQueries.service_parent;
        router.push({
            pathname: router.pathname,
            query: newQueries
        }, undefined, {
            scroll: false
        });
    };
    const deleteQuerySelectively = (...keys)=>{
        const newParams = {
            ...router.query
        };
        keys.forEach((key)=>{
            delete newParams[key];
        });
        router.push({
            pathname: router.pathname,
            query: {
                ...newParams,
                page: 1
            }
        }, undefined, {
            scroll: false
        });
    };
    const filterIndicatorSelectors = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const currentType = directions?.find((type)=>type?.value == router.query.direction);
        const currentFileType = categoriesList.find((type)=>type.value == router.query.service_parent);
        return [
            {
                key: "direction",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_ai__WEBPACK_IMPORTED_MODULE_8__.AiOutlineApartment, {}),
                title: currentType?.label,
                isEnabled: !!router.query.direction,
                disabled: defaultValues.direction === router.query.direction || router.query.service_parent,
                disabledTooltip: "Yo‘nalishni o'chirish uchun kategoriyani avval tozalang",
                tooltip: "Yo‘nalish",
                action: ()=>deleteQuerySelectively("direction")
            },
            {
                key: "service_parent",
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_bi__WEBPACK_IMPORTED_MODULE_7__.BiCategory, {}),
                title: currentFileType?.label,
                tooltip: "Kategoriya",
                isEnabled: !!router.query.service_parent,
                action: ()=>deleteQuerySelectively("service_parent")
            }, 
        ];
    }, [
        router.query,
        directions,
        categoriesList
    ]);
    const onClose = ()=>{
        setFilterOpen(false);
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "Search_Results_Products_form_box",
        children: [
            mutationsInForm.hasMutation ? // <Badge.Ribbon text="Faol filterlar" placement="start">
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Card, {
                className: "search_results_filter_card",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "filter_card_action_btns",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "filter_indicators",
                            children: [
                                filterIndicatorSelectors.filter((selector)=>selector.isEnabled).map((selector)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                                        placement: "top",
                                        title: selector.disabled ? selector.disabledTooltip : selector.tooltip,
                                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                            color: "light",
                                            icon: selector.icon,
                                            className: "filter-indicator-button",
                                            disabled: selector.disabled,
                                            onClick: selector.action,
                                            children: [
                                                selector.title,
                                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_6__.CloseCircleOutlined, {
                                                    style: {
                                                        marginLeft: "4px"
                                                    }
                                                })
                                            ]
                                        })
                                    }, selector.key)),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Tooltip, {
                                    placement: "top",
                                    title: "Barcha filterlarni tozalash",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                        color: "danger",
                                        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoClose, {}),
                                        onClick: handleClearAll,
                                        iconPosition: "end",
                                        className: "filter-danger"
                                    })
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                            count: mutationsInForm.howManyMutations,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoFilter, {}),
                                type: "primary",
                                onClick: ()=>setFilterOpen(true),
                                style: {
                                    width: "auto"
                                },
                                children: "Filter"
                            })
                        })
                    ]
                })
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "search_results_indicator",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                        className: "countProduct text-nowrap m-0",
                        children: total ? `${total} ta xizmat topildi` : ""
                    }),
                    !mutationsInForm.hasMutation && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Badge, {
                            count: mutationsInForm.howManyMutations,
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoFilter, {}),
                                type: "primary",
                                onClick: ()=>setFilterOpen(true),
                                style: {
                                    width: "auto"
                                },
                                children: "Filter"
                            })
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(FilterFormDrawer, {
                open: filterOpen,
                onClose: onClose,
                setCategoriesList: setCategoriesList,
                directions: directions
            })
        ]
    });
}
const FilterFormDrawer = ({ open , onClose , directions , setCategoriesList  })=>{
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const initialFilterValues = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return {
            direction: router.query.direction || "",
            service_parent: router.query.service_parent || undefined,
            category_id: router.query.category_id || undefined
        };
    }, [
        router.query
    ]);
    const { 0: filterValues , 1: setFilterValues  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(initialFilterValues);
    const { data: parentData  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useQuery)({
        queryKey: [
            "service-parent",
            filterValues.direction
        ],
        queryFn: async ()=>{
            const res = await fetch(`${"https://freelance.soff.uz"}/api/v1/categories?direction=${filterValues.direction}`);
            return await res.json();
        },
        enabled: !!filterValues.direction && filterValues.direction !== "all"
    });
    const categories = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        return (parentData || []).map((parent)=>({
                label: parent.title,
                value: String(parent.id)
            }));
    }, [
        parentData
    ]);
    const handleChangeFilterValues = (key, value)=>{
        setFilterValues((prev)=>{
            if (typeof key === "object") {
                return {
                    ...prev,
                    ...key
                };
            }
            return {
                ...prev,
                [key]: value
            };
        });
    };
    const handleSaveFilters = ()=>{
        const validFilterValues = Object.keys(filterValues).reduce((obj, key)=>{
            obj[key] = filterValues[key];
            return obj;
        }, {});
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                ...validFilterValues
            }
        }, undefined, {
            scroll: false
        });
        onClose();
    };
    const handleClear = ()=>{
        setFilterValues(defaultValues);
    };
    const handleSaveAndClose = ()=>{
        handleSaveFilters();
        onClose();
    };
    const saveAndCloseForm = (e)=>{
        e.preventDefault();
        handleSaveAndClose();
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setFilterValues(initialFilterValues);
    }, [
        initialFilterValues
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setCategoriesList(categories);
    }, [
        categories
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Drawer, {
        title: "Filterlar",
        placement: "left",
        onClose: handleSaveAndClose,
        open: open,
        closable: false,
        extra: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Space, {
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                onClick: onClose,
                icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_icons_io5__WEBPACK_IMPORTED_MODULE_5__.IoClose, {
                    fontSize: 20
                }),
                type: "text"
            })
        }),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("form", {
            className: "search_results_filter_form",
            onSubmit: saveAndCloseForm,
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Select, {
                    style: {
                        width: "100%",
                        maxWidth: "159px"
                    },
                    placeholder: "Yo‘nalish",
                    value: filterValues.direction,
                    onChange: (value)=>handleChangeFilterValues({
                            direction: value,
                            service_parent: undefined
                        }),
                    options: directions
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Select, {
                    style: {
                        width: "100%",
                        maxWidth: "159px"
                    },
                    placeholder: "Katta kategoriya",
                    value: filterValues.service_parent,
                    allowClear: true,
                    disabled: !(categories.length && filterValues.direction),
                    onClear: ()=>handleChangeFilterValues({
                            service_parent: ""
                        }),
                    onChange: (value)=>handleChangeFilterValues({
                            service_parent: value
                        }),
                    options: categories
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "actions",
                    style: {
                        marginTop: "15px"
                    },
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            type: "default",
                            htmlType: "reset",
                            block: true,
                            onClick: handleClear,
                            children: "Tozalash"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                            htmlType: "submit",
                            type: "primary",
                            block: true,
                            children: "Qo‘llash"
                        })
                    ]
                })
            ]
        })
    });
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7448:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ SearchResultsSpecialists_Filter)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function SearchResultsSpecialists_Filter({ total  }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
        className: "countSpecialist",
        children: [
            total > 0 ? `${total} ta mutaxassis` : "Mutaxasislar yo'q",
            " "
        ]
    });
}


/***/ }),

/***/ 3934:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _search_page_card_lastAddedProductCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1706);
/* harmony import */ var _search_page_card_lastAddedServiceCard__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(757);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_search_page_card_lastAddedProductCard__WEBPACK_IMPORTED_MODULE_1__, _search_page_card_lastAddedServiceCard__WEBPACK_IMPORTED_MODULE_2__]);
([_search_page_card_lastAddedProductCard__WEBPACK_IMPORTED_MODULE_1__, _search_page_card_lastAddedServiceCard__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);




const SerachSide = ({ createBtn , topServices , topServicesLoading , lastProducts , lastProductsLoading ,  })=>{
    let topServicesContent = null;
    if (topServicesLoading) {
        topServicesContent = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: Array(12).fill(0).map((_, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                    active: true,
                    className: "Search_Results_Wrap_skeleton"
                }, i))
        });
    } else if (topServices?.items?.length) {
        topServicesContent = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                    style: {
                        fontSize: "20px",
                        fontWeight: 400
                    },
                    className: "similar_title",
                    children: "Tavsiya etiladigan xizmatlar"
                }),
                topServices?.items?.map((s)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mb-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_page_card_lastAddedServiceCard__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                            service: s
                        })
                    }, s?.id))
            ]
        });
    }
    let lastProductsContent = null;
    if (lastProductsLoading) {
        lastProductsContent = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: Array(12).fill(0).map((_, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Skeleton, {
                    active: true,
                    className: "Search_Results_Wrap_skeleton"
                }, i))
        });
    } else if (lastProducts?.results?.length) {
        lastProductsContent = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                lastProducts?.results && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                    style: {
                        fontSize: "20px",
                        fontWeight: 400,
                        borderTop: "1px solid rgba(0,0,0,0.2)",
                        paddingTop: "10px"
                    },
                    className: "similar_title",
                    children: "So'ngi yuklangan mahsulotlar"
                }),
                lastProducts?.results?.map((p, i)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: "mb-4",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_page_card_lastAddedProductCard__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                            product: p
                        })
                    }, i))
            ]
        });
    }
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "forAdds p-5",
        children: [
            topServicesContent,
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "d-flex justify-content-center mb-3",
                children: createBtn()
            }),
            lastProductsContent
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SerachSide);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8429:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Search_Results_Services)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _notFound__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4817);
/* harmony import */ var _entities_service_service_card__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(681);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_hooks_useScrollToNotFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7995);
/* harmony import */ var _search_page_filter_search_results_services_filter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(3964);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_notFound__WEBPACK_IMPORTED_MODULE_3__, _entities_service_service_card__WEBPACK_IMPORTED_MODULE_4__, _search_page_filter_search_results_services_filter__WEBPACK_IMPORTED_MODULE_7__]);
([_notFound__WEBPACK_IMPORTED_MODULE_3__, _entities_service_service_card__WEBPACK_IMPORTED_MODULE_4__, _search_page_filter_search_results_services_filter__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function Search_Results_Services({ children , initialData: data ,  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const notFoundRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const { offset: queryOffset  } = router.query;
    const limit = 50;
    const offset = Number(queryOffset || 0);
    const currentPage = Math.floor(offset / limit) + 1;
    const showResults = Array.isArray(data?.items) && data?.items?.length > 0;
    (0,_shared_hooks_useScrollToNotFound__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(notFoundRef, showResults, data);
    let showResultsContent = null;
    if (showResults) {
        showResultsContent = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "Search_Results_Services_wrap",
                    children: data?.items?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_service_service_card__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            service: item
                        }, index))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Pagination, {
                    style: {
                        marginBottom: "100px",
                        marginTop: "20px"
                    },
                    pageSize: limit,
                    current: currentPage,
                    total: data?.total_service,
                    pageSizeOptions: [],
                    onChange: (newPage)=>{
                        const newOffset = (newPage - 1) * limit;
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                offset: newOffset,
                                limit
                            }
                        });
                    }
                })
            ]
        });
    } else {
        showResultsContent = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_notFound__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            ref: notFoundRef
        });
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const defineDirection = async ()=>{
            const rankingsMap = new Map();
            if (data?.total_service) {
                data.items.forEach((service)=>{
                    if (rankingsMap.has(service.category?.direction)) {
                        const currentUsageNumber = rankingsMap.get(service.category?.direction);
                        rankingsMap.set(service.category?.direction, ++currentUsageNumber);
                    } else {
                        rankingsMap.set(service.category?.direction, 1);
                    }
                });
                const heighestUsageDetect = [
                    ...rankingsMap.entries()
                ];
                let max = -Infinity;
                let direction = null;
                for(let i = 0; i < heighestUsageDetect.length; i++){
                    const [key, value] = heighestUsageDetect[i];
                    if (value > max) {
                        max = value;
                        direction = key;
                    }
                }
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        ts_direction: direction
                    }
                }, undefined, {
                    shallow: true
                });
            }
        };
        defineDirection();
    }, [
        data
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "Search_Results_Products container",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "d-flex",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-100",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "mb-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_page_filter_search_results_services_filter__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                                count: data,
                                total: data?.total_service
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: showResultsContent
                        })
                    ]
                })
            }),
            children
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5349:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Search_Results_Specialists)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _search_page_filter_search_results_specialists_filter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7448);
/* harmony import */ var _notFound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4817);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _shared_hooks_useScrollToNotFound__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(7995);
/* harmony import */ var _entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(2414);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_notFound__WEBPACK_IMPORTED_MODULE_4__, _entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_7__]);
([_notFound__WEBPACK_IMPORTED_MODULE_4__, _entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








const currentTab = "3";
function Search_Results_Specialists({ children , initialData: data ,  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const notFoundRef = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)();
    const { offset: queryOffset  } = router.query;
    const limit = 51;
    const offset = Number(queryOffset || 0);
    const currentPage = Math.floor(offset / limit) + 1;
    const showResults = Array.isArray(data?.results) && data?.results?.length > 0;
    (0,_shared_hooks_useScrollToNotFound__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z)(notFoundRef, showResults, data);
    let resultsContent = null;
    if (showResults) {
        resultsContent = /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "Search_Results_Specialists_Wrap",
                    children: data.results.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_seller_search_seller_card__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                            seller: item
                        }, item?.soff_seller_id))
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Pagination, {
                    style: {
                        marginBottom: "100px",
                        marginTop: "20px"
                    },
                    pageSize: limit,
                    current: currentPage,
                    pageSizeOptions: [],
                    total: data?.count,
                    onChange: (newPage)=>{
                        const newOffset = (newPage - 1) * limit;
                        router.push({
                            pathname: router.pathname,
                            query: {
                                ...router.query,
                                offset: newOffset,
                                limit
                            }
                        });
                    }
                })
            ]
        });
    } else {
        resultsContent = /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_notFound__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
            ref: notFoundRef
        });
    }
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        const defineDirection = async ()=>{
            const rankingsMap = new Map();
            if (data?.count) {
                data.results.forEach((specialist)=>{
                    if (rankingsMap.has(specialist.position?.position_direction)) {
                        const currentUsageNumber = rankingsMap.get(specialist.position?.position_direction);
                        rankingsMap.set(specialist.position?.position_direction, ++currentUsageNumber);
                    } else {
                        rankingsMap.set(specialist.position?.position_direction, 1);
                    }
                });
                const heighestUsageDetect = [
                    ...rankingsMap.entries()
                ];
                let max = -Infinity;
                let direction = null;
                for(let i = 0; i < heighestUsageDetect.length; i++){
                    const [key, value] = heighestUsageDetect[i];
                    if (value > max) {
                        max = value;
                        direction = key;
                    }
                }
                router.push({
                    pathname: router.pathname,
                    query: {
                        ...router.query,
                        ts_direction: direction
                    }
                }, undefined, {
                    shallow: true
                });
            }
        };
        defineDirection();
    }, [
        data
    ]);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "Search_Results_Products container",
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "d-flex",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "w-100",
                    children: [
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                marginBottom: "26px"
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_search_page_filter_search_results_specialists_filter__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                                total: data?.count
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: resultsContent
                        })
                    ]
                })
            }),
            children
        ]
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5922:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ NextImageCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6598);






function NextImageCard({ url , width , height , clasS , payload , detail ,  }) {
    const { 0: up , 1: setUp  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    const { startTimeout , stopTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_3__/* .useTimeManager */ .h)();
    const handleUp = ()=>{
        setUp(false);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const timing = startTimeout(()=>{
            setUp(false);
        }, 3000);
        return ()=>stopTimeout(timing);
    }, [
        up
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `${(payload?.document?.content_type === "video" || payload?.document?.content_type === "audio") && "video_poster"}`,
        children: payload?.document?.content_type === "video" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "video_poster_fon",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "fa-regular fa-circle-play"
                    })
                }),
                url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                    src: url,
                    width: width,
                    height: height,
                    alt: url,
                    className: clasS,
                    objectFit: "contain",
                    unoptimized: true
                })
            ]
        }) : payload?.document?.content_type === "audio" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "video_poster_fon",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "fa-solid fa-music"
                    })
                }),
                url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                    src: url,
                    width: width,
                    height: height,
                    alt: url,
                    className: clasS,
                    objectFit: "contain",
                    unoptimized: true
                })
            ]
        }) : detail ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            onClick: ()=>handleUp(),
            className: ` ${up && "product_priview"} `,
            children: [
                url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                    src: url,
                    width: width,
                    height: height,
                    alt: url,
                    className: clasS,
                    objectFit: "contain",
                    unoptimized: true
                }),
                up && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "up_left",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "fa-solid fa-angles-up fa-bounce"
                    })
                })
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                src: url,
                width: width,
                height: height,
                alt: url,
                className: clasS,
                objectFit: "contain",
                unoptimized: true
            })
        })
    });
}


/***/ }),

/***/ 1275:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useDebounce)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useTimeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6598);


function useDebounce(value, delay) {
    const { startTimeout , stopTimeout  } = (0,_useTimeManager__WEBPACK_IMPORTED_MODULE_1__/* .useTimeManager */ .h)();
    const { 0: debouncedValue , 1: setDebouncedValue  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(value);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const handler = startTimeout(()=>{
            setDebouncedValue(value);
        }, delay);
        return ()=>{
            stopTimeout(handler);
        };
    }, [
        value,
        delay
    ]);
    return debouncedValue;
}


/***/ }),

/***/ 3735:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "s": () => (/* binding */ useMounted)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useTimeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6598);


const useMounted = (timer)=>{
    const { 0: isMounted , 1: setIsMounted  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const { startTimeout , stopTimeout  } = (0,_useTimeManager__WEBPACK_IMPORTED_MODULE_1__/* .useTimeManager */ .h)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        const timeoutId = startTimeout(()=>{
            setIsMounted(true);
        }, timer || 10);
        return ()=>stopTimeout(timeoutId);
    }, [
        timer
    ]);
    return isMounted;
};


/***/ }),

/***/ 7995:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _useTimeManager__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6598);


function useScrollToNotFound(ref, showResults, data) {
    const { startTimeout , stopTimeout  } = (0,_useTimeManager__WEBPACK_IMPORTED_MODULE_1__/* .useTimeManager */ .h)();
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (!showResults && ref?.current) {
            const timing = startTimeout(()=>{
                ref.current.scrollIntoView({
                    behavior: "smooth"
                });
            }, 1000);
            return ()=>stopTimeout(timing);
        }
    }, [
        showResults,
        ref,
        data
    ]);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (useScrollToNotFound);


/***/ }),

/***/ 9894:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "n": () => (/* binding */ getOrCreateDeviceId)
/* harmony export */ });
/* harmony import */ var uuid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6555);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4802);
/* harmony import */ var cookie__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(cookie__WEBPACK_IMPORTED_MODULE_1__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([uuid__WEBPACK_IMPORTED_MODULE_0__]);
uuid__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];


function getOrCreateDeviceId({ req , res  } = {}) {
    try {
        const cookies = cookie__WEBPACK_IMPORTED_MODULE_1__.parse(req.headers.cookie || "");
        let deviceId = cookies.device_id;
        if (!deviceId) {
            deviceId = (0,uuid__WEBPACK_IMPORTED_MODULE_0__.v4)();
            res.setHeader("Set-Cookie", cookie__WEBPACK_IMPORTED_MODULE_1__.serialize("device_id", deviceId, {
                path: "/",
                maxAge: 365 * 24 * 60 * 60
            }));
        }
        return deviceId;
    } catch (error) {
        console.error("Error getting or creating device ID:", error);
        return null;
    }
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7066:
/***/ ((module) => {

module.exports = require("@ant-design/icons");

/***/ }),

/***/ 6946:
/***/ ((module) => {

module.exports = require("@ant-design/icons/ShareAltOutlined");

/***/ }),

/***/ 8097:
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 5725:
/***/ ((module) => {

module.exports = require("antd");

/***/ }),

/***/ 4802:
/***/ ((module) => {

module.exports = require("cookie");

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

/***/ 8176:
/***/ ((module) => {

module.exports = require("react-spinners");

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

/***/ 9752:
/***/ ((module) => {

module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 2880:
/***/ ((module) => {

module.exports = import("jwt-decode");;

/***/ }),

/***/ 7425:
/***/ ((module) => {

module.exports = import("react-icons/ai");;

/***/ }),

/***/ 6157:
/***/ ((module) => {

module.exports = import("react-icons/bi");;

/***/ }),

/***/ 1301:
/***/ ((module) => {

module.exports = import("react-icons/fa");;

/***/ }),

/***/ 7333:
/***/ ((module) => {

module.exports = import("react-icons/fa6");;

/***/ }),

/***/ 1185:
/***/ ((module) => {

module.exports = import("react-icons/io5");;

/***/ }),

/***/ 577:
/***/ ((module) => {

module.exports = import("react-icons/lu");;

/***/ }),

/***/ 6905:
/***/ ((module) => {

module.exports = import("react-icons/md");;

/***/ }),

/***/ 1154:
/***/ ((module) => {

module.exports = import("react-icons/pi");;

/***/ }),

/***/ 6555:
/***/ ((module) => {

module.exports = import("uuid");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5780,3015,7864,6598,3701,5758,6020,2536,3060,5029,3944,1324,6400,8310,9409,3801,681,2414,4817], () => (__webpack_exec__(4951)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=search-page.js.map