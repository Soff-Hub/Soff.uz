"use strict";
exports.id = 1024;
exports.ids = [1024];
exports.modules = {

/***/ 1024:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8097);
/* harmony import */ var _sentry_nextjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__);
var _sentryCollisionFreeGlobalObject =  false ? 0 : typeof global != "undefined" ? global : typeof self != "undefined" ? self : {};
_sentryCollisionFreeGlobalObject["__sentryRewritesTunnelPath__"] = undefined;
_sentryCollisionFreeGlobalObject["SENTRY_RELEASE"] = {
    "id": "6d4f1387f214b2b71cdd536169b9cda30969dc90"
};
_sentryCollisionFreeGlobalObject["__sentryBasePath"] = undefined;
_sentryCollisionFreeGlobalObject["__rewriteFramesDistDir__"] = ".next";
// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

_sentry_nextjs__WEBPACK_IMPORTED_MODULE_0__.init({
    dsn: "https://4d5519b45e78b5e17178ae4017329685@o4510499805134848.ingest.de.sentry.io/4510499809001552",
    // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
    tracesSampleRate: 1,
    // Enable logs to be sent to Sentry
    enableLogs: true,
    // Enable sending user PII (Personally Identifiable Information)
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/configuration/options/#sendDefaultPii
    sendDefaultPii: true
});


/***/ })

};
;
//# sourceMappingURL=1024.js.map