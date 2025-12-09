;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="db25b1a2-5465-4bd6-a367-5ce54ba01932",e._sentryDebugIdIdentifier="sentry-dbid-db25b1a2-5465-4bd6-a367-5ce54ba01932");})();}catch(e){}};
"use strict";
exports.id = 7567;
exports.ids = [7567];
exports.modules = {

/***/ 7567:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "h": () => (/* binding */ useTimeManager)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useTimeManager() {
    const timeouts = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set());
    const intervals = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(new Set());
    const startTimeout = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((callback, delay)=>{
        const id = setTimeout(()=>{
            timeouts.current.delete(id);
            callback();
        }, delay);
        timeouts.current.add(id);
        return id;
    }, []);
    const stopTimeout = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id)=>{
        if (id) {
            clearTimeout(id);
            timeouts.current.delete(id);
        } else {
            timeouts.current.forEach(clearTimeout);
            timeouts.current.clear();
        }
    }, []);
    const startInterval = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((callback, delay)=>{
        const id = setInterval(callback, delay);
        intervals.current.add(id);
        return id;
    }, []);
    const stopInterval = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)((id)=>{
        if (id) {
            clearInterval(id);
            intervals.current.delete(id);
        } else {
            intervals.current.forEach(clearInterval);
            intervals.current.clear();
        }
    }, []);
    const clearAll = (0,react__WEBPACK_IMPORTED_MODULE_0__.useCallback)(()=>{
        stopTimeout();
        stopInterval();
    }, [
        stopTimeout,
        stopInterval
    ]);
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>clearAll, [
        clearAll
    ]);
    return {
        startTimeout,
        stopTimeout,
        startInterval,
        stopInterval,
        clearAll
    };
}


/***/ })

};
;
//# sourceMappingURL=7567.js.map