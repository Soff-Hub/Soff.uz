;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="3d0e71e0-89e6-4381-97c2-7b0cbdfa710e",e._sentryDebugIdIdentifier="sentry-dbid-3d0e71e0-89e6-4381-97c2-7b0cbdfa710e");})();}catch(e){}};
"use strict";
exports.id = 9583;
exports.ids = [9583];
exports.modules = {

/***/ 9583:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ NextImageCard)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5675);
/* harmony import */ var next_image__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_image__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7567);






function NextImageCard({ url , width , height , clasS , payload , detail ,  }) {
    const { 0: up , 1: setUp  } = (0,react__WEBPACK_IMPORTED_MODULE_2__.useState)(true);
    const { startTimeout , stopTimeout  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_3__/* .useTimeManager */ .h)();
    const handleUp = ()=>{
        setUp(false);
    };
    (0,react__WEBPACK_IMPORTED_MODULE_2__.useEffect)(()=>{
        const timing = startTimeout(()=>{
            setUp(false);
        }, 3000);
        return ()=>stopTimeout(timing);
    }, [
        up
    ]);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: `${(payload?.document?.content_type === "video" || payload?.document?.content_type === "audio") && "video_poster"}`,
        children: payload?.document?.content_type === "video" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "video_poster_fon",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "fa-regular fa-circle-play"
                    })
                }),
                url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                    src: url,
                    width: width,
                    height: height,
                    alt: url,
                    className: clasS,
                    objectFit: "contain",
                    unoptimized: true
                })
            ]
        }) : payload?.document?.content_type === "audio" ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: [
                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "video_poster_fon",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "fa-solid fa-music"
                    })
                }),
                url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                    src: url,
                    width: width,
                    height: height,
                    alt: url,
                    className: clasS,
                    objectFit: "contain",
                    unoptimized: true
                })
            ]
        }) : detail ? /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
            onClick: ()=>handleUp(),
            className: ` ${up && "product_priview"} `,
            children: [
                url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                    src: url,
                    width: width,
                    height: height,
                    alt: url,
                    className: clasS,
                    objectFit: "contain",
                    unoptimized: true
                }),
                up && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                    className: "up_left",
                    children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("i", {
                        className: "fa-solid fa-angles-up fa-bounce"
                    })
                })
            ]
        }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
            children: url && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_image__WEBPACK_IMPORTED_MODULE_1___default()), {
                src: url,
                width: width,
                height: height,
                alt: url,
                className: clasS,
                objectFit: "contain",
                unoptimized: true
            })
        })
    });
}


/***/ })

};
;
//# sourceMappingURL=9583.js.map