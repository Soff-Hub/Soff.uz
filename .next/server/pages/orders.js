(() => {
var exports = {};
exports.id = 6660;
exports.ids = [6660];
exports.modules = {

/***/ 8913:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4705);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6985);
/* harmony import */ var _components_freeleance_services_ServicesFilterSection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5086);
/* harmony import */ var _components_freeleance_services_ServicesCardSection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6041);
/* harmony import */ var _store_profile_slice__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(9880);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_6__, _components_freeleance_services_ServicesCardSection__WEBPACK_IMPORTED_MODULE_9__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_10__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_6__, _components_freeleance_services_ServicesCardSection__WEBPACK_IMPORTED_MODULE_9__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const getTitleFromDirection = (directions, value)=>{
    const direction = directions.find((dir)=>dir.value === value);
    return direction ? direction.label : null;
};
const getTitleFromCategory = (categories, id)=>{
    const category = categories.find((cat)=>String(cat.id) === String(id));
    return category ? category.title : null;
};
function SoffFreelancerPage({ servicesData , parentCategory , childCategory , offset , limit , direction , category_id , search ,  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const { data: directionsData  } = (0,_store_profile_slice__WEBPACK_IMPORTED_MODULE_10__/* .useGetDirectionsQuery */ .P5)();
    const directions = directionsData || [];
    const currentPage = Math.floor(offset / limit) + 1;
    const directionTitle = getTitleFromDirection(directions, direction);
    const categoryTitle = getTitleFromCategory(parentCategory, category_id);
    const fullTitle = // NOTE: It may conflict with search page SEO
    directionTitle && categoryTitle && search ? `"${search}" so'rovi bo'yicha xizmatlar - Soff.uz` : directionTitle && categoryTitle ? `${directionTitle} - ${categoryTitle} | Soff.uz` : directionTitle ? `${directionTitle} - Soff.uz` : "Xizmatlarga buyurtma berish - Soff.uz";
    const onChangePage = (page, pageSize)=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                offset: (page - 1) * pageSize,
                limit: pageSize
            }
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                title: fullTitle,
                description: "Soff.uz xizmatlar bo‘limida frilanserlar tomonidan taklif etilgan xizmatlarni toping. Dizayn, dasturlash, marketing va boshqa ko‘plab yo‘nalishlarda mutaxassislarni izlang."
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                className: "ps-page--shop my-5 container",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_freeleance_services_ServicesFilterSection__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {
                        parentCategory: parentCategory,
                        childCategory: childCategory,
                        directions: directions,
                        count: servicesData?.total_service
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_freeleance_services_ServicesCardSection__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                        services: servicesData
                    }),
                    servicesData.total_service != 0 && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                        className: "d-flex justify-content-center mt-5",
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(antd__WEBPACK_IMPORTED_MODULE_4__.Pagination, {
                            current: currentPage,
                            pageSize: Number(limit),
                            total: servicesData?.total_service || 0,
                            showSizeChanger: true,
                            pageSizeOptions: [
                                "10",
                                "20",
                                "50"
                            ],
                            onChange: onChangePage
                        })
                    })
                ]
            })
        ]
    });
}
async function getServerSideProps$1(context) {
    const { query  } = context;
    const { category_id ="" , search ="" , direction ="" , limit =23 , offset =0 ,  } = query;
    const fetchJson = async (url)=>{
        try {
            const res = await fetch(url);
            if (!res.ok) return null;
            return await res.json();
        } catch  {
            return null;
        }
    };
    const servicesQuery = new URLSearchParams({
        ...category_id && {
            category_id
        },
        ...search && {
            search
        },
        ...direction && {
            direction
        },
        limit,
        offset
    });
    const servicesUrl = `${"https://freelance.soff.uz"}/api/v1/customer?${servicesQuery}`;
    const parentCategoryUrl = direction ? `${"https://freelance.soff.uz"}/api/v1/categories/?direction=${direction}` : null;
    const childCategoryUrl = category_id ? `${"https://freelance.soff.uz"}/api/v1/categories?parent_id=${category_id}` : null;
    const [servicesData, parentCategory, childCategory] = await Promise.all([
        fetchJson(servicesUrl),
        parentCategoryUrl ? fetchJson(parentCategoryUrl) : Promise.resolve([]),
        childCategoryUrl ? fetchJson(childCategoryUrl) : Promise.resolve([]), 
    ]);
    return {
        props: {
            search,
            direction,
            category_id,
            servicesData: servicesData || {
                results: [],
                total_service: 0
            },
            parentCategory,
            childCategory,
            offset: Number(offset),
            limit: Number(limit)
        }
    };
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': SoffFreelancerPage,
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

const getInitialPropsWrapper = getInitialPropsWrappers['/orders'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/orders')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/orders')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4348:
/***/ ((module) => {

// Exports
module.exports = {
	"headline": "ServiceFilterSection_headline__cWIMs",
	"headlineWrapper": "ServiceFilterSection_headlineWrapper__cHi7E",
	"servicesSection": "ServiceFilterSection_servicesSection__uxIlp",
	"servicesCount": "ServiceFilterSection_servicesCount__DdVfk",
	"serviceFilterTab": "ServiceFilterSection_serviceFilterTab__LEQoe",
	"filterRow": "ServiceFilterSection_filterRow__sttKC",
	"searchBox": "ServiceFilterSection_searchBox__Nlana",
	"input": "ServiceFilterSection_input__bpJMs",
	"searchIcon": "ServiceFilterSection_searchIcon__xpJk0",
	"filterSelects": "ServiceFilterSection_filterSelects__DF_SI",
	"filter_select": "ServiceFilterSection_filter_select__H3mZq",
	"deleteBtn": "ServiceFilterSection_deleteBtn__VcIzl",
	"deleteMob": "ServiceFilterSection_deleteMob__F2vDs"
};


/***/ }),

/***/ 9414:
/***/ ((module) => {

// Exports
module.exports = {
	"card": "style_card__shM9H",
	"btn": "style_btn__UwAWg",
	"title": "style_title__wJXmo"
};


/***/ }),

/***/ 3487:
/***/ ((module) => {

// Exports
module.exports = {
	"stepsContainer": "style_stepsContainer__smw_6",
	"stepCard": "style_stepCard__cIZ9c",
	"numberCircle": "style_numberCircle__M6Zv8",
	"stepTitle": "style_stepTitle__h0WNw"
};


/***/ }),

/***/ 6041:
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
/* harmony import */ var _ServiceFilterSection_module_scss__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4348);
/* harmony import */ var _ServiceFilterSection_module_scss__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_ServiceFilterSection_module_scss__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(681);
/* harmony import */ var _service_first_card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2886);
/* harmony import */ var _components_elements_search_page_details_notFound__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4817);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__, _components_elements_search_page_details_notFound__WEBPACK_IMPORTED_MODULE_4__]);
([_entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__, _components_elements_search_page_details_notFound__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const ServicesCardSection = ({ services  })=>{
    const hasProducts = services?.items?.length > 0;
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: (_ServiceFilterSection_module_scss__WEBPACK_IMPORTED_MODULE_5___default().servicesSection),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                children: [
                    hasProducts && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                        className: "row px-1 row-cols-2 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 row-gap-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "col px-md-3 px-1",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_service_first_card__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {})
                            }),
                            services.items.map((service, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "col px-md-3 px-1",
                                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_entities_service_service_card__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
                                        service: service
                                    })
                                }, index))
                        ]
                    }),
                    !hasProducts && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            style: {
                                paddingBottom: "30px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                                backgroundColor: "#fafafa",
                                borderRadius: "8px",
                                minHeight: "50vh"
                            },
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_elements_search_page_details_notFound__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                                isSearchPage: false
                            })
                        })
                    })
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServicesCardSection);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5086:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ services_ServicesFilterSection)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/freeleance/services/ServiceFilterSection.module.scss
var ServiceFilterSection_module = __webpack_require__(4348);
var ServiceFilterSection_module_default = /*#__PURE__*/__webpack_require__.n(ServiceFilterSection_module);
// EXTERNAL MODULE: external "@ant-design/icons"
var icons_ = __webpack_require__(7066);
// EXTERNAL MODULE: ./components/freeleance/services/service-steps/style.module.scss
var style_module = __webpack_require__(3487);
var style_module_default = /*#__PURE__*/__webpack_require__.n(style_module);
;// CONCATENATED MODULE: ./components/freeleance/services/service-steps/index.jsx



