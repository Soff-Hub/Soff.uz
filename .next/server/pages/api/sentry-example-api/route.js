;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="7a674104-af1c-4e96-a925-f82566debe39",e._sentryDebugIdIdentifier="sentry-dbid-7a674104-af1c-4e96-a925-f82566debe39");})();}catch(e){}};
"use strict";
(() => {
var exports = {};
exports.id = 7436;
exports.ids = [7436];
exports.modules = {

/***/ 8097:
/***/ ((module) => {

module.exports = require("@sentry/nextjs");

/***/ }),

/***/ 660:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (/* binding */ wrappedHandler$1)
/* harmony export */ });
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);


class SentryExampleBackendError extends Error {
    constructor(message){
        super(message);
        this.name = "SentryExampleBackendError";
    }
}
async function handler(req, res) {
    await _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.startSpan({
        name: "Example Backend Span",
        op: "test"
    }, async ()=>{
        throw new SentryExampleBackendError("This error is raised on the backend of the example page.");
    });
}

var serverComponentModule = /*#__PURE__*/Object.freeze({
    __proto__: null,
    default: handler
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
// the case Next.js will crash during runtime but the Sentry SDK should definitely not crash so we need to handle it.
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

if (wrappedHandler && undefined) {}

if (wrappedHandler) {
  wrappedHandler = _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.wrapApiHandlerWithSentry(wrappedHandler, '/api/sentry-example-api/route');
}

const wrappedHandler$1 = wrappedHandler;




/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(660));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=route.js.map