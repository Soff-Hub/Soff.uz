(() => {
var exports = {};
exports.id = 3992;
exports.ids = [3992];
exports.modules = {

/***/ 3163:
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
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(4705);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6985);
/* harmony import */ var _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(4345);
/* harmony import */ var _components_elements_ScientificResourcesFilterSection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(7973);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(1064);
/* harmony import */ var _widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(7795);
/* harmony import */ var _widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(6070);
/* harmony import */ var _widgets_gray_card__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(3829);
/* harmony import */ var _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(3801);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_9__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_11__, _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_13__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_9__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_11__, _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_13__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);
















const metaProps = {
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
};
const type = "file";
const defaultTitle = "Ilmiy ishlar kategoriyasi";
function ProductCategoryScreen({ productsData , fourChildData , childCategoryData , parentCategory , childCategory , page ,  }) {
    // NOTE: changed temporarily to productsData to avoid issues with search results
    // const { mergedData } = useSimilarSearch({
    //     defaultData: productsData,
    //     defaultType: 'file',
    // });
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_8__.useRouter)();
    const handlePageChange = (newPage)=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: newPage
            }
        });
    };
    const title = (0,_components_elements_ScientificResourcesFilterSection__WEBPACK_IMPORTED_MODULE_7__/* .getTitleFromSlug */ .h)(fourChildData?.results, parentCategory);
    const subTitle = (0,_components_elements_ScientificResourcesFilterSection__WEBPACK_IMPORTED_MODULE_7__/* .getTitleFromSlug */ .h)(childCategoryData?.results, childCategory);
    const fullTitle = title && subTitle ? `${title} - ${subTitle}` : title;
    const finalTitle = fullTitle || defaultTitle;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                title: finalTitle,
                description: finalTitle + " bo‘yicha eng yaxshi raqamli mahsulotlarni Soff.uz da toping. Ishonchli sotuvchilar va sifatli kontent!",
                ...metaProps
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_11__/* ["default"] */ .ZP, {
                isFile: true,
                title: fullTitle,
                child: childCategoryData?.results,
                parent: fourChildData?.results,
                path: "/scientific-resources/"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                className: "ps-page--shop container p-lg-10 p-l-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                    // NOTE: changed temporarily to productsData to avoid issues with search results
                    // data={mergedData}
                    data: productsData,
                    page: page,
                    handlePagination: (number)=>{
                        handlePageChange(number);
                    },
                    isLoading: false
                })
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().catalogSectionBlock),
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                    className: "container mx-auto px-5",
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("section", {
                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().howItWorksSection),
                            children: [
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                                    className: "d-flex justify-content-center my-5",
                                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)((next_image__WEBPACK_IMPORTED_MODULE_10___default()), {
                                        width: 30,
                                        height: 30,
                                        src: "/static/img/star.svg",
                                        alt: "starts"
                                    })
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h2", {
                                    children: "Tayyor mahsulotlardan foydalanish qanday ishlaydi?"
                                }),
                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                    className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().steps),
                                    children: [
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().stepItem),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
                                                    src: "/static/img/catalogMenu.png",
                                                    alt: "starts"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
                                                            children: "Qidiring va tanlang"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                                                            children: "Katalogdan yoki qidiruv orqali sizga kerakli tayyor mahsulotni toping."
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().stepItem),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
                                                    src: "/static/img/catalogCoin.png",
                                                    alt: "starts"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
                                                            children: "Sotib oling"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
                                                            children: "Xavfsiz to‘lov tizimi orqali mahsulotni sotib oling — narx va shartlar oldindan ko‘rinadi."
                                                        })
                                                    ]
                                                })
                                            ]
                                        }),
                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                            className: (_widgets_home_catalog_style_module_scss__WEBPACK_IMPORTED_MODULE_14___default().stepItem),
                                            children: [
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("img", {
                                                    src: "/static/img/catalogSecure.png",
                                                    alt: "starts"
                                                }),
                                                /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
                                                            children: "Yuklab oling va foydalaning"
                                                        }),
                                                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
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
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_widgets_gray_card__WEBPACK_IMPORTED_MODULE_12__/* ["default"] */ .Z, {
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
    const { page =1 , parentCategory ="" , parentCategoryId ="" , childCategory ="" , childCategoryId ="" , search ="" , category ="" , content_extensions =[] , price_from ="" , price_to ="" , from_page ="" , to_page ="" ,  } = context.query;
    const queryParams = new URLSearchParams({
        direction: type,
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
        type,
        limit: 50,
        page,
        search
    });
    if (parentCategoryId) searchParams.append("category", parentCategoryId);
    if (childCategoryId) searchParams.append("child_category", childCategoryId);
    if (content_extensions && content_extensions.length) {
        const exts1 = Array.isArray(content_extensions) ? content_extensions : [
            content_extensions
        ];
        const filteredExts = exts1.map((ext)=>ext.includes(".") ? ext.slice(1) : ext);
        searchParams.append("file_type", filteredExts.toString());
    }
    if (price_from) searchParams.append("price_from", price_from);
    if (price_to) searchParams.append("price_to", price_to);
    if (+to_page) searchParams.append("page_to", to_page);
    if (+from_page) searchParams.append("page_from", from_page);
    const fetchJson = async (url)=>{
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };
    const categoryParam = childCategory ? childCategory : parentCategory;
    const productsUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_9__/* .baseUrlUseApi */ .q}customer/products/?${queryParams.toString()}&category=${categoryParam}`;
    const searchPageUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_9__/* .baseUrlUseApi */ .q}customer/same-google-search/?${searchParams.toString().replace(/%2C/g, ",")}`;
    const fourChildUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_9__/* .baseUrlUseApi */ .q}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_9__/* .baseUrlUseApi */ .q}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;
    const [productsData, fourChildData, childCategoryData] = await Promise.all([
        // NOTE: changed temporarily to productsUrl to avoid issues with search results
        // fetchJson(search ? searchPageUrl : productsUrl),
        fetchJson(productsUrl),
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
            productsUrl,
            searchPageUrl,
            content_extensions
        }
    };
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ProductCategoryScreen,
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

const getInitialPropsWrapper = getInitialPropsWrappers['/scientific-resources/[slug]'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/scientific-resources/[slug]')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/scientific-resources/[slug]')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1587:
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

/***/ 7795:
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

/***/ 3829:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_module_scss__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1587);
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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,5780,3015,7864,2315,6985,6598,3701,7534,5758,5029,1324,6908,1064,9187,3496,4345,6070,7973], () => (__webpack_exec__(3163)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=[slug].js.map