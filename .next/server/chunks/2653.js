;{try{(function(){var e="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:{},n=(new e.Error).stack;n&&(e._sentryDebugIds=e._sentryDebugIds||{},e._sentryDebugIds[n]="1a2d1471-290e-415d-adca-23d69d35ca4e",e._sentryDebugIdIdentifier="sentry-dbid-1a2d1471-290e-415d-adca-23d69d35ca4e");})();}catch(e){}};
"use strict";
exports.id = 2653;
exports.ids = [2653];
exports.modules = {

/***/ 2653:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ TelegramConfigmForm)
/* harmony export */ });
/* unused harmony export formatTime */
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8176);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9648);
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1869);
/* harmony import */ var _store_auth_slice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(6017);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_6__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_7__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_8__]);
([axios__WEBPACK_IMPORTED_MODULE_6__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_7__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);









const formatTime = (seconds)=>{
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
};
const isReturnUrlEmpty = (returnUrl)=>{
    return !returnUrl || returnUrl === "undefined" || returnUrl === "null" || returnUrl.trim() === "/" || returnUrl.trim() === "";
};
function TelegramConfigmForm({ isModal , onSuccess  }) {
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { 0: secondsRemaining , 1: setSecondsRemaining  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(120);
    const { 0: start , 1: setStart  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_4__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_5__.useDispatch)();
    const handleSubmit = async ({ code  })=>{
        setLoading(true);
        const data = {
            code
        };
        try {
            const utm_source = localStorage.getItem("utm_source");
            const resp = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_7__/* .baseUrlAuth */ .iq + `auth/telegram-verify/${utm_source ? `?utm_source=${utm_source}` : ""}`, data);
            dispatch((0,_store_auth_slice__WEBPACK_IMPORTED_MODULE_8__/* .login */ .x4)({
                user: {
                    ...resp.data,
                    role: "customer"
                },
                data: {}
            }));
            if (resp.data?.role === "seller") {
                localStorage.setItem("is_seller", "1");
            }
            if (isModal) {
                antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Siz tizimdan muvaffaqqiyatli ro'yxatdan o'tdingiz");
                onSuccess();
                return;
            }
            const decodedUrl = decodeURIComponent(router?.query?.returnUrl || "");
            if (router?.query?.returnUrl && !isReturnUrlEmpty(decodedUrl)) {
                router.push(decodedUrl);
            } else if (router?.query?.id) {
                router.push(`/account/checkout?id=${router?.query?.id}`);
            } else if (router?.query?.deal) {
                router.push(`/account/all-orders`);
            } else {
                router.push("/account/sellerproducts");
            }
            antd__WEBPACK_IMPORTED_MODULE_2__.message.success("Siz tizimdan muvaffaqqiyatli ro'yxatdan o'tdingiz");
        } catch (err) {
            setLoading(false);
            antd__WEBPACK_IMPORTED_MODULE_2__.message.error(err?.response?.data?.msg);
        }
    };
    const getRecode = async ()=>{
        setLoading(true);
        setSecondsRemaining(120);
        const interval = setInterval(()=>{
            setSecondsRemaining((prevSeconds)=>{
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                } else {
                    clearInterval(interval);
                    return 0;
                }
            });
        }, 1000);
        setLoading(false);
    };
    const handleStart = ()=>{
        setStart(true);
        getRecode();
    };
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        style: {
            backgroundColor: "#f1f1f1",
            padding: "50px 20px"
        },
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "container p-0",
            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                className: "ps-form--account",
                children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(antd__WEBPACK_IMPORTED_MODULE_2__.Form, {
                    onFinish: handleSubmit,
                    children: [
                        /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-center fs-2 mb-4",
                            children: [
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "Kirish uchun "
                                }),
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    onClick: handleStart,
                                    href: "https://t.me/soff_auth_bot?start=new_code",
                                    target: "_blank",
                                    className: "text-success",
                                    children: "@soff_auth_bot"
                                }),
                                " ",
                                /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                    children: "orqali tasdiqlash kodini oling"
                                })
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                            name: "code",
                            className: "mb-4 d-flex justify-content-center",
                            rules: [
                                {
                                    required: true,
                                    message: "Ilitmos kodni kiriting"
                                }, 
                            ],
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input.OTP, {
                                size: "large",
                                length: 4,
                                type: "number",
                                style: {
                                    maxWidth: "200px"
                                },
                                className: "mx-auto"
                            })
                        }),
                        start ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            children: secondsRemaining === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                onClick: getRecode,
                                href: "tg://resolve?domain=soff_uz_bot",
                                className: "text-danger text-center d-block",
                                children: "Qayta kod olish"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "text-xs cursor-pointer text-center mb-4",
                                children: [
                                    "Qayta kod olish uchun",
                                    " ",
                                    formatTime(secondsRemaining)
                                ]
                            })
                        }) : "",
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "form-group submit mt-3",
                            children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                disabled: true,
                                type: "submit",
                                className: "ps-btn ps-btn--fullwidth",
                                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_3__.BeatLoader, {
                                    color: "#fff"
                                })
                            }) : /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "submit",
                                className: "ps-btn ps-btn--fullwidth text-white",
                                children: "Tasdiqlash"
                            })
                        })
                    ]
                })
            })
        })
    });
}

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=2653.js.map