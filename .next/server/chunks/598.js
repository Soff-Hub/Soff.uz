"use strict";
exports.id = 598;
exports.ids = [598];
exports.modules = {

/***/ 598:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hi": () => (/* binding */ api),
/* harmony export */   "v2": () => (/* binding */ baseURL)
/* harmony export */ });
/* unused harmony exports baseURLFreelance, apiForFreelance */
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_0__]);
axios__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/`;
const baseURLFreelance = `${process.env.NEXT_PUBLIC_FREELEANCE_URL}/api/v1/`;
const api = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: baseURL,
    timeout: 30000
});
const apiForFreelance = axios__WEBPACK_IMPORTED_MODULE_0__["default"].create({
    baseURL: baseURLFreelance,
    timeout: 30000
});
api.interceptors.request.use((config)=>{
    const storedToken = localStorage.getItem("user");
    if (storedToken && JSON.parse(storedToken).access) {
        const token = JSON.parse(storedToken).access;
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
}, (error)=>{
    return Promise.reject(error);
});
api.interceptors.response.use((response)=>{
    return response;
}, (error)=>{
    if (error.response && error.response.status === 403) {
        // Check if URL has modal=open query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const hasModalOpen = urlParams.get("modal") === "open";
        if (!hasModalOpen) {
            localStorage.clear();
            window.location.href = "/";
        }
    }
    return Promise.reject(error);
});

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;