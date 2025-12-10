;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="e315f3fb-b9df-4d88-abc6-e60b6a5fb852",e._sentryDebugIdIdentifier="sentry-dbid-e315f3fb-b9df-4d88-abc6-e60b6a5fb852");})();}catch(e){}};
"use strict";
(() => {
var exports = {};
exports.id = 8024;
exports.ids = [8024];
exports.modules = {

/***/ 9902:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ pageWrapperTemplate),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8454);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1218);
/* harmony import */ var _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6184);
/* harmony import */ var _components_elements_ScientificResourcesFilterSection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(2766);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9410);
/* harmony import */ var _components_elements_AISoffiaPresentation__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(4855);
/* harmony import */ var _components_elements_CategoryFilterSecion__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4807);
/* harmony import */ var _components_elements_CategorySearchSection__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5926);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_4__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_4__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);













function ProductCategoryScreen({ productsData , fourChildData , childCategoryData , slug , childCategory , page ,  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const handlePageChange = (newPage)=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: newPage
            }
        });
    };
    const title = (0,_components_elements_ScientificResourcesFilterSection__WEBPACK_IMPORTED_MODULE_5__/* .getTitleFromSlug */ .h)(fourChildData?.results, slug);
    const subTitle = (0,_components_elements_ScientificResourcesFilterSection__WEBPACK_IMPORTED_MODULE_5__/* .getTitleFromSlug */ .h)(childCategoryData?.results, childCategory);
    const fullTitle = title && subTitle ? `${title} - ${subTitle}` : title ? title : "Ilmiy ishlar kategoriyasi";
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                title: fullTitle,
                description: fullTitle + " bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!",
                image: "https://soff.uz/static/img/ilmiy-ishlar-2.png",
                keywords: [
                    {
                        name: "Biznes rejalar"
                    },
                    {
                        name: "Taqdimotlar"
                    },
                    {
                        name: "Kurs ishlari"
                    },
                    {
                        name: "Diplom ishlari"
                    },
                    {
                        name: "Referatlar"
                    },
                    {
                        name: "Mustaqil ishlar"
                    },
                    {
                        name: "Labaratoriya Ishlari"
                    },
                    {
                        name: "Dissertatsiya ishlari"
                    },
                    {
                        name: "Testlar"
                    },
                    {
                        name: "O'quv qo'llanmalar"
                    },
                    {
                        name: "MustDars ishlanmalaraqil"
                    },
                    {
                        name: "Tarqatma materiallar"
                    },
                    {
                        name: "Amaliy ishlar"
                    },
                    {
                        name: "Blankalar"
                    },
                    {
                        name: "Ijodiy Ishlar"
                    },
                    {
                        name: "Loyihalar"
                    },
                    {
                        name: "Plakatlar"
                    },
                    {
                        name: "Elektron kitoblar"
                    },
                    {
                        name: "Dasturlash tillari"
                    }, 
                ],
                author: "Soff.uz"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: "ps-page--shop container p-lg-1",
                children: [
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_elements_AISoffiaPresentation__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_elements_CategorySearchSection__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {}),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_elements_CategoryFilterSecion__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                        breacrumb: fourChildData,
                        count: productsData?.count,
                        isLoading: false,
                        childCategoryData: childCategoryData
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                        data: productsData,
                        page: page,
                        handlePagination: handlePageChange,
                        isLoading: false
                    })
                ]
            })
        ]
    });
}
// ✅ getServerSideProps to'g'rilangan
async function getServerSideProps$1(context) {
    const { slug ="" , page =1 , childCategory ="" , search ="" ,  } = context.query;
    const fetchJson = async (url)=>{
        const res = await fetch(url);
        if (!res.ok) return null;
        return res.json();
    };
    // Agar slug === 'all' bo‘lsa, category bo‘sh bo‘lishi kerak
    const categoryParam = slug === "all" ? "" : childCategory || slug;
    const productsUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/products/?direction=file&category=${categoryParam}&page=${page}&page_size=48&search=${search}`;
    const fourChildUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/four-child?direction=file`;
    const childCategoryUrl = slug && slug !== "all" ? `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/four-child?direction=file&parent__slug=${slug}` : null;
    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(productsUrl),
        fetchJson(fourChildUrl),
        childCategoryUrl ? fetchJson(childCategoryUrl) : Promise.resolve(null), 
    ]);
    return {
        props: {
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            slug,
            childCategory,
            page
        }
    };
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: ProductCategoryScreen,
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

// Rollup will aggressively tree-shake what it perceives to be unused properties
// on objects. Because the key that's used to index into this object (/category/[slug])
// is replaced during bundling, Rollup can't see that these properties are in fact
// used. Using `Object.freeze` signals to Rollup that it should not tree-shake
// this object.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = Object.freeze({
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__.wrapErrorGetInitialPropsWithSentry,
});