const ServiceSteps = ()=>{
    const steps = [
        {
            id: 1,
            title: "Mutaxassisni tanlang"
        },
        {
            id: 2,
            title: "Buyurtma bering"
        },
        {
            id: 3,
            title: "To’lovni amalga oshiring"
        },
        {
            id: 4,
            title: "Buyurtmani kuting va qabul qiling"
        }, 
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: (style_module_default()).stepsContainer,
        children: steps.map((step)=>/*#__PURE__*/ jsx_runtime_.jsx(StepCard, {
                number: step.id,
                title: step.title
            }, step.id))
    });
};
/* harmony default export */ const service_steps = (ServiceSteps);
const StepCard = ({ number , title  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: (style_module_default()).stepCard,
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (style_module_default()).numberCircle,
                children: number
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: (style_module_default()).stepTitle,
                children: title
            })
        ]
    });
};

// EXTERNAL MODULE: ./shared/hooks/useTimeManager.js
var useTimeManager = __webpack_require__(6598);
;// CONCATENATED MODULE: ./components/freeleance/services/ServicesFilterSection.jsx








const { Option  } = external_antd_.Select;
const ServicesFilterSection = ({ parentCategory , directions  })=>{
    const router = (0,router_.useRouter)();
    const { query  } = router;
    const { startTimeout , stopTimeout  } = (0,useTimeManager/* useTimeManager */.h)();
    const directionsWithEmpty = [
        {
            label: "Barchasi",
            value: ""
        },
        ...directions, 
    ];
    const { 0: searchValue , 1: setSearchValue  } = (0,external_react_.useState)(query.search);
    const { 0: selectedDirection , 1: setSelectedDirection  } = (0,external_react_.useState)(query.direction || "");
    const { 0: selectedParentCategory , 1: setSelectedParentCategory  } = (0,external_react_.useState)(query.category_id || "");
    const updateQuery = (newQuery)=>{
        router.push({
            pathname: router.pathname,
            query: newQuery
        }, undefined, {
            shallow: false
        });
    };
    (0,external_react_.useEffect)(()=>{
        const delay = startTimeout(()=>{
            if (searchValue === undefined) return;
            const newQuery = {
                ...router.query,
                search: searchValue || undefined,
                direction: selectedDirection || undefined,
                category_id: selectedParentCategory || undefined,
                offset: 0
            };
            if (JSON.stringify(newQuery) !== JSON.stringify(router.query)) {
                updateQuery(newQuery);
            }
        }, 800);
        return ()=>stopTimeout(delay);
    }, [
        searchValue
    ]);
    const updateDirection = (value)=>{
        setSelectedDirection(value);
        setSelectedParentCategory("");
        setSearchValue("");
        router.push({
            pathname: router.pathname,
            query: {
                direction: value || undefined,
                offset: 0
            }
        });
    };
    const onParentCategoryChange = (value)=>{
        setSelectedParentCategory(value);
        setSearchValue("");
        router.push({
            pathname: router.pathname,
            query: {
                direction: selectedDirection || undefined,
                category_id: value || undefined,
                offset: 0
            }
        });
    };
    const clearFilters = ()=>{
        setSearchValue("");
        setSelectedDirection("");
        setSelectedParentCategory("");
        updateQuery({});
    };
    (0,external_react_.useEffect)(()=>{
        setSelectedDirection(query.direction);
        setSelectedParentCategory(query.category_id || query.parent_category_id);
    }, [
        query
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (ServiceFilterSection_module_default()).headlineWrapper,
                children: /*#__PURE__*/ jsx_runtime_.jsx(service_steps, {})
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: (ServiceFilterSection_module_default()).serviceFilterTab,
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: (ServiceFilterSection_module_default()).filterRow,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: (ServiceFilterSection_module_default()).filterSelects,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Select, {
                                    className: (ServiceFilterSection_module_default()).filter_select,
                                    suffixIcon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.DownOutlined, {
                                        style: {
                                            color: "green"
                                        }
                                    }),
                                    placeholder: "Yo'nalish",
                                    value: selectedDirection || undefined,
                                    onChange: updateDirection,
                                    children: directionsWithEmpty.map((d)=>/*#__PURE__*/ jsx_runtime_.jsx(Option, {
                                            value: d.value,
                                            children: d.label
                                        }, d.value))
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_antd_.Select, {
                                    allowClear: true,
                                    className: (ServiceFilterSection_module_default()).filter_select,
                                    suffixIcon: /*#__PURE__*/ jsx_runtime_.jsx(icons_.DownOutlined, {
                                        style: {
                                            color: "green"
                                        }
                                    }),
                                    placeholder: "Kategoriya",
                                    value: selectedParentCategory || undefined,
                                    onChange: onParentCategoryChange,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(Option, {
                                            value: "",
                                            children: "Barchasi"
                                        }),
                                        parentCategory?.map((cat)=>/*#__PURE__*/ jsx_runtime_.jsx(Option, {
                                                value: String(cat.id),
                                                children: cat.title
                                            }, cat.id))
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    className: (ServiceFilterSection_module_default()).deleteBtn,
                                    onClick: clearFilters,
                                    children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.DeleteOutlined, {})
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "d-flex justify-content-end gap-3 flex-fill",
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    className: (ServiceFilterSection_module_default()).searchBox,
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                            value: searchValue,
                                            onChange: (e)=>setSearchValue(e.target.value),
                                            placeholder: "Qanday xizmat izlamoqdasiz",
                                            className: (ServiceFilterSection_module_default()).input,
                                            type: "text"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: (ServiceFilterSection_module_default()).searchIcon,
                                            children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.SearchOutlined, {})
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                    className: "d-flex d-md-none align-items-center",
                                    children: /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                        className: (ServiceFilterSection_module_default()).deleteMob,
                                        onClick: clearFilters,
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons_.DeleteOutlined, {})
                                    })
                                })
                            ]
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const services_ServicesFilterSection = (ServicesFilterSection);


