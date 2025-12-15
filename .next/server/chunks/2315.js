"use strict";
exports.id = 2315;
exports.ids = [2315];
exports.modules = {

/***/ 8742:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ header_HeaderLoader)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "antd"
var external_antd_ = __webpack_require__(5725);
// EXTERNAL MODULE: ./node_modules/next/image.js
var next_image = __webpack_require__(5675);
var image_default = /*#__PURE__*/__webpack_require__.n(next_image);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
;// CONCATENATED MODULE: ./widgets/header/HeaderLogo.jsx




function HeaderLogo({ mode  }) {
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "d-flex gap-5 align-items-center pointer",
        children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
            href: "/",
            style: {
                cursor: "pointer"
            },
            children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                src: `/static/img/soff/logo-${mode}.png`,
                width: "100px",
                height: "30px",
                alt: "Logo of Soff.uz"
            })
        })
    });
}

// EXTERNAL MODULE: ./shared/utilities/useResponsive.js + 1 modules
var useResponsive = __webpack_require__(6603);
;// CONCATENATED MODULE: ./widgets/header/HeaderLoader.jsx





function HeaderLoader() {
    const { isMobile  } = (0,useResponsive/* default */.Z)();
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
        style: {
            backgroundColor: "#fff",
            position: "sticky",
            top: 0,
            zIndex: 1000,
            overflow: "hidden"
        },
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                style: {
                    padding: "10px 0",
                    borderBottom: "1px solid #f0f0f0"
                },
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "container",
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    },
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(HeaderLogo, {
                            mode: "dark"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            style: {
                                display: "flex",
                                alignItems: "center",
                                gap: "10px"
                            },
                            children: [
                                !isMobile ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Input, {
                                            style: {
                                                width: 20,
                                                height: 30
                                            },
                                            active: true
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Input, {
                                            style: {
                                                width: 20,
                                                height: 30
                                            },
                                            active: true
                                        })
                                    ]
                                }) : null,
                                /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Image, {
                                    style: {
                                        width: 30,
                                        height: 30
                                    },
                                    active: true
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Avatar, {
                                    size: 30,
                                    active: true
                                })
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                style: {
                    height: "45px",
                    paddingBottom: "5px",
                    borderBottom: "1px solid #f0f0f0",
                    marginTop: "5px"
                },
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "container",
                    style: {
                        display: "flex",
                        height: "100%",
                        alignItems: "center",
                        gap: "10px"
                    },
                    children: isMobile ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Button, {
                                style: {
                                    width: 50,
                                    height: 25
                                },
                                active: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Button, {
                                style: {
                                    width: 100,
                                    height: 25
                                },
                                active: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Button, {
                                style: {
                                    width: 150,
                                    height: 25
                                },
                                active: true
                            })
                        ]
                    }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Button, {
                                style: {
                                    width: 250,
                                    height: 25
                                },
                                active: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Button, {
                                style: {
                                    width: 100,
                                    height: 25
                                },
                                active: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Button, {
                                style: {
                                    width: 150,
                                    height: 25
                                },
                                active: true
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx(external_antd_.Skeleton.Button, {
                                style: {
                                    width: 280,
                                    height: 25
                                },
                                active: true
                            })
                        ]
                    })
                })
            })
        ]
    });
}
/* harmony default export */ const header_HeaderLoader = (HeaderLoader);


/***/ }),

/***/ 2315:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6022);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_redux__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _store_auth_slice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(3015);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(1853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(6999);
/* harmony import */ var _react_oauth_google__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_react_oauth_google__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _store_profile_slice__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(9880);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(5152);
/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _widgets_header_HeaderLoader__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(8742);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_store_auth_slice__WEBPACK_IMPORTED_MODULE_4__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_7__]);
([_store_auth_slice__WEBPACK_IMPORTED_MODULE_4__, _store_profile_slice__WEBPACK_IMPORTED_MODULE_7__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);










const Header = next_dynamic__WEBPACK_IMPORTED_MODULE_8___default()(null, {
    loadableGenerated: {
        modules: [
            "../widgets/layouts/PageLayout.jsx -> " + "~/widgets/header"
        ]
    },
    ssr: false,
    loading: _widgets_header_HeaderLoader__WEBPACK_IMPORTED_MODULE_9__/* ["default"] */ .Z
});
const Footer = next_dynamic__WEBPACK_IMPORTED_MODULE_8___default()(()=>__webpack_require__.e(/* import() */ 4144).then(__webpack_require__.bind(__webpack_require__, 4144)), {
    loadableGenerated: {
        modules: [
            "../widgets/layouts/PageLayout.jsx -> " + "~/widgets/footer"
        ]
    },
    ssr: true
});
const NetworkStatusComponent = next_dynamic__WEBPACK_IMPORTED_MODULE_8___default()(null, {
    loadableGenerated: {
        modules: [
            "../widgets/layouts/PageLayout.jsx -> " + "~/components/NetworkStatus"
        ]
    },
    ssr: false
});
const PageLayout = ({ children , title , withFooter =true  } = {})=>{
    const { user  } = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useSelector)((state)=>state.auth);
    (0,_store_profile_slice__WEBPACK_IMPORTED_MODULE_7__/* .useGetProfileQuery */ .Mx)(`userfetch - ${user?.access}`, {
        skip: !user?.access
    });
    (0,_store_profile_slice__WEBPACK_IMPORTED_MODULE_7__/* .useGetDirectionsQuery */ .P5)();
    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_3__.useDispatch)();
    const Router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();
    async function handleLogin(googleData) {
        Router.push(`/oauth/?token=${googleData}&returnUrl=${Router.asPath}`);
    }
    const defaultRoutePage = ()=>{
        dispatch((0,_store_auth_slice__WEBPACK_IMPORTED_MODULE_4__/* .checkAuthorization */ .sZ)());
    };
    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{
        defaultRoutePage();
    }, []);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            title ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_head__WEBPACK_IMPORTED_MODULE_2___default()), {
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                    children: title
                })
            }) : null,
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    height: "100vh",
                    height: "100dvh",
                    height: "-webkit-fill-available"
                },
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Header, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(NetworkStatusComponent, {}),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("main", {
                        style: {
                            flex: "1"
                        },
                        children: children
                    }),
                    withFooter ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(Footer, {}) : null
                ]
            }),
            !user && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                style: {
                    height: 0,
                    overflow: "hidden"
                },
                children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_react_oauth_google__WEBPACK_IMPORTED_MODULE_6__.GoogleLogin, {
                    onSuccess: (credentialResponse)=>{
                        handleLogin(credentialResponse?.credential);
                    },
                    intermediate_iframe_close_callback: (e)=>e.preventDefault(),
                    useOneTap: true,
                    prompt: "select_account"
                })
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PageLayout);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;
//# sourceMappingURL=2315.js.map