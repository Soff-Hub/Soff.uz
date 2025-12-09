;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="896a7846-fe95-460c-ad9b-c4b48726951e",e._sentryDebugIdIdentifier="sentry-dbid-896a7846-fe95-460c-ad9b-c4b48726951e");})();}catch(e){}};
(() => {
var exports = {};
exports.id = 3992;
exports.ids = [3992];
exports.modules = {

/***/ 3692:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* harmony import */ var _widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(8505);
/* harmony import */ var _widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(131);
/* harmony import */ var _widgets_gray_card__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4308);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(9752);
/* harmony import */ var _shared_utilities_utils__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(7971);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_4__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_9__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_4__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_9__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















function ProductCategoryScreen({ productsData , fourChildData , childCategoryData , parentCategory , childCategory , page ,  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_6__.useRouter)();
    const isFirstRender = (0,react__WEBPACK_IMPORTED_MODULE_1__.useRef)(true);
    console.log("productsData:", productsData);
    const { page: queryPage = page || 1 , search ="" , category ="" , content_extensions =[] , price_from ="" , price_to ="" , from_page ="" , to_page ="" , similar_documents ,  } = router.query;
    // Determine category parameter (same logic as getServerSideProps)
    const categoryParam = childCategory || parentCategory || category;
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (isFirstRender.current) {
            isFirstRender.current = false;
        }
    }, [
        router.query
    ]);
    // Similar documents enabled when count < 50 and page === 1
    const similarDocumentsEnabled = false;
    // productsData?.count < 50 && Number(queryPage) === 1;
    // Build query key for similar documents
    const fileTypes = Array.isArray(content_extensions) ? content_extensions : content_extensions ? [
        content_extensions
    ] : [];
    const keysChangeOnSimilarDocuments = `${queryPage}-${search}-file-${categoryParam}-${fileTypes.join("-")}-${price_from}-${price_to}-${from_page}-${to_page}`;
    const { data: similarDocuments , isFetching: isFetchingSimilarDocuments  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_11__.useQuery)({
        queryKey: [
            "similar-documents-scientific",
            keysChangeOnSimilarDocuments, 
        ],
        queryFn: async ()=>{
            const params = new URLSearchParams({
                limit: "50",
                page: queryPage,
                type: "file",
                similar_documents: "true"
            });
            if (search) params.append("search", search);
            if (categoryParam) params.append("category", categoryParam);
            if (fileTypes.length) {
                fileTypes.forEach((ext)=>params.append("file_type", ext));
            }
            if (price_from) params.append("price_from", price_from);
            if (price_to) params.append("price_to", price_to);
            if (from_page) params.append("page_from", from_page);
            if (to_page) params.append("page_to", to_page);
            const res = await fetch(`${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/same-google-search/?${params.toString()}`);
            return await res.json();
        },
        enabled: similarDocumentsEnabled
    });
    // Transform similar documents to match ProductCard expected structure
    const transformSimilarDocument = (item)=>{
        // Check if item is already in the correct format (from products API)
        if (item.document) {
            return item;
        }
        // Transform from same-google-search API format to ProductCard format
        return {
            ...item,
            poster_url: item.poster || item.poster_url,
            price: parseFloat(item.discount_price) || 0,
            discount_price: parseFloat(item.discount_price) || 0,
            views_count: item.views_count || 0,
            document: {
                file_type: item.file_type || ".zip",
                file_size: (0,_shared_utilities_utils__WEBPACK_IMPORTED_MODULE_12__/* .formatFileSize */ .sS)(item.file_size || 0),
                page_count: item.page_count || 0,
                content_type: item.content_type || "file"
            }
        };
    };
    const mergedData = (0,react__WEBPACK_IMPORTED_MODULE_1__.useMemo)(()=>{
        const initialResults = productsData && productsData.results || [];
        const similarResults = isFetchingSimilarDocuments ? [] : similarDocuments && similarDocuments.results || [];
        // Transform both SSR initial results and client-side similar documents
        // to match ProductCard structure (both may come from same-google-search API)
        const transformedInitialResults = initialResults.map(transformSimilarDocument);
        const transformedSimilarResults = similarResults.map(transformSimilarDocument);
        return {
            results: [
                ...transformedInitialResults,
                ...transformedSimilarResults, 
            ],
            count: (productsData?.count || 0) + (similarDocuments?.count || 0)
        };
    }, [
        productsData,
        similarDocuments,
        isFetchingSimilarDocuments
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (similarDocuments && similarDocuments.results && similarDocuments.results.length > 0) {
            router.push({
                pathname: router.pathname,
                query: {
                    ...router.query,
                    similar_documents: "true"
                }
            }, undefined, {
                shallow: true
            });
        }
    }, [
        similarDocuments
    ]);
    const handlePageChange = (newPage)=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: newPage
            }
        });
    };
    const title = (0,_components_elements_ScientificResourcesFilterSection__WEBPACK_IMPORTED_MODULE_5__/* .getTitleFromSlug */ .h)(fourChildData?.results, parentCategory);
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
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                isFile: true,
                child: childCategoryData?.results,
                parent: fourChildData?.results,
                path: "/scientific-resources/"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: "ps-page--shop container p-lg-10 p-l-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                    data: mergedData,
                    page: Number(queryPage),
                    handlePagination: (number)=>{
                        handlePageChange(number);
                    },
                    isLoading: false
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().catalogSectionBlock),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                    className: "container mx-auto px-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("section", {
                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().howItWorksSection),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
                                    className: "d-flex justify-content-center my-5",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)((next_image__WEBPACK_IMPORTED_MODULE_8___default()), {
                                        width: 30,
                                        height: 30,
                                        src: "/static/img/star.svg",
                                        alt: "starts"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h2", {
                                    children: "Tayyor mahsulotlardan foydalanish qanday ishlaydi?"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                    className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().steps),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().stepItem),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                    src: "/static/img/catalogMenu.png",
                                                    alt: "starts"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                            children: "Qidiring va tanlang"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            children: "Katalogdan yoki qidiruv orqali sizga kerakli tayyor mahsulotni toping."
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().stepItem),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                    src: "/static/img/catalogCoin.png",
                                                    alt: "starts"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                            children: "Sotib oling"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            children: "Xavfsiz to‘lov tizimi orqali mahsulotni sotib oling — narx va shartlar oldindan ko‘rinadi."
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().stepItem),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("img", {
                                                    src: "/static/img/catalogSecure.png",
                                                    alt: "starts"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
                                                            children: "Yuklab oling va foydalaning"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
                                                            children: "Mahsulotni darhol yuklab oling va ishlatishni boshlang."
                                                        })
                                                    ]
                                                })
                                            ]
                                        })
                                    ]
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(_widgets_gray_card__WEBPACK_IMPORTED_MODULE_10__/* ["default"] */ .Z, {
                            title: "Kerakli mahsulotni topa olmadingizmi? Buyurtma berishingiz mumkin.",
                            btn: "Buyurtmar berish",
                            link: "/orders?direction=scientific_work"
                        })
                    ]
                })
            })
        ]
    });
}
async function getServerSideProps$1(context) {
    const { slug , page =1 , parentCategory ="" , childCategory ="" , search ="" , category ="" , content_extensions =[] , price_from ="" , price_to ="" , from_page ="" , to_page ="" ,  } = context.query;
    const queryParams = new URLSearchParams({
        direction: "file",
        page,
        page_size: 50,
        search
    });
    if (category) queryParams.append("category", category);
    if (content_extensions && content_extensions.length) {
        const exts = Array.isArray(content_extensions) ? content_extensions : [
            content_extensions
        ];
        exts.forEach((ext)=>{
            queryParams.append("content_extensions", ext);
        });
    }
    if (price_from) queryParams.append("price_from", price_from);
    if (price_to) queryParams.append("price_to", price_to);
    if (from_page) queryParams.append("from_page", from_page);
    if (to_page) queryParams.append("to_page", to_page);
    const searchParams = new URLSearchParams({
        type: "file",
        limit: 50,
        page,
        search
    });
    if (category) searchParams.append("parentCategory", category);
    if (content_extensions && content_extensions.length) {
        const exts1 = Array.isArray(content_extensions) ? content_extensions : [
            content_extensions
        ];
        exts1.forEach((ext)=>{
            searchParams.append("file_type", ext);
        });
    }
    if (price_from) searchParams.append("price_from", price_from);
    if (price_to) searchParams.append("price_to", price_to);
    if (from_page) searchParams.append("from_page", from_page);
    if (to_page) searchParams.append("to_page", to_page);
    const fetchJson = async (url)=>{
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };
    const categoryParam = childCategory ? childCategory : parentCategory;
    const productsUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/products/?${queryParams.toString()}&category=${categoryParam}`;
    const searchPageUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/same-google-search/?${queryParams.toString()}`;
    const fourChildUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/four-child?direction=file`;
    const childCategoryUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/four-child?direction=file&parent__slug=${parentCategory}`;
    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        fetchJson(search ? searchPageUrl : productsUrl),
        fetchJson(fourChildUrl),
        fetchJson(childCategoryUrl), 
    ]);
    return {
        props: {
            productsData: productsData || null,
            fourChildData: fourChildData || null,
            childCategoryData: childCategoryData || null,
            parentCategory,
            childCategory,
            page,
            search,
            productsUrl
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
// on objects. Because the key that's used to index into this object (/scientific-resources/[slug])
// is replaced during bundling, Rollup can't see that these properties are in fact
// used. Using `Object.freeze` signals to Rollup that it should not tree-shake
// this object.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getInitialPropsWrappers = Object.freeze({
  '/_app': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__.wrapAppGetInitialPropsWithSentry,
  '/_document': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__.wrapDocumentGetInitialPropsWithSentry,
  '/_error': _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__.wrapErrorGetInitialPropsWithSentry,
});