/***/ }),

/***/ 2886:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9414);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);





const ServiceFirstCard = ()=>{
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.auth);
    const { push , query  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const handleOrder = ()=>{
        if (isLoggedIn) {
            push(`/order/create?${query?.direction && `direction=${query.direction}`}`);
        } else {
            push("/auth/login?returnUrl=" + encodeURIComponent("/order/create"));
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().card),
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().title),
                children: "Ishingizni frilanserlarga topshiring."
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                onClick: handleOrder,
                className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().btn),
                children: "Hoziroq buyurtma berish"
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ServiceFirstCard);


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

/***/ }),

/***/ 7066:
/***/ ((module) => {

"use strict";
module.exports = require("@ant-design/icons");

/***/ }),

/***/ 6999:
/***/ ((module) => {

"use strict";
module.exports = require("@react-oauth/google");

/***/ }),

/***/ 8097:
/***/ ((module) => {

"use strict";
module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 5725:
/***/ ((module) => {

"use strict";
module.exports = require("antd");

/***/ }),

/***/ 6734:
/***/ ((module) => {

"use strict";
module.exports = require("js-cookie");

/***/ }),

/***/ 3280:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 4957:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/head.js");

/***/ }),

/***/ 4014:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/i18n/normalize-locale-path.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/image-config.js");

