;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="8110821f-bf32-4b2f-9703-19feba225236",e._sentryDebugIdIdentifier="sentry-dbid-8110821f-bf32-4b2f-9703-19feba225236");})();}catch(e){}};
"use strict";
exports.id = 7971;
exports.ids = [7971];
exports.modules = {

/***/ 7971:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Sv": () => (/* binding */ downloadFile),
/* harmony export */   "aF": () => (/* binding */ truncateText),
/* harmony export */   "sS": () => (/* binding */ formatFileSize)
/* harmony export */ });
/* unused harmony export highlightMatch */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const truncateText = (title, maxLength = 7)=>{
    if (!title) return "";
    return title.length > maxLength ? title.slice(0, maxLength) + "..." : title;
};
function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + " B"; // bytes
    else if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"; // kilobytes
    else if (bytes < 1024 * 1024 * 1024) return (bytes / (1024 * 1024)).toFixed(2) + " MB"; // megabytes
    else return (bytes / (1024 * 1024 * 1024)).toFixed(2) + " GB"; // gigabytes
}
function downloadFile(s3Link) {
    const downloadUrl = `/api/download?url=${encodeURIComponent(s3Link)}`;
    window.open(downloadUrl, "_blank");
}
function highlightMatch(text, query) {
    if (!query || !text) return text;
    const lowerText = text.toLowerCase();
    const lowerQuery = query.toLowerCase();
    const matchIndex = lowerText.indexOf(lowerQuery);
    if (matchIndex === -1) return text;
    const before = text.slice(0, matchIndex);
    const match = text.slice(matchIndex, matchIndex + query.length);
    const after = text.slice(matchIndex + query.length);
    return /*#__PURE__*/ _jsxs(_Fragment, {
        children: [
            before,
            /*#__PURE__*/ _jsx("strong", {
                className: "text-black dark:text-white",
                children: match
            }),
            after
        ]
    });
}


/***/ })

};
;
//# sourceMappingURL=7971.js.map