const getInitialPropsWrapper = getInitialPropsWrappers['/category/[slug]'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/category/[slug]')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/category/[slug]')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_11__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 4855:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ AISoffiaPresentation)
/* harmony export */ });
/* unused harmony export AISoffiaPresentationNotFoundProduct */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _widgets_header_HeaderActions_HeaderAIIcon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5431);




function AISoffiaPresentation() {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "24px",
            background: "rgba(0, 164, 79, 0.05)",
            borderRadius: "16px",
            border: "1px solid rgba(0, 164, 79, 0.2)",
            boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
            flexWrap: "wrap",
            gap: "16px",
            flexDirection: "row"
        },
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                    flex: 1,
                    minWidth: "250px"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        style: {
                            background: "rgb(0, 164, 79)",
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            color: "#fff",
                            fontSize: "24px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0
                        },
                        children: _widgets_header_HeaderActions_HeaderAIIcon__WEBPACK_IMPORTED_MODULE_3__/* .soffiaIconSVG3 */ .xS
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                            href: "https://t.me/soffia_ai_bot",
                            target: "_blank",
                            rel: "noopener noreferrer",
                            style: {
                                textDecoration: "none"
                            },
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h3", {
                                    style: {
                                        margin: 0,
                                        color: "#312f30",
                                        fontSize: "18px"
                                    },
                                    children: "AI yordamida prezentatsiya yarating"
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                    className: "d-md-block d-none",
                                    style: {
                                        margin: 0,
                                        color: "#312f30a0",
                                        fontSize: "14px"
                                    },
                                    children: "Prezentatsiya tayyorlashni aqlli botga topshiring – tez, qulay va samarali."
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    flexShrink: 0
                },
                className: "d-md-block d-none",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                    href: "https://t.me/soffia_ai_bot",
                    target: "_blank",
                    rel: "noopener noreferrer",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Button, {
                        type: "primary",
                        size: "large",
                        style: {
                            borderRadius: "10px",
                            padding: "0 24px",
                            backgroundColor: "rgb(0, 164, 79)",
                            border: "none",
                            width: "100%"
                        },
                        children: [
                            _widgets_header_HeaderActions_HeaderAIIcon__WEBPACK_IMPORTED_MODULE_3__/* .soffiaIconSVG3 */ .xS,
                            " Boshlash"
                        ]
                    })
                })
            })
        ]
    });
}
const AISoffiaPresentationNotFoundProduct = ()=>{
    return /*#__PURE__*/ _jsx(_Fragment, {
        children: /*#__PURE__*/ _jsx("div", {
            className: "bg-white p-5 rounded vh-100",
            children: /*#__PURE__*/ _jsxs("div", {
                className: "container",
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: "text-center",
                        children: [
                            /*#__PURE__*/ _jsx("img", {
                                src: "/static/img/noinfo.svg",
                                className: "mb-5",
                                alt: "Ma'lumot topilmadi"
                            }),
                            /*#__PURE__*/ _jsx("p", {
                                className: "display-6",
                                children: "So'rovingiz bo'yicha ma'lumot topilmadi..."
                            })
                        ]
                    }),
                    /*#__PURE__*/ _jsx("div", {
                        className: "mt-5",
                        style: {
                            // display: 'flex',
                            padding: "44px 10px",
                            background: "rgba(0, 164, 79, 0.05)",
                            borderRadius: "16px",
                            border: "1px solid rgba(0, 164, 79, 0.2)",
                            boxShadow: "0 4px 12px rgba(0,0,0,0.04)"
                        },
                        children: /*#__PURE__*/ _jsxs("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                flex: 1,
                                minWidth: "250px",
                                justifyContent: "center"
                            },
                            children: [
                                /*#__PURE__*/ _jsx("div", {
                                    style: {
                                        background: "rgb(0, 164, 79)",
                                        width: "50px",
                                        height: "50px",
                                        borderRadius: "50%",
                                        color: "#fff",
                                        fontSize: "24px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexShrink: 0
                                    },
                                    children: "✨"
                                }),
                                /*#__PURE__*/ _jsx("div", {
                                    className: "d-flex",
                                    children: /*#__PURE__*/ _jsxs("a", {
                                        href: "https://t.me/soffia_ai_bot",
                                        target: "_blank",
                                        rel: "noopener noreferrer",
                                        style: {
                                            textDecoration: "none"
                                        },
                                        children: [
                                            /*#__PURE__*/ _jsx("h3", {
                                                style: {
                                                    margin: 0,
                                                    color: "#312f30",
                                                    fontSize: "18px"
                                                },
                                                children: "AI yordamida prezentatsiya yarating"
                                            }),
                                            /*#__PURE__*/ _jsx("p", {
                                                style: {
                                                    margin: 0,
                                                    color: "#312f30a0",
                                                    fontSize: "14px"
                                                },
                                                children: "Prezentatsiya tayyorlashni aqlli botga topshiring – tez, qulay va samarali."
                                            })
                                        ]
                                    })
                                })
                            ]
                        })
                    })
                ]
            })
        })
    });
};