/***/ }),

/***/ 8524:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/is-plain-object.js");

/***/ }),

/***/ 5832:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/loadable.js");

/***/ }),

/***/ 8020:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/mitt.js");

/***/ }),

/***/ 4406:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/page-path/denormalize-page-path.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 6220:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/compare-states.js");

/***/ }),

/***/ 299:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-next-pathname-info.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 9565:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-asset-path-from-route.js");

/***/ }),

/***/ 5789:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/get-next-pathname-info.js");

/***/ }),

/***/ 1897:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-bot.js");

/***/ }),

/***/ 1428:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/is-dynamic.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 1292:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/parse-relative-url.js");

/***/ }),

/***/ 4567:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/path-has-prefix.js");

/***/ }),

/***/ 979:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/querystring.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 6052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/resolve-rewrites.js");

/***/ }),

/***/ 4226:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-matcher.js");

/***/ }),

/***/ 5052:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/router/utils/route-regex.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

"use strict";
module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ 6022:
/***/ ((module) => {

"use strict";
module.exports = require("react-redux");

/***/ }),

/***/ 8176:
/***/ ((module) => {

"use strict";
module.exports = require("react-spinners");

/***/ }),

/***/ 997:
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 3258:
/***/ ((module) => {

"use strict";
module.exports = import("@reduxjs/toolkit");;

/***/ }),

/***/ 9943:
/***/ ((module) => {

"use strict";
module.exports = import("@reduxjs/toolkit/query/react");;

/***/ }),

/***/ 9752:
/***/ ((module) => {

"use strict";
module.exports = import("@tanstack/react-query");;

/***/ }),

/***/ 9648:
/***/ ((module) => {

"use strict";
module.exports = import("axios");;

/***/ }),

/***/ 2880:
/***/ ((module) => {

"use strict";
module.exports = import("jwt-decode");;

/***/ }),

/***/ 1185:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/io5");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,5780,3015,8335,2315,6985,6598,3701,6020,2536,3060,3944,6400,681,4817], () => (__webpack_exec__(8913)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=orders.js.map