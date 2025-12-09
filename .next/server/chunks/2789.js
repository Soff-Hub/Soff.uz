;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="20b3d152-1cf0-471c-87bf-d1a408178c4b",e._sentryDebugIdIdentifier="sentry-dbid-20b3d152-1cf0-471c-87bf-d1a408178c4b");})();}catch(e){}};
"use strict";
exports.id = 2789;
exports.ids = [2789];
exports.modules = {

/***/ 2789:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_partials_account_auth_LoginForm_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1080);
/* harmony import */ var _components_CodeVerifyModal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8647);
/* harmony import */ var _components_TelegramCodeVerifyModal_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(5544);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_partials_account_auth_LoginForm_jsx__WEBPACK_IMPORTED_MODULE_3__, _components_CodeVerifyModal__WEBPACK_IMPORTED_MODULE_4__, _components_TelegramCodeVerifyModal_jsx__WEBPACK_IMPORTED_MODULE_5__]);
([_components_partials_account_auth_LoginForm_jsx__WEBPACK_IMPORTED_MODULE_3__, _components_CodeVerifyModal__WEBPACK_IMPORTED_MODULE_4__, _components_TelegramCodeVerifyModal_jsx__WEBPACK_IMPORTED_MODULE_5__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);






const AuthModal = ({ open , onClose , slug , onSuccess , onGoogleSuccessNavigateTo ,  })=>{
    const { 0: codeModalOpen , 1: setCodeModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: telegramCodeModalOpen , 1: setTelegramCodeModalOpen  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: authCode , 1: setCode  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)();
    const closeAllModals = ()=>{
        setCodeModalOpen(false);
        setTelegramCodeModalOpen(false);
        onClose();
    };
    const handleSuccessOnTelegram = ()=>{
        setTelegramCodeModalOpen(false);
        onClose();
        onSuccess();
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
                className: "custom-auth-modal",
                open: open && !codeModalOpen && !telegramCodeModalOpen,
                onCancel: onClose,
                footer: null,
                centered: true,
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_account_auth_LoginForm_jsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                    setCode: setCode,
                    openTelegram: ()=>{
                        setTelegramCodeModalOpen(true);
                    },
                    onSuccess: ()=>setCodeModalOpen(true),
                    onGoogleSuccessNavigateTo: onGoogleSuccessNavigateTo,
                    isModal: true
                })
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_CodeVerifyModal__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                onSuccess: onSuccess,
                authCode: authCode,
                open: codeModalOpen,
                onClose: closeAllModals,
                slug: slug
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_TelegramCodeVerifyModal_jsx__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                onSuccess: handleSuccessOnTelegram,
                open: telegramCodeModalOpen,
                onClose: closeAllModals
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AuthModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 8647:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_partials_account_auth_CodeVerifyForm_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(1708);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_partials_account_auth_CodeVerifyForm_jsx__WEBPACK_IMPORTED_MODULE_3__]);
_components_partials_account_auth_CodeVerifyForm_jsx__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const CodeVerifyModal = ({ open , onClose , authCode , slug , onSuccess  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        className: "custom-auth-modal",
        open: open,
        onCancel: onClose,
        footer: null,
        centered: true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_account_auth_CodeVerifyForm_jsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            slug: slug,
            onClose: onClose,
            authCode: authCode,
            onSuccess: onSuccess
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeVerifyModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 5544:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_partials_account_auth_TelegramConfirmForm_jsx__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(2653);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_partials_account_auth_TelegramConfirmForm_jsx__WEBPACK_IMPORTED_MODULE_3__]);
_components_partials_account_auth_TelegramConfirmForm_jsx__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const CodeVerifyModal = ({ open , onClose , onSuccess  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Modal, {
        className: "custom-auth-modal",
        open: open,
        onCancel: onClose,
        footer: null,
        centered: true,
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_partials_account_auth_TelegramConfirmForm_jsx__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
            isModal: true,
            onSuccess: onSuccess
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CodeVerifyModal);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=2789.js.map