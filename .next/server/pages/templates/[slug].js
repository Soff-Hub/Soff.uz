"use strict";
(() => {
var exports = {};
exports.id = 8221;
exports.ids = [8221];
exports.modules = {

/***/ 9442:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Templates),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7109);
/* harmony import */ var _components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4796);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _repositories_useApi__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4013);
/* harmony import */ var _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1131);
/* harmony import */ var _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1455);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_5__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_7__]);
([_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__, _repositories_useApi__WEBPACK_IMPORTED_MODULE_5__, _components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__, _components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function Templates({ productsData , fourChildData , childCategoryData , parentCategory , childCategory , page ,  }) {
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const title = (0,_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_7__/* .getTitleFromSlug */ .h)(fourChildData?.results, parentCategory);
    const subTitle = (0,_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_7__/* .getTitleFromSlug */ .h)(childCategoryData?.results, childCategory);
    const fullTitle = title && subTitle ? `${title} - ${subTitle}` : title ? title : "Tayyor shablonlar";
    const handlePageChange = (newPage)=>{
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                page: newPage
            }
        });
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_widgets_layouts_PageContainer__WEBPACK_IMPORTED_MODULE_2__/* ["default"] */ .Z, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_shared_headers_Meta__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                title: fullTitle,
                description: `Biz siz qidirayotgan mahsulotlarni Soff.uz saytimizning kategoriyasida topdik`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_elements_product_filter_section_ProductFilterSection__WEBPACK_IMPORTED_MODULE_7__/* ["default"] */ .Z, {
                child: childCategoryData.results,
                parent: fourChildData.results,
                path: "/templates/"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "ps-page--shop container my-5 p-xl-0 p-l-0",
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_category_ProductsByCategory__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {
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
async function getServerSideProps(context) {
    const { slug , page =1 , parentCategory ="" , childCategory ="" , search ="" ,  } = context.query;
    const fetchJson = async (url)=>{
        const res = await fetch(url);
        if (!res.ok) {
            return null;
        }
        return res.json();
    };
    const categoryParam = childCategory ? childCategory : parentCategory;
    const productsUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_5__/* .baseUrlUseApi */ .q}customer/products/?direction=template&category=${categoryParam}&page=${page}&page_size=50&search=${search}`;
    const fourChildUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_5__/* .baseUrlUseApi */ .q}customer/four-child?direction=template`;
    const childCategoryUrl = `${_repositories_useApi__WEBPACK_IMPORTED_MODULE_5__/* .baseUrlUseApi */ .q}customer/four-child?direction=template&parent__slug=${parentCategory}`;
    const [productsData, fourChildData, childCategoryData] = await Promise.all([
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
var __webpack_exports__ = __webpack_require__.X(0, [676,1664,5675,5152,4846,4246,7697,4796,5913,740,3328,1602,5177,6156,4013,1131,2930,1455], () => (__webpack_exec__(9442)));
module.exports = __webpack_exports__;

})();