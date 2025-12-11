"use strict";
(() => {
var exports = {};
exports.id = 3202;
exports.ids = [3202];
exports.modules = {

/***/ 3809:
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
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4705);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6985);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1064);
/* harmony import */ var _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6070);
/* harmony import */ var _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(4345);
/* harmony import */ var _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(3801);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_8__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_9__, _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_10__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_7__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_8__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_9__, _shared_hooks_useSimilarSearch__WEBPACK_IMPORTED_MODULE_10__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);












const type = "3d";
const defaultTitle = "3D moddellar va Interier dizaynlar";
function ModelsAndInteriorDesign({ productsData , fourChildData , childCategoryData , parentCategory , childCategory , page ,  }) {
    // NOTE: changed temporarily to productsData to avoid issues with search results
    // const { mergedData } = useSimilarSearch({
    //     defaultData: productsData,
    //     defaultType: type,
    // });
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_3__.useRouter)();
    const handlePageChange = (newPage)=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: newPage
            }
        });
    };
    const title = (0,_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_8__/* .getTitleFromSlug */ .hX)(fourChildData?.results, parentCategory);
    const subTitle = (0,_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_8__/* .getTitleFromSlug */ .hX)(childCategoryData?.results, childCategory);
    const fullTitle = title && subTitle ? `${title} - ${subTitle}` : title;
    const finalTitle = fullTitle || defaultTitle;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
                title: finalTitle,
                description: `3D moddellar va Interier dizaynlar kategoriyasi: Taqdimotlar Tayyor shablonlar Kurs ishlari Diplom ishlari Referatlar Mustaqil ishlar Labaratoriya Ishlari Dissertatsiya ishlari Testlar O'quv qo'llanmalar Dars ishlanmalar Tarqatma materiallar Amaliy ishlar Blankalar Ijodiy Ishlar Loyihalar Plakatlar Maqola Ixtiro patenti Namunaviy hujjatlar Statistika Elektron kitoblar Dasturlash tillari `
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_8__/* ["default"] */ .ZP, {
                title: fullTitle,
                child: childCategoryData.results,
                parent: fourChildData.results,
                path: "/3d-models-and-interior-designs/"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
                className: "ps-page--shop container p-xl-0 p-l-0",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z, {
                    // NOTE: changed temporarily to productsData to avoid issues with search results
                    // data={mergedData}
                    data: productsData,
                    page: page,
                    handlePagination: (number)=>{
                        handlePageChange(number);
                    },
                    isLoading: false
                })
            })
        ]
    });
}
async function getServerSideProps$1(context) {
    const { slug , page =1 , parentCategory ="" , parentCategoryId , childCategory ="" , childCategoryId , search ="" , price_from ="" , price_to ="" ,  } = context.query;
    const fetchJson = async (url)=>{
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };
    const searchParams = new URLSearchParams({
        type,
        limit: 50,
        page,
        search
    });
    if (parentCategoryId) searchParams.append("category", parentCategoryId);
    if (childCategoryId) searchParams.append("child_category", childCategoryId);
    if (price_from) searchParams.append("price_from", price_from);
    if (price_to) searchParams.append("price_to", price_to);
    const categoryParam = childCategory ? childCategory : parentCategory;
    `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/same-google-search/?${searchParams.toString()}`;
    const productsUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/products/?direction=${type}&category=${categoryParam}&page=${page}&page_size=50&search=${search}`;
    const fourChildUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/four-child?direction=${type}`;
    const childCategoryUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlUseApi */ .q}customer/four-child?direction=${type}&parent__slug=${parentCategory}`;
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
            page
        }
    };
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': ModelsAndInteriorDesign,
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

const getInitialPropsWrapper = getInitialPropsWrappers['/3d-models-and-interior-designs/[slug]'] || _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetInitialPropsWithSentry;

if (pageComponent && typeof origGetInitialProps === 'function') {
  pageComponent.getInitialProps = getInitialPropsWrapper(origGetInitialProps) ;
}

const getStaticProps =
  typeof origGetStaticProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetStaticPropsWithSentry(origGetStaticProps, '/3d-models-and-interior-designs/[slug]')
    : undefined;
const getServerSideProps =
  typeof origGetServerSideProps === 'function'
    ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapGetServerSidePropsWithSentry(origGetServerSideProps, '/3d-models-and-interior-designs/[slug]')
    : undefined;

const pageWrapperTemplate = pageComponent ? _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapPageComponentWithSentry(pageComponent ) : pageComponent;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 7066:
/***/ ((module) => {

module.exports = require("@ant-design/icons");

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

/***/ }),

/***/ 577:
/***/ ((module) => {

module.exports = import("react-icons/lu");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,5780,3015,7864,2315,6985,6598,3701,7534,5758,5029,1324,6908,1064,9187,3496,4345,6070], () => (__webpack_exec__(3809)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=[slug].js.map