/***/ }),

/***/ 4807:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* unused harmony export getTitleFromSlug */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_3__);




const Option = antd__WEBPACK_IMPORTED_MODULE_3__.Select.Option;
const getTitleFromSlug = (array, slug)=>{
    let title = null;
    if (array && slug) {
        title = array.find((item)=>item.slug === slug)?.name;
    }
    return title;
};
const CategoryFilterSecion = ({ breacrumb , count , isLoading , childCategoryData ,  })=>{
    const { 0: expanded , 1: setExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: dropDownMenu , 1: setDropdownMenu  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: childCategoryOpen , 1: setChildCategoryOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    if (!router.isReady) return null;
    const { slug , childCategory  } = router.query;
    const subCategory = expanded ? childCategoryData?.results : childCategoryData?.results || null;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "d-xl-none d-block my-4 container",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "row mx-auto gap-3",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_3__.Select, {
                            className: "col-md-6 col-12 p-0 m-0 mr-md-2",
                            onChange: (value)=>{
                                router.push({
                                    pathname: `/category/${value}`,
                                    query: {
                                        page: 1
                                    }
                                });
                            },
                            defaultValue: slug || "all",
                            style: {
                                height: "42px",
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Option, {
                                    value: "all",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-list mr-2"
                                        }),
                                        "Barchasi"
                                    ]
                                }, "all"),
                                breacrumb?.results?.map((item)=>/*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Option, {
                                        value: item.slug,
                                        children: [
                                            item.image && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                className: "rounded-2 me-2",
                                                src: item.image,
                                                alt: item.name,
                                                width: 25
                                            }),
                                            item.name
                                        ]
                                    }, item.slug))
                            ]
                        }),
                        subCategory && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_3__.Select, {
                            className: "col-md-6 col-12 p-0 m-0 ml-md-2",
                            onChange: (value)=>{
                                router.push({
                                    pathname: `/category/${slug}`,
                                    query: {
                                        page: 1,
                                        childCategory: value
                                    }
                                });
                            },
                            defaultValue: childCategory || "all",
                            style: {
                                height: "42px",
                                flex: 1
                            },
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(Option, {
                                    value: "all",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                                            className: "fa-solid fa-list mr-2"
                                        }),
                                        "Barcha yo'nalish"
                                    ]
                                }, "all"),
                                subCategory.map((item)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Option, {
                                        value: item.slug,
                                        children: item.name
                                    }, item.slug))
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "d-none d-lg-block",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "subcategoryMenu d-xl-block d-lg-none p-lg-0",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                            className: "mb-3 pointer top_search_category justify-content-between",
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    onClick: ()=>setDropdownMenu(!dropDownMenu),
                                    className: "Models_category_menu",
                                    children: [
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: "/static/img/list-category.svg",
                                            alt: ""
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                                            style: {
                                                whiteSpace: "nowrap"
                                            },
                                            children: !slug || slug === "all" ? "Barcha Katalog" : breacrumb?.results.find((item)=>item.slug === slug)?.name
                                        }),
                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                            src: dropDownMenu ? "/static/img/up-icon.svg" : "/static/img/down-icon.svg",
                                            alt: ""
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                    className: "d-flex gap-3",
                                    children: breacrumb?.results?.filter((item)=>!"audio video template".includes(item.slug)).slice(0, 7).map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: "my-2",
                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: `${slug === item.slug ? "bg-success" : ""} category-btn card p-3 shadow-sm rounded-3`,
                                                onClick: ()=>router.push({
                                                        pathname: `/category/${item.slug}`,
                                                        query: {
                                                            page: 1
                                                        }
                                                    }),
                                                style: {
                                                    cursor: "pointer"
                                                },
                                                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    className: "d-flex justify-content-between",
                                                    children: [
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                            className: `${slug === item.slug ? "bg-success text-white" : ""} category-btn-title m-0 p-0`,
                                                            children: item.name
                                                        }),
                                                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                            style: {
                                                                width: "26px",
                                                                height: "21px"
                                                            },
                                                            src: item.image,
                                                            alt: item.name
                                                        })
                                                    ]
                                                })
                                            })
                                        }, index))
                                })
                            ]
                        }),
                        dropDownMenu && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "card p-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                className: "row",
                                children: breacrumb?.results?.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "col-2 my-2",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                            className: `${slug === item.slug ? "bg-success" : ""} category-btn card p-3 shadow-sm rounded-3`,
                                            onClick: ()=>{
                                                router.push({
                                                    pathname: `/category/${item.slug}`,
                                                    query: {
                                                        page: 1
                                                    }
                                                });
                                                setDropdownMenu(false);
                                            },
                                            style: {
                                                cursor: "pointer"
                                            },
                                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "d-flex justify-content-between",
                                                children: [
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                        className: `${slug === item.slug ? "bg-success text-white" : ""} category-btn-title m-0 p-0`,
                                                        children: item.name
                                                    }),
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        style: {
                                                            width: "26px",
                                                            height: "21px"
                                                        },
                                                        src: item.image,
                                                        alt: item.name
                                                    })
                                                ]
                                            })
                                        })
                                    }, index))
                            })
                        }),
                        subCategory?.length > 0 && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "ps-breadcrumb-2 py-3 px-xl-0 px-l-0",
                            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "subCategoryContainer",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                        className: "pointer top_search_category justify-content-between",
                                        children: [
                                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                className: "d-flex align-items-center gap-1 pointer text-success text-capitalize",
                                                onClick: ()=>setChildCategoryOpen(!childCategoryOpen),
                                                children: [
                                                    "(",
                                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                                                        children: [
                                                            subCategory.length,
                                                            "+"
                                                        ]
                                                    }),
                                                    ") ",
                                                    ` `,
                                                    childCategory ? subCategory.find((item)=>item.slug === childCategory)?.name || "Barchasini korish" : "Barchasini korish",
                                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                                                        src: childCategoryOpen ? "/static/img/up-icon-green.svg" : "/static/img/down-icon-green.svg",
                                                        alt: ""
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                className: "d-flex gap-3",
                                                children: subCategory.slice(0, 6).map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                        className: "my-2",
                                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                            className: "sub-category-btn p-3",
                                                            onClick: ()=>router.push({
                                                                    pathname: `/category/${slug}`,
                                                                    query: {
                                                                        page: 1,
                                                                        childCategory: item.slug
                                                                    }
                                                                }),
                                                            style: {
                                                                cursor: "pointer"
                                                            },
                                                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                                className: "d-flex justify-content-between",
                                                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                                                    className: `${childCategory === item.slug ? "text-success text-white" : ""} text-capitalize sub-category-btn-title m-0 p-0`,
                                                                    children: item.name
                                                                })
                                                            })
                                                        })
                                                    }, index))
                                            })
                                        ]
                                    }),
                                    childCategoryOpen && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                        className: "d-flex flex-wrap bg-white shadow-sm rounded-3 p-4",
                                        children: subCategory.map((item, index)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                                                onClick: ()=>{
                                                    router.push({
                                                        pathname: `/category/${slug}`,
                                                        query: {
                                                            page: 1,
                                                            childCategory: item.slug
                                                        }
                                                    });
                                                    setChildCategoryOpen(false);
                                                },
                                                className: `${slug === item.slug ? "active" : ""} pointer text-capitalize col-2 my-1 border`,
                                                children: item.name
                                            }, index))
                                    })
                                ]
                            })
                        }),
                        isLoading && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_3__.Skeleton.Node, {
                            active: true,
                            className: "skeletion-card small-full-card mb-3"
                        })
                    ]
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CategoryFilterSecion);


/***/ }),