const getInitialPropsWrapper = getInitialPropsWrappers['/scientific-resources/[slug]'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/scientific-resources/[slug]')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/scientific-resources/[slug]')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_13__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1624:
/***/ ((module) => {

// Exports
module.exports = {
	"readyProducts": "style_readyProducts__yjuab",
	"block": "style_block__GVofM",
	"title": "style_title__VnSgG",
	"title2": "style_title2__mGQwJ",
	"catalogSeeAll": "style_catalogSeeAll__tdlBu"
};


/***/ }),

/***/ 8505:
/***/ ((module) => {

// Exports
module.exports = {
	"catalogSectionBlock": "style_catalogSectionBlock__W9FUs",
	"catalogHealine": "style_catalogHealine__JjrjA",
	"catalogWrapper": "style_catalogWrapper__GATnu",
	"catalogLabel": "style_catalogLabel__5Nu52",
	"catalogSubLabel": "style_catalogSubLabel__koSK_",
	"catalogSeeAll": "style_catalogSeeAll__Ci3_k",
	"catalogCardsSection": "style_catalogCardsSection__1z_LL",
	"howItWorksSection": "style_howItWorksSection__kWx64",
	"steps": "style_steps__xtHyM",
	"stepItem": "style_stepItem__s00bI",
	"readyProducts": "style_readyProducts__usVJn",
	"block": "style_block__R24x4",
	"title": "style_title__q9r8D",
	"title2": "style_title2__zpPsy",
	"backdrop": "style_backdrop__EKn_z"
};


/***/ }),

/***/ 4308:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1624);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_module_scss__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);





const GrayCard = ({ title ="" , btn ="" , goProducts =()=>{} , link ="" ,  })=>{
    const { push  } = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const { isLoggedIn  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.auth);
    const handleOrder = (e)=>{
        e.preventDefault();
        if (isLoggedIn) {
            push("/order/create");
        } else {
            push("/auth/login?returnUrl=" + encodeURIComponent("/order/create"));
        }
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("section", {
        className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().readyProducts),
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().block),
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().title),
                    children: title
                }),
                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                    onClick: handleOrder,
                    href: link,
                    target: "_blank",
                    className: (_style_module_scss__WEBPACK_IMPORTED_MODULE_4___default().catalogSeeAll),
                    children: [
                        btn,
                        " ",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                            style: {
                                marginLeft: "12px"
                            },
                            className: "fa-solid fa-arrow-right"
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (GrayCard);


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

/***/ 577:
/***/ ((module) => {

"use strict";
module.exports = import("react-icons/lu");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,6017,8550,4747,1218,7567,9075,280,75,5419,6316,9410,6184,910,131,7971,2766], () => (__webpack_exec__(3692)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=[slug].js.map