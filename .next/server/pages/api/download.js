"use strict";
(() => {
var exports = {};
exports.id = 1051;
exports.ids = [1051];
exports.modules = {

/***/ 8097:
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 9648:
/***/ ((module) => {

module.exports = import("axios");;

/***/ }),

/***/ 314:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ wrappedHandler$1)
/* harmony export */ });
/* harmony import */ var _sentry_server_config_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1024);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9648);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_2__]);
axios__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




async function handler(req, res) {
    try {
        const fileUrl = req.query.url;
        if (!fileUrl) {
            return res.status(400).json({
                error: "Missing URL"
            });
        }
        const response = await axios__WEBPACK_IMPORTED_MODULE_2__["default"].get(fileUrl, {
            responseType: "arraybuffer"
        });
        const filename = fileUrl.split("/").pop().split("?")[0] || "file";
        // Set headers to FORCE download
        res.setHeader("Content-Type", response.headers["content-type"] || "application/octet-stream");
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
        res.status(200).send(response.data);
    } catch (error) {
        console.error("Download error:", error.message);
        res.status(500).json({
            error: "Unable to download file"
        });
    }
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    'default': handler
});

/*
 * This file is a template for the code which will be substituted when our webpack loader handles API files in the
 * `pages/` directory.
 *
 * We use `__SENTRY_WRAPPING_TARGET_FILE__.cjs` as a placeholder for the path to the file being wrapped. Because it's not a real package,
 * this causes both TS and ESLint to complain, hence the pragma comments below.
 */

const userApiModule = serverComponentModule ;

// Default to undefined. It's possible for Next.js users to not define any exports/handlers in an API route. If that is
// the case Next.js wil crash during runtime but the Sentry SDK should definitely not crash so we need tohandle it.
let userProvidedHandler = undefined;

if ('default' in userApiModule && typeof userApiModule.default === 'function') {
  // Handle when user defines via ESM export: `export default myFunction;`
  userProvidedHandler = userApiModule.default;
} else if (typeof userApiModule === 'function') {
  // Handle when user defines via CJS export: "module.exports = myFunction;"
  userProvidedHandler = userApiModule;
}

const origConfig = userApiModule.config || {};

// Setting `externalResolver` to `true` prevents nextjs from throwing a warning in dev about API routes resolving
// without sending a response. It's a false positive (a response is sent, but only after we flush our send queue), and
// we throw a warning of our own to tell folks that, but it's better if we just don't have to deal with it in the first
// place.
const config = {
  ...origConfig,
  api: {
    ...origConfig.api,
    externalResolver: true,
  },
};

let wrappedHandler = userProvidedHandler;

if (wrappedHandler) {
  wrappedHandler = _sentry_nextjs__WEBPACK_IMPORTED_MODULE_1__.wrapApiHandlerWithSentry(wrappedHandler, '/api/download');
}

if (wrappedHandler && undefined) {}

const wrappedHandler$1 = wrappedHandler;



__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [1024], () => (__webpack_exec__(314)));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=download.js.map