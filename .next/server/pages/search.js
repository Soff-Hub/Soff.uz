"use strict";
(() => {
var exports = {};
exports.id = 9603;
exports.ids = [9603];
exports.modules = {

/***/ 1025:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
const SearchPage = ()=>{
    return null;
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SearchPage);
async function getServerSideProps(ctx) {
    return {
        redirect: {
            destination: `/search-page${ctx.resolvedUrl.includes("?") ? ctx.resolvedUrl.substring(ctx.resolvedUrl.indexOf("?")) : ""}`,
            permanent: false
        }
    };
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(1025));
module.exports = __webpack_exports__;

})();