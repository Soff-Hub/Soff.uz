"use strict";
exports.id = 7257;
exports.ids = [7257];
exports.modules = {

/***/ 674:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "f": () => (/* binding */ useTelegram)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function useTelegram() {
    const { 0: telegramData , 1: setTelegramData  } = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)({
        tg: null,
        queryId: null,
        tgId: null
    });
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        // Only run on client side
        if (false) {}
    }, []);
    return telegramData;
}


/***/ }),

/***/ 2625:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function TextSlicer({ bio , len =80 , title  }) {
    const { 0: expanded , 1: setExpanded  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    if (!bio) return null;
    const shortText = bio.length > len ? bio.slice(0, len) + "..." : bio;
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
        style: {
            fontWeight: 600,
            fontSize: "13px",
            marginBottom: 0,
            color: "black"
        },
        children: [
            title || "",
            " ",
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                className: "",
                children: expanded ? bio : shortText
            }),
            bio.length > len && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                onClick: ()=>setExpanded(!expanded),
                style: {
                    color: "#00a44f",
                    cursor: "pointer",
                    marginLeft: "8px",
                    fontSize: "13px",
                    fontWeight: 500,
                    textDecoration: "underline"
                },
                children: expanded ? "kamroq" : "batafsil"
            })
        ]
    });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TextSlicer);


/***/ })

};
;