/***/ 5926:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CategorySearchSection)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7567);





function useDebounce(value, delay = 500) {
    const { 0: debounced , 1: setDebounced  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)(value);
    const { startTimeout , stopTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_4__/* .useTimeManager */ .h)();
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const handler = startTimeout(()=>{
            setDebounced(value);
        }, delay);
        return ()=>stopTimeout(handler);
    }, [
        value,
        delay
    ]);
    return debounced;
}
function CategorySearchSection() {
    const { 0: search , 1: setSearch  } = (0,react__WEBPACK_IMPORTED_MODULE_3__.useState)("");
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();
    const debouncedSearch = useDebounce(search, 1000);
    (0,react__WEBPACK_IMPORTED_MODULE_3__.useEffect)(()=>{
        const currentQuery = router.query;
        const updatedQuery = {
            ...currentQuery
        };
        if (debouncedSearch) {
            updatedQuery.search = debouncedSearch;
            updatedQuery.page = 1;
        } else {
            delete updatedQuery.search;
        }
        router.replace({
            pathname: router.pathname,
            query: updatedQuery
        });
    }, [
        debouncedSearch
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_1__.Input.Search, {
            placeholder: "Mahsulot qidirish...",
            size: "large",
            value: search,
            onChange: (e)=>setSearch(e.target.value),
            style: {
                height: "50px",
                fontSize: "18px"
            }
        })
    });
}


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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,6017,8550,4747,1218,7567,9075,280,75,5419,6316,9410,6184,2766,5431], () => (__webpack_exec__(9902)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=[slug].js.map