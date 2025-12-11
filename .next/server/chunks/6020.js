"use strict";
exports.id = 6020;
exports.ids = [6020];
exports.modules = {

/***/ 2578:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ GoogleBox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);



// import useAuth from '~/shared/hooks/useAuth';
function GoogleBox({ // loading,
// params,
isModal , onGoogleSuccessNavigateTo , openTelegram ,  }) {
    // const { registerGoogleUser } = useAuth();
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_1__.useRouter)();
    const handleGoogleClick = async ()=>{
        // Build the OAuth URL with proper query parameters
        const utm_source = localStorage.getItem("utm_source");
        const baseUrl = "https://api.soff.uz/auth/social/login/customer";
        const params = new URLSearchParams();
        if (onGoogleSuccessNavigateTo) {
            localStorage.setItem("google_redirect_url", onGoogleSuccessNavigateTo);
        }
        // Add existing query parameters
        Object.keys(router.query).forEach((key)=>{
            if (router.query[key]) {
                params.append(key, router.query[key]);
            }
        });
        if (utm_source) {
            params.append("utm_source", utm_source);
        }
        // Add return URL for modals
        if (isModal) {
            params.append("returnUrl", encodeURIComponent(router.asPath));
        // onSuccess();
        }
        const fullUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
        // Use window.location for external redirects - this works reliably on iOS 18
        window.location.href = fullUrl;
    };
    const handleTelegramClick = async ()=>{
        if (isModal) {
            openTelegram();
        // Router.push({
        //     query: {
        //         ...Router.query,
        //         returnUrl: encodeURIComponent(router.asPath),
        //     },
        //     pathname: '/auth/telegram',
        // });
        // onSuccess();
        } else {
            next_router__WEBPACK_IMPORTED_MODULE_1___default().push({
                query: {
                    ...(next_router__WEBPACK_IMPORTED_MODULE_1___default().query)
                },
                pathname: "/auth/telegram"
            });
        }
    };
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "d-flex flex-column align-items-center justify-content-center gap-4 mt-2 ",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                onClick: handleTelegramClick,
                style: {
                    border: "1px solid #24A1DE",
                    borderRadius: "10px",
                    cursor: "pointer"
                },
                className: "py-3 px-3 d-flex align-items-center gap-2 w-100 justify-content-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/static/img/telegram.png",
                        alt: "",
                        height: 20
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "Telegram orqali kirish"
                    })
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                onClick: handleGoogleClick,
                style: {
                    border: "1px solid #DB4437",
                    borderRadius: "10px",
                    cursor: "pointer"
                },
                className: "py-3 px-3 d-flex align-items-center gap-2 w-100 justify-content-center",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("img", {
                        src: "/static/img/google.png",
                        alt: "",
                        height: 20
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        children: "Google orqali kirish"
                    })
                ]
            })
        ]
    });
}


/***/ }),

