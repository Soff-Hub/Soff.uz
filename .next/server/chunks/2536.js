"use strict";
exports.id = 2536;
exports.ids = [2536];
exports.modules = {

/***/ 2536:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ CodeVerifyForm)
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
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9648);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(3608);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _store_auth_slice__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3015);
/* harmony import */ var _shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(6598);
/* harmony import */ var _shared_utilities_return_url__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(4533);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_4__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_6__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_8__]);
([axios__WEBPACK_IMPORTED_MODULE_4__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_6__, _store_auth_slice__WEBPACK_IMPORTED_MODULE_8__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);











const formatTime = (seconds)=>{
    const minutes = Math.floor(seconds / 60);
    const secondsLeft = seconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(secondsLeft).padStart(2, "0")}`;
};
// Helper function to validate slug
const isValidSlug = (slug)=>{
    return slug && typeof slug === "string" && slug.trim().length > 0 && slug !== "undefined" && slug !== "null";
};
function CodeVerifyForm({ authCode , onClose , slug , onSuccess  }) {
    const { 0: loading , 1: setLoading  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);
    const { startInterval , clearAll  } = (0,_shared_hooks_useTimeManager__WEBPACK_IMPORTED_MODULE_9__/* .useTimeManager */ .h)();
    const { 0: secondsRemaining , 1: setSecondsRemaining  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(120);
    const { 0: msg , 1: setMsg  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_7__.useDispatch)();
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        setMsg(localStorage.getItem("msg"));
        startTimer();
    }, []);
    const startTimer = ()=>{
        clearAll();
        startInterval(()=>{
            setSecondsRemaining((prev)=>{
                if (prev > 0) return prev - 1;
                clearAll();
                return 0;
            });
        }, 1000);
    };
    const handleSubmit = async ({ code  })=>{
        setLoading(true);
        const data = {
            user: router?.query?.user || authCode,
            code
        };
        try {
            const resp = await axios__WEBPACK_IMPORTED_MODULE_4__["default"].post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_6__/* .baseUrlAuth */ .iq + "auth/verify/", data);
            dispatch((0,_store_auth_slice__WEBPACK_IMPORTED_MODULE_8__/* .login */ .x4)({
                user: {
                    ...resp.data,
                    role: "customer"
                },
                data: JSON.parse(localStorage.getItem("data"))
            }));
            if (resp.data?.role === "seller") {
                localStorage.setItem("is_seller", "1");
            }
            if (typeof onClose === "function") {
                onClose();
            }
            const decodedUrl = decodeURIComponent(router?.query?.returnUrl || "");
            if (router?.query?.returnUrl && !(0,_shared_utilities_return_url__WEBPACK_IMPORTED_MODULE_10__/* .isReturnUrlEmpty */ .O)(decodedUrl)) {
                router.push(decodedUrl);
            } else if (router?.query?.id) {
                router.push(`/account/checkout?id=${router?.query?.id}`);
            } else if (router?.query?.deal) {
                router.push(`/account/all-orders`);
            } else if (authCode && isValidSlug(slug)) {
                router.push(`/service/${slug}?paymodal=open`);
            } else if (authCode && !isValidSlug(slug)) {
                console.error("Invalid slug for service navigation after auth:", slug);
                if (typeof onSuccess === "function") {
                    onSuccess();
                } else {
                    router.push("/account/sellerproducts");
                }
            } else if (typeof onSuccess === "function") {
                onSuccess();
            } else if (authCode) {} else {
                router.push("/account/sellerproducts");
            }
        } catch (err) {
            setLoading(false);
            antd__WEBPACK_IMPORTED_MODULE_2__.Modal.error({
                centered: true,
                title: "Xatolik",
                content: err?.response?.data?.msg
            });
        }
    };
    const getRecode = async ()=>{
        setLoading(true);
        const data = JSON.parse(localStorage.getItem("data"));
        try {
            await axios__WEBPACK_IMPORTED_MODULE_4__["default"].post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_6__/* .baseUrlAuth */ .iq + "auth/get-new-code/", {
                ...data,
                user: router?.query?.user
            });
            antd__WEBPACK_IMPORTED_MODULE_2__.Modal.success({
                centered: true,
                title: "Yuborildi",
                content: "Tasdiqlash kodi qayta yuborildi"
            });
            setSecondsRemaining(120);
            startTimer(); // Yangi kod yuborilganda timerni qayta ishga tushiramiz
        } catch (err) {
            antd__WEBPACK_IMPORTED_MODULE_2__.Modal.error({
                centered: true,
                title: "Xatolik",
                content: err?.response?.data?.msg
            });
        }
        setLoading(false);
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
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-center fs-2 mb-4",
                            children: msg
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
                            name: "code",
                            className: "mb-4 d-flex justify-content-center",
                            rules: [
                                {
                                    required: true,
                                    message: "Iltimos, kodni kiriting"
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
                        secondsRemaining === 0 ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                            className: "text-xs text-center mb-4",
                            style: {
                                color: "red",
                                cursor: "pointer"
                            },
                            onClick: getRecode,
                            children: "Qayta kod yuborish"
                        }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                            className: "text-xs text-center mb-4",
                            children: [
                                "Qayta kod olish uchun",
                                " ",
                                formatTime(secondsRemaining)
                            ]
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "form-group submit mt-3",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "submit",
                                disabled: loading,
                                className: "ps-btn text-white fw-normal ps-btn--fullwidth",
                                children: loading ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_3__.BeatLoader, {
                                    color: "#fff"
                                }) : "Tasdiqlash"
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

/***/ }),

/***/ 4533:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "O": () => (/* binding */ isReturnUrlEmpty)
/* harmony export */ });
const isReturnUrlEmpty = (returnUrl)=>{
    return !returnUrl || returnUrl === "undefined" || returnUrl === "null" || returnUrl.trim() === "/" || returnUrl.trim() === "";
};


/***/ })

};
;
//# sourceMappingURL=2536.js.map