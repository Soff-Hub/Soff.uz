"use strict";
(() => {
var exports = {};
exports.id = 4688;
exports.ids = [4688];
exports.modules = {

/***/ 1386:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


const PageLoader = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            id: "loader-wrapper",
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "loader-section section-left"
                }),
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "loader-section section-right"
                })
            ]
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageLoader);


/***/ }),

/***/ 7556:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getServerSideProps": () => (/* binding */ getServerSideProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1218);
/* harmony import */ var jwt_decode__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2880);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _store_auth_slice__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4846);
/* harmony import */ var _components_elements_common_PageLoader__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(1386);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_2__, jwt_decode__WEBPACK_IMPORTED_MODULE_3__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_5__]);
([_reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_2__, jwt_decode__WEBPACK_IMPORTED_MODULE_3__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);








function Oauth(props) {
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_4__.useDispatch)();
    const data = {
        phone_or_email: props?.user?.user,
        role: "customer"
    };
    const user = {
        ...props?.user
    };
    const config = {
        user,
        data
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        if (config) {
            dispatch((0,_store_auth_slice__WEBPACK_IMPORTED_MODULE_5__/* .login */ .x4)(config));
            next_router__WEBPACK_IMPORTED_MODULE_7___default().push(props?.returnUrl || "/?tab=");
        }
    }, [
        config
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_elements_common_PageLoader__WEBPACK_IMPORTED_MODULE_6__/* ["default"] */ .Z, {})
    });
}
async function getServerSideProps(context) {
    const { query  } = context;
    const { token , returnUrl  } = query;
    const response = await fetch(`${_reositoriy_admin_Repository__WEBPACK_IMPORTED_MODULE_2__/* .baseUrlProfie */ .YR}auth/google-login/customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: (0,jwt_decode__WEBPACK_IMPORTED_MODULE_3__.jwtDecode)(token)?.email
        })
    });
    const data = await response.json();
    return {
        props: {
            returnUrl: returnUrl || "",
            user: data
        }
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Oauth);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 1218:
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

/***/ 6734:
/***/ ((module) => {

module.exports = require("js-cookie");

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
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [4846], () => (__webpack_exec__(7556)));
module.exports = __webpack_exports__;

})();