/***/ 6020:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ LoginForm)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5725);
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(antd__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7066);
/* harmony import */ var _ant_design_icons__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _GoogleBox__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(2578);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8176);
/* harmony import */ var react_spinners__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_spinners__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(9648);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _repositories_Repository__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3608);
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(9752);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([axios__WEBPACK_IMPORTED_MODULE_6__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_8__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__]);
([axios__WEBPACK_IMPORTED_MODULE_6__, _repositories_Repository__WEBPACK_IMPORTED_MODULE_8__, _tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const formInputs = {
    phone: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
        name: "phone",
        rules: [
            {
                required: true,
                message: "Telefon raqam kiritish majburiy"
            },
            {
                pattern: /^\d{9}$/,
                message: "Iltimos, haqiqiy telefon raqam kiriting"
            }, 
        ],
        normalize: (value)=>value.replace(/\D/g, "").slice(0, 9),
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
            autoComplete: "off",
            style: {
                height: "50px",
                fontSize: "16px"
            },
            type: "text",
            placeholder: "Telefon raqam",
            addonBefore: "+998"
        })
    }),
    email: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Form.Item, {
        name: "email",
        className: "mb-4",
        rules: [
            {
                required: true,
                message: "Elektron pochta kiritish majburiy"
            },
            {
                type: "email",
                message: "Iltimos, haqiqiy elektron pochta kiriting"
            }, 
        ],
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Input, {
            style: {
                height: "50px",
                fontSize: "16px"
            },
            addonBefore: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.MailOutlined, {
                style: {
                    fontSize: "16px",
                    padding: "0 8px"
                }
            }),
            type: "email",
            placeholder: "Elektron pochta"
        })
    })
};
const segmentOptions = [
    {
        label: "Telefon raqam",
        value: "phone",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.PhoneOutlined, {})
    },
    {
        label: "Elektron pochta",
        value: "email",
        icon: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_ant_design_icons__WEBPACK_IMPORTED_MODULE_3__.MailOutlined, {})
    }, 
];
function LoginForm({ onSuccess , isModal , setCode , openTelegram , onGoogleSuccessNavigateTo ,  }) {
    const { 0: type , 1: setType  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("phone"); // phone, email
    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_7__.useRouter)();
    const { mutate: handleSubmit , isPending: loading , isSuccess  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_9__.useMutation)({
        mutationKey: [
            "auth-register"
        ],
        mutationFn: async ({ phone , email  })=>{
            const utm_source = localStorage.getItem("utm_source");
            const data = {
                phone_or_email: type === "phone" ? "+998" + phone : email,
                role: "customer"
            };
            const resp = await axios__WEBPACK_IMPORTED_MODULE_6__["default"].post(_repositories_Repository__WEBPACK_IMPORTED_MODULE_8__/* .baseUrlAuth */ .iq + `auth/register/${utm_source ? `?utm_source=${utm_source}` : ""}`, data);
            localStorage.setItem("via_", resp?.data?.via_);
            localStorage.setItem("msg", resp?.data?.msg);
            localStorage.setItem("data", JSON.stringify(data));
            return resp;
        },
        onSuccess: (resp)=>{
            if (isModal) {
                onSuccess();
                setCode(resp.data?.user);
            } else {
                router.push({
                    query: {
                        ...router.query,
                        user: resp.data?.user
                    },
                    pathname: "/auth/code-verify"
                });
            }
        },
        onError: (error)=>{
            const modal = antd__WEBPACK_IMPORTED_MODULE_2__.Modal.error({
                centered: true,
                title: "Xatolik",
                content: error?.response?.data?.msg || JSON.stringify(error?.response)
            });
            modal.update;
        }
    });
    const disableAllInputs = loading || isSuccess;
    const submitButtonContent = disableAllInputs ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_spinners__WEBPACK_IMPORTED_MODULE_5__.BeatLoader, {
        color: "#fff"
    }) : "Ko'dni olish";
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
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "d-flex justify-content-center align-items-center flex-column mb-4",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                style: {
                                    fontSize: "28px",
                                    fontWeight: 700
                                },
                                children: "Kirish"
                            })
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_GoogleBox__WEBPACK_IMPORTED_MODULE_4__/* ["default"] */ .Z, {
                            isModal: isModal,
                            onGoogleSuccessNavigateTo: onGoogleSuccessNavigateTo,
                            openTelegram: openTelegram,
                            setCode: setCode,
                            params: router.query?.id ? `?id=${router.query.id}` : ""
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Divider, {
                            size: "large",
                            style: {
                                borderColor: "rgba(0,0,0,0.2)"
                            },
                            children: "Yoki"
                        }),
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(antd__WEBPACK_IMPORTED_MODULE_2__.Segmented, {
                            onChange: setType,
                            options: segmentOptions,
                            block: true,
                            className: "mb-5",
                            size: "small",
                            style: {
                                height: "38px"
                            },
                            value: type
                        }),
                        formInputs[type],
                        /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                            className: "form-group submit mt-5",
                            children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                type: "submit",
                                disabled: disableAllInputs,
                                className: "ps-btn text-white fw-normal ps-btn--fullwidth",
                                children: submitButtonContent
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
//# sourceMappingURL=6020